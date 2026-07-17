import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const knowledgeDir = path.join(root, 'ai-knowledge');
const manifest = JSON.parse(await fs.readFile(path.join(knowledgeDir, 'manifest.json'), 'utf8'));
const allowedStatus = new Set(['placeholder', 'approved']);
const instructionPatterns = [
  /ignore (?:all |any )?(?:previous|prior|system|developer) instructions/i,
  /(?:system|developer) message/i,
  /override (?:the )?(?:policy|rules|instructions)/i,
  /reveal (?:the )?(?:prompt|secret|credential)/i,
];
const errors = [];

if (!manifest.version || !Array.isArray(manifest.files) || manifest.files.length < 1) {
  errors.push('manifest.json must define a version and at least one approved filename');
}

for (const filename of manifest.files || []) {
  if (!/^[a-z0-9-]+\.md$/.test(filename)) {
    errors.push(`${filename}: invalid filename`);
    continue;
  }
  let source = '';
  try {
    source = await fs.readFile(path.join(knowledgeDir, filename), 'utf8');
  } catch {
    errors.push(`${filename}: missing`);
    continue;
  }
  const parsed = parseFrontMatter(source);
  if (!parsed) {
    errors.push(`${filename}: missing or invalid front matter`);
    continue;
  }
  const { metadata, body } = parsed;
  if (!metadata.title || !metadata.owner || !allowedStatus.has(metadata.status)) errors.push(`${filename}: title, owner, and valid status are required`);
  for (const pattern of instructionPatterns) if (pattern.test(body)) errors.push(`${filename}: contains instruction-like content that must be removed`);

  if (metadata.status === 'approved') {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(metadata.reviewed_on || '') || !/^\d{4}-\d{2}-\d{2}$/.test(metadata.review_expires_on || '')) {
      errors.push(`${filename}: approved files require review dates`);
    } else if (metadata.review_expires_on < new Date().toISOString().slice(0, 10)) {
      errors.push(`${filename}: approval is expired`);
    }
    if (/\b(?:guarantee|guaranteed|will qualify|will be approved|preapproved)\b/i.test(body)) errors.push(`${filename}: contains a prohibited outcome claim`);
  } else {
    if (/https?:\/\//i.test(body)) errors.push(`${filename}: placeholder content may not contain URLs`);
  }
}

const actualMarkdown = (await fs.readdir(knowledgeDir)).filter((name) => name.endsWith('.md') && name !== 'README.md').sort();
const unlisted = actualMarkdown.filter((name) => !manifest.files.includes(name));
if (unlisted.length) errors.push(`Unlisted knowledge files: ${unlisted.join(', ')}`);

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join('\n'));
  process.exit(1);
}

console.log(`Validated ${manifest.files.length} knowledge files (${manifest.version}).`);

function parseFrontMatter(source) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return null;
  const metadata = {};
  for (const line of match[1].split('\n')) {
    const index = line.indexOf(':');
    if (index < 1) continue;
    const key = line.slice(0, index).trim();
    const raw = line.slice(index + 1).trim();
    metadata[key] = raw === 'null' ? null : raw.replace(/^['"]|['"]$/g, '');
  }
  return { metadata, body: match[2].trim() };
}
