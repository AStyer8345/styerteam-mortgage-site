// netlify/functions/lib/rates-json-updater.js
// Parses the rate string from LoanOS marketing tab, pulls current Freddie Mac
// PMMS national averages + previous week's rates.json (for deltas), and returns
// a fresh rates.json body ready to commit to the repo root.
//
// Called from generate-rate-update.js after the dated rate page is generated.

const LIVE_RATES_URL = "https://styermortgage.com/rates.json";
const PMMS_CSV_URL   = "https://www.freddiemac.com/pmms/docs/PMMS_history.csv";

// LoanOS product label → rates.json key. Kept in this one place so the UI and
// the JSON stay aligned. Unknown labels fall through (ignored).
const PRODUCT_MAP = {
  "30-Yr Fixed":  { key: "30yr_fixed",  label: "30-Yr Fixed"  },
  "15-Yr Fixed":  { key: "15yr_fixed",  label: "15-Yr Fixed"  },
  "30-Yr Jumbo":  { key: "30yr_jumbo",  label: "30-Yr Jumbo"  },
  "VA 30-Yr":     { key: "30yr_va",     label: "30-Yr VA"     },
  "FHA 30-Yr":    { key: "30yr_fha",    label: "30-Yr FHA"    },
  "FHA 5-Yr ARM": { key: "fha_5yr_arm", label: "FHA 5-Yr ARM" },
};

// Order preserved in the rendered widget.
const PRODUCT_ORDER = [
  "30yr_fixed", "15yr_fixed", "30yr_fha", "30yr_jumbo", "fha_5yr_arm", "30yr_va",
];

// Which products have a Freddie Mac national average we can pull from PMMS.
const PMMS_KEYS = { "30yr_fixed": "pmms30", "15yr_fixed": "pmms15" };

// ====================================================================
// PARSE: raw rate string → [{ key, label, adam_rate }]
// Accepts "30-Yr Fixed: 5.875% | APR: 6.05%\n15-Yr Fixed: 5.25%..."
// ====================================================================
function parseRates(ratesString) {
  const out = [];
  if (!ratesString || typeof ratesString !== "string") return out;
  const lines = ratesString.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  for (const line of lines) {
    const m = line.match(/^(.+?):\s*([\d.]+)\s*%/);
    if (!m) continue;
    const label = m[1].trim();
    const rate = parseFloat(m[2]);
    if (isNaN(rate)) continue;
    const mapped = PRODUCT_MAP[label];
    if (!mapped) {
      console.warn(`[rates-json] Unknown product label: "${label}" — skipped`);
      continue;
    }
    out.push({ key: mapped.key, label: mapped.label, adam_rate: rate });
  }
  return out;
}

// ====================================================================
// FETCH PREVIOUS rates.json (for deltas). Returns null on any failure.
// ====================================================================
async function fetchPreviousRates() {
  try {
    const res = await fetch(LIVE_RATES_URL, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.warn(`[rates-json] Could not fetch previous rates.json: ${err.message}`);
    return null;
  }
}

// ====================================================================
// FETCH Freddie Mac PMMS — latest week + prior week for delta.
// Returns { week_of: "YYYY-MM-DD", pmms30: {rate, change}, pmms15: {rate, change} }
// or null if PMMS is unreachable.
// ====================================================================
async function fetchFreddieMac() {
  try {
    const res = await fetch(PMMS_CSV_URL);
    if (!res.ok) return null;
    const csv = await res.text();
    const lines = csv.trim().split(/\r?\n/);
    const header = lines[0].split(",");
    const idx = {
      date:   header.indexOf("date"),
      pmms30: header.indexOf("pmms30"),
      pmms15: header.indexOf("pmms15"),
    };
    if (idx.date < 0) return null;

    const last = lines[lines.length - 1].split(",");
    const prev = lines[lines.length - 2].split(",");

    const parse = (row, col) => {
      const v = parseFloat(row[col]);
      return isNaN(v) ? null : v;
    };
    const iso = (mdy) => {
      // PMMS dates are M/D/YYYY
      const [m, d, y] = mdy.split("/");
      if (!m || !d || !y) return null;
      return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    };

    const round = (v) => v == null ? null : Math.round(v * 100) / 100;

    const curr30 = parse(last, idx.pmms30);
    const prev30 = parse(prev, idx.pmms30);
    const curr15 = parse(last, idx.pmms15);
    const prev15 = parse(prev, idx.pmms15);

    return {
      week_of: iso(last[idx.date]),
      pmms30: {
        rate: round(curr30),
        change: (curr30 != null && prev30 != null) ? round(curr30 - prev30) : null,
      },
      pmms15: {
        rate: round(curr15),
        change: (curr15 != null && prev15 != null) ? round(curr15 - prev15) : null,
      },
    };
  } catch (err) {
    console.warn(`[rates-json] Could not fetch Freddie Mac PMMS: ${err.message}`);
    return null;
  }
}

// ====================================================================
// BUILD the new rates.json body from the pasted rates.
// Computes deltas against the previous rates.json if it exists.
// ====================================================================
async function buildRatesJson(ratesString, { today } = {}) {
  const now = today || new Date().toISOString().split("T")[0];
  const parsed = parseRates(ratesString);
  const previous = await fetchPreviousRates();
  const freddie = await fetchFreddieMac();

  // Build lookup of previous rates by key
  const prevByKey = {};
  if (previous && Array.isArray(previous.products)) {
    for (const p of previous.products) prevByKey[p.key] = p;
  }

  // Assemble new products in canonical order. For each key, prefer newly-pasted
  // data; fall back to previous rates.json so products Adam didn't update this
  // week still render.
  const parsedByKey = {};
  for (const p of parsed) parsedByKey[p.key] = p;

  const products = PRODUCT_ORDER.map(key => {
    const mapped = Object.values(PRODUCT_MAP).find(m => m.key === key);
    const label = mapped ? mapped.label : key;
    const prev = prevByKey[key] || {};
    const fresh = parsedByKey[key];

    const adam_rate = fresh ? fresh.adam_rate : (prev.adam_rate ?? null);
    const adam_change = (fresh && prev.adam_rate != null)
      ? Math.round((fresh.adam_rate - prev.adam_rate) * 100) / 100
      : (prev.adam_change ?? null);

    // National average — only 30yr_fixed and 15yr_fixed have PMMS data.
    let national_avg    = prev.national_avg    ?? null;
    let national_change = prev.national_change ?? null;
    if (freddie && PMMS_KEYS[key]) {
      const f = freddie[PMMS_KEYS[key]];
      if (f && f.rate != null) {
        national_avg    = f.rate;
        national_change = f.change;
      }
    }

    return { key, label, national_avg, national_change, adam_rate, adam_change };
  });

  const body = {
    last_updated: now,
    week_of: freddie?.week_of || previous?.week_of || now,
    source_note: "National averages from Freddie Mac PMMS (weekly survey). Adam's rates reflect wholesale broker pricing for a well-qualified Austin TX borrower — illustrative, not a commitment to lend. All rates subject to credit, property, and program approval.",
    products,
  };

  return JSON.stringify(body, null, 2) + "\n";
}

module.exports = { buildRatesJson, parseRates, fetchFreddieMac, PRODUCT_MAP, PRODUCT_ORDER };
