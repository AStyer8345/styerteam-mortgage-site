import fs from 'node:fs';
import path from 'node:path';

// Schema.org class snapshot is checked in so publishing never depends on a network call.
const root = process.cwd();
const vocabulary = JSON.parse(fs.readFileSync(path.join(root, 'config/schema-types.json'), 'utf8'));
const validTypes = new Set(vocabulary.types);
const fix = process.argv.includes('--fix');
const replacements = { MortgageBroker: 'FinancialService', MortgageLender: 'FinancialService', LoanOrCreditService: 'MortgageLoan' };
const failures = [];
let blocks = 0;
let changed = 0;

function files(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    if (['node_modules', '.git', '.netlify'].includes(entry.name)) return [];
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? files(file) : file.endsWith('.html') ? [file] : [];
  });
}

function walk(value, file) {
  if (!value || typeof value !== 'object') return;
  if (Array.isArray(value)) return value.forEach(item => walk(item, file));
  if (fix && typeof value['@type'] === 'string' && replacements[value['@type']]) {
    value['@type'] = replacements[value['@type']];
    if (value['@type'] === 'FinancialService' && !value['@id'] && /Adam Styer|HyperSmart|Styer Team/.test(value.name || '')) {
      value['@id'] = 'https://styermortgage.com/#organization';
    }
  }
  const types = Array.isArray(value['@type']) ? value['@type'] : value['@type'] ? [value['@type']] : [];
  for (const type of types) {
    const term = String(type).replace(/^https?:\/\/schema.org\//, '');
    if (!validTypes.has(term)) failures.push(`${file}: unrecognized Schema.org type ${type}`);
  }
  Object.values(value).forEach(item => walk(item, file));
}

for (const file of files(root)) {
  const html = fs.readFileSync(file, 'utf8');
  const relative = path.relative(root, file);
  const output = html.replace(/(<script\b[^>]*\btype=["']application\/ld\+json["'][^>]*>)([\s\S]*?)(<\/script>)/gi, (whole, open, source, close, offset) => {
    if (html.lastIndexOf('<!--', offset) > html.lastIndexOf('-->', offset)) return whole;
    blocks += 1;
    try {
      const data = JSON.parse(source);
      const before = JSON.stringify(data);
      walk(data, relative);
      return fix && JSON.stringify(data) !== before ? `${open}\n${JSON.stringify(data, null, 2)}\n${close}` : whole;
    } catch (error) {
      failures.push(`${relative}: invalid JSON-LD (${error.message})`);
      return whole;
    }
  });
  if (output !== html) { fs.writeFileSync(file, output); changed += 1; }
}
if (failures.length) { console.error(failures.join('\n')); process.exitCode = 1; }
else console.log(`Validated ${blocks} JSON-LD blocks against Schema.org classes checked ${vocabulary.checked}; corrected ${changed} files.`);
