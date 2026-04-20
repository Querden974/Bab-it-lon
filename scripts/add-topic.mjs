import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const NOTES_DIR = 'd:/_OBSIDIAN/astro-vault/src/content/docs/notes';
const SKIP_FILES = ['CLAUDE.md', 'index.md'];

function walkMd(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      results.push(...walkMd(full));
    } else if (extname(entry) === '.md') {
      results.push(full);
    }
  }
  return results;
}

function getTopic(filePath) {
  const rel = filePath.replace(NOTES_DIR, '').replace(/\\/g, '/');
  if (rel.includes('/Essentiels/')) return 'Essentiels';
  if (rel.includes('/_Procédures/') || rel.includes('/_Proc')) return 'Procédures';
  return null;
}

const files = walkMd(NOTES_DIR);
let updated = 0;
let skipped = 0;

for (const fullPath of files) {
  const filename = fullPath.split(/[\\/]/).at(-1);
  if (SKIP_FILES.includes(filename)) { skipped++; continue; }

  const topic = getTopic(fullPath);
  if (!topic) {
    console.log(`? Aucun topic déterminé pour : ${fullPath.replace(NOTES_DIR, '')}`);
    skipped++;
    continue;
  }

  const content = readFileSync(fullPath, 'utf-8');

  if (content.startsWith('---')) {
    const end = content.indexOf('---', 3);
    if (end === -1) { skipped++; continue; }

    const frontmatter = content.slice(0, end + 3);
    const body = content.slice(end + 3);

    if (/^topic\s*:/m.test(frontmatter)) {
      skipped++;
      continue;
    }

    const newFrontmatter = frontmatter.replace(/^---\n/, `---\ntopic: "${topic}"\n`);
    writeFileSync(fullPath, newFrontmatter + body, 'utf-8');
  } else {
    writeFileSync(fullPath, `---\ntopic: "${topic}"\n---\n${content}`, 'utf-8');
  }

  console.log(`+ [${topic}] ${fullPath.replace(NOTES_DIR, '')}`);
  updated++;
}

console.log(`\nDone: ${updated} mis à jour, ${skipped} ignorés.`);
