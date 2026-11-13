// Build-time CSS helpers with no dependencies.
// minifyCss: strip comments and spare whitespace.
// criticalCss: keep only the rules that can apply to the first screen of a
// page, in their original order, so the inline copy cascades exactly like the
// full stylesheet that loads right after it.

// Split CSS into strings and non-strings so edits never touch quoted text.
function mapOutsideStrings(css, fn) {
  return css.split(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/).map((part, index) => (index % 2 ? part : fn(part))).join('');
}

export function minifyCss(css) {
  const withoutComments = css.replace(/\/\*[\s\S]*?\*\//g, '');
  return mapOutsideStrings(withoutComments, (part) => part
    .replace(/\s+/g, ' ')
    .replace(/ ?([{};]) ?/g, '$1')
    .replace(/, /g, ',')
    .replace(/;}/g, '}')).trim();
}

// Top-level blocks of a stylesheet: [{ prelude, body }] for `prelude{body}`,
// and { prelude } alone for statements such as `@charset "x";`.
function blocks(css) {
  const out = [];
  let i = 0;
  while (i < css.length) {
    let j = i;
    let quote = '';
    while (j < css.length) {
      const ch = css[j];
      if (quote) {
        if (ch === '\\') j += 1;
        else if (ch === quote) quote = '';
      } else if (ch === '"' || ch === "'") quote = ch;
      else if (ch === '{' || ch === ';') break;
      j += 1;
    }
    const prelude = css.slice(i, j).trim();
    if (j >= css.length) break;
    if (css[j] === ';') {
      if (prelude) out.push({ prelude });
      i = j + 1;
      continue;
    }
    let depth = 1;
    let k = j + 1;
    quote = '';
    while (k < css.length && depth) {
      const ch = css[k];
      if (quote) {
        if (ch === '\\') k += 1;
        else if (ch === quote) quote = '';
      } else if (ch === '"' || ch === "'") quote = ch;
      else if (ch === '{') depth += 1;
      else if (ch === '}') depth -= 1;
      k += 1;
    }
    out.push({ prelude, body: css.slice(j + 1, k - 1) });
    i = k;
  }
  return out;
}

function splitSelectors(prelude) {
  const parts = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i < prelude.length; i += 1) {
    const ch = prelude[i];
    if (ch === '(' || ch === '[') depth += 1;
    else if (ch === ')' || ch === ']') depth -= 1;
    else if (ch === ',' && depth === 0) {
      parts.push(prelude.slice(start, i));
      start = i + 1;
    }
  }
  parts.push(prelude.slice(start));
  return parts;
}

// Remove `name(...)` groups, including nested parentheses.
function stripFunctions(selector) {
  let out = '';
  let depth = 0;
  for (let i = 0; i < selector.length; i += 1) {
    const ch = selector[i];
    if (ch === '(') depth += 1;
    else if (ch === ')') depth -= 1;
    else if (depth === 0) out += ch;
  }
  return out;
}

// True when every class, id and element the selector names exists on the first
// screen. Functional pseudo-classes and attribute tests count as "may match",
// so the result errs toward keeping a rule.
function canMatch(selector, seen) {
  const plain = stripFunctions(selector.replace(/\[[^\]]*\]/g, '')).replace(/(?<!\\)::?[a-zA-Z-]+/g, '');
  for (const [, name] of plain.matchAll(/\.((?:\\.|[\w-])+)/g)) if (!seen.classes.has(name.replace(/\\/g, ''))) return false;
  for (const [, name] of plain.matchAll(/#((?:\\.|[\w-])+)/g)) if (!seen.ids.has(name.replace(/\\/g, ''))) return false;
  for (const [, tag] of plain.replace(/[.#](?:\\.|[\w-])+/g, '').matchAll(/(?:^|[\s>+~])([a-zA-Z][\w-]*)/g)) {
    if (!seen.tags.has(tag.toLowerCase())) return false;
  }
  return true;
}

// The part of the page a visitor can see before scrolling: everything up to the
// end of the second section in <main>.
export function firstScreen(html) {
  const body = html.indexOf('<body');
  const main = html.indexOf('<main');
  if (body < 0 || main < 0) return null;
  let end = main;
  for (let n = 0; n < 2; n += 1) {
    const next = html.indexOf('</section>', end);
    if (next < 0) break;
    end = next + '</section>'.length;
  }
  if (end === main) end = Math.min(html.length, main + 12000);
  const markup = `${html.match(/<html\b[^>]*>/i)?.[0] || '<html>'}${html.slice(body, end)}`.replace(/<script\b[\s\S]*?<\/script>|<style\b[\s\S]*?<\/style>/gi, '');
  const seen = { tags: new Set(['html', 'head', 'body']), classes: new Set(), ids: new Set() };
  for (const [tag] of markup.matchAll(/<[a-zA-Z][^>]*>/g)) {
    seen.tags.add(tag.match(/^<([a-zA-Z][\w-]*)/)[1].toLowerCase());
    for (const name of (tag.match(/\sclass=(["'])(.*?)\1/i)?.[2] || '').split(/\s+/)) if (name) seen.classes.add(name);
    const id = tag.match(/\sid=(["'])(.*?)\1/i)?.[2];
    if (id) seen.ids.add(id);
  }
  return seen;
}

function keep(css, seen) {
  let out = '';
  for (const { prelude, body } of blocks(css)) {
    if (body === undefined) continue;
    if (prelude.startsWith('@')) {
      if (/^@font-face\b/i.test(prelude)) out += `${prelude}{${body}}`;
      else if (/^@(?:media|supports|layer|container)\b/i.test(prelude)) {
        if (/^@media\s+print\b/i.test(prelude)) continue;
        const inner = keep(body, seen);
        if (inner) out += `${prelude}{${inner}}`;
      }
      continue;
    }
    const selectors = splitSelectors(prelude).filter((selector) => canMatch(selector, seen));
    if (selectors.length) out += `${selectors.join(',')}{${body}}`;
  }
  return out;
}

export function criticalCss(css, html) {
  const seen = firstScreen(html);
  return seen ? keep(css, seen) : null;
}
