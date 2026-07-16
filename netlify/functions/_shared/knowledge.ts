import fs from 'node:fs/promises';
import path from 'node:path';

type KnowledgeChunk = { source: string; title: string; section: string; text: string; score: number };
type Metadata = { title: string; status: string; reviewed_on: string | null; review_expires_on: string | null };

const STOP = new Set(['about', 'after', 'also', 'and', 'are', 'can', 'does', 'for', 'from', 'have', 'how', 'into', 'loan', 'mortgage', 'that', 'the', 'their', 'this', 'what', 'when', 'where', 'which', 'with', 'would', 'your']);
let cached: { version: string; chunks: Array<Omit<KnowledgeChunk, 'score'>> } | null = null;

export async function retrieveApprovedKnowledge(question: string, limit = 4): Promise<{ version: string; results: KnowledgeChunk[] }> {
  const index = cached ?? await loadKnowledge();
  cached = index;
  const terms = tokenize(question);
  const results = index.chunks
    .map((chunk) => ({ ...chunk, score: score(terms, tokenize(`${chunk.title} ${chunk.section}`), tokenize(chunk.text)) }))
    .filter((chunk) => chunk.score >= 0.18)
    .sort((left, right) => right.score - left.score)
    .slice(0, limit);
  return { version: index.version, results };
}

async function loadKnowledge() {
  const root = process.cwd();
  const directory = path.join(root, 'ai-knowledge');
  const manifest = JSON.parse(await fs.readFile(path.join(directory, 'manifest.json'), 'utf8')) as { version: string; files: string[] };
  const chunks: Array<Omit<KnowledgeChunk, 'score'>> = [];
  for (const filename of manifest.files) {
    const source = await fs.readFile(path.join(directory, filename), 'utf8');
    const parsed = parseFrontMatter(source);
    if (!parsed || parsed.metadata.status !== 'approved') continue;
    if (!parsed.metadata.review_expires_on || parsed.metadata.review_expires_on < new Date().toISOString().slice(0, 10)) continue;
    chunks.push(...splitSections(filename, parsed.metadata.title, parsed.body));
  }
  return { version: manifest.version, chunks };
}

function parseFrontMatter(source: string): { metadata: Metadata; body: string } | null {
  const match = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return null;
  const values: Record<string, string | null> = {};
  for (const line of match[1].split('\n')) {
    const index = line.indexOf(':');
    if (index < 1) continue;
    const key = line.slice(0, index).trim();
    const raw = line.slice(index + 1).trim();
    values[key] = raw === 'null' ? null : raw.replace(/^['"]|['"]$/g, '');
  }
  if (!values.title || !values.status) return null;
  return { metadata: values as Metadata, body: match[2] };
}

function splitSections(source: string, title: string, body: string): Array<Omit<KnowledgeChunk, 'score'>> {
  const sections: Array<Omit<KnowledgeChunk, 'score'>> = [];
  let heading = title;
  let buffer: string[] = [];
  const flush = () => {
    const text = buffer.join('\n').replace(/^> PLACEHOLDER.*$/gm, '').trim();
    if (text.length >= 80) sections.push({ source, title, section: heading, text: text.slice(0, 3000) });
    buffer = [];
  };
  for (const line of body.split('\n')) {
    if (/^#{1,3}\s+/.test(line)) {
      flush();
      heading = line.replace(/^#{1,3}\s+/, '').trim();
    } else {
      buffer.push(line);
    }
  }
  flush();
  return sections;
}

function tokenize(value: string): Set<string> {
  return new Set((value.toLowerCase().match(/[a-z0-9]+/g) || []).filter((term) => term.length > 2 && !STOP.has(term)));
}

function score(query: Set<string>, heading: Set<string>, body: Set<string>): number {
  if (!query.size) return 0;
  let matches = 0;
  for (const term of query) {
    if (heading.has(term)) matches += 1.5;
    else if (body.has(term)) matches += 1;
  }
  return matches / query.size;
}

export function __resetKnowledgeCacheForTests() {
  cached = null;
}
