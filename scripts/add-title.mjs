import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, basename, extname } from 'path';

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

const files = walkMd('d:/_OBSIDIAN/astro-vault/src');
let updated = 0;
let skipped = 0;

for (const fullPath of files) {
  const content = readFileSync(fullPath, 'utf-8');
  const filename = basename(fullPath, '.md');

  if (content.startsWith('---')) {
    const end = content.indexOf('---', 3);
    if (end === -1) { skipped++; continue; }

    const frontmatter = content.slice(0, end + 3);
    const body = content.slice(end + 3);

    if (/^title\s*:/m.test(frontmatter)) {
      skipped++;
      continue;
    }

    const newFrontmatter = frontmatter.replace('---\n', `---\ntitle: "${filename}"\n`);
    writeFileSync(fullPath, newFrontmatter + body, 'utf-8');
  } else {
    writeFileSync(fullPath, `---\ntitle: "${filename}"\n---\n${content}`, 'utf-8');
  }

  console.log(`+ ${fullPath.replace('d:/_OBSIDIAN/astro-vault/', '')}`);
  updated++;
}

console.log(`\nDone: ${updated} updated, ${skipped} skipped.`);
