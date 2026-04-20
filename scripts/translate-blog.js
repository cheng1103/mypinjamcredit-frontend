#!/usr/bin/env node
/**
 * Offline blog translation helper powered by @xenova/transformers.
 * Downloads the facebook/m2m100_418M model on first run and caches it locally.
 */
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const SOURCE_LOCALE = process.env.TRANSLATE_SOURCE_LOCALE || 'en';
const TARGET_LOCALE = process.env.TRANSLATE_TARGET_LOCALE || 'ms';
const FORCE = process.argv.includes('--force');
const DRY_RUN = process.argv.includes('--dry-run');
const slugArg = process.argv.find(arg => arg.startsWith('--slug='));
const SPECIFIC_SLUG = slugArg ? slugArg.replace('--slug=', '').trim() : null;

const blogRoot = path.join(process.cwd(), 'src/content/blog');
const sourceDir = path.join(blogRoot, SOURCE_LOCALE);
const targetDir = path.join(blogRoot, TARGET_LOCALE);

if (!fs.existsSync(sourceDir)) {
  console.error(`Source directory not found: ${sourceDir}`);
  process.exit(1);
}

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const translatorPromise = import('@xenova/transformers').then(({ pipeline }) =>
  pipeline('translation', 'facebook/m2m100_418M')
);
const MAX_BLOCK_CHARS = 800;

async function translateText(text) {
  if (!text || !text.trim()) return text;
  const translator = await translatorPromise;
  const { translation_text } = await translator(text, {
    src_lang: SOURCE_LOCALE,
    tgt_lang: TARGET_LOCALE
  });
  return translation_text;
}

async function translateParagraphs(content) {
  const paragraphs = content.split('\n\n');
  const blocks = [];
  let current = '';

  paragraphs.forEach(paragraph => {
    const candidate = current ? `${current}\n\n${paragraph}` : paragraph;
    if (candidate.length > MAX_BLOCK_CHARS && current) {
      blocks.push(current);
      current = paragraph;
    } else if (candidate.length > MAX_BLOCK_CHARS) {
      // paragraph itself is too long, split roughly in half
      const mid = Math.floor(paragraph.length / 2);
      blocks.push(paragraph.slice(0, mid));
      current = paragraph.slice(mid);
    } else {
      current = candidate;
    }
  });
  if (current) blocks.push(current);

  const translatedBlocks = [];
  for (const block of blocks) {
    translatedBlocks.push(await translateText(block));
  }
  return translatedBlocks.join('\n\n');
}

async function translateFrontMatter(data) {
  const cloned = { ...data };
  if (typeof cloned.title === 'string') {
    cloned.title = await translateText(cloned.title);
  }
  if (typeof cloned.description === 'string') {
    cloned.description = await translateText(cloned.description);
  }
  if (typeof cloned.category === 'string') {
    cloned.category = await translateText(cloned.category);
  }
  if (Array.isArray(cloned.tags)) {
    const newTags = [];
    for (const tag of cloned.tags) {
      newTags.push(await translateText(String(tag)));
    }
    cloned.tags = newTags;
  }
  cloned.language = TARGET_LOCALE;
  return cloned;
}

async function processFile(fileName) {
  const sourcePath = path.join(sourceDir, fileName);
  const targetPath = path.join(targetDir, fileName);
  const slug = path.parse(fileName).name;

  if (!FORCE && !DRY_RUN && fs.existsSync(targetPath)) {
    console.log(`Skipping ${slug} (already translated). Use --force to overwrite.`);
    return;
  }

  console.log(`Translating ${slug} (${SOURCE_LOCALE} -> ${TARGET_LOCALE}) ...`);
  const { data, content } = matter(fs.readFileSync(sourcePath, 'utf8'));
  const translatedFrontMatter = await translateFrontMatter(data);
  const translatedContent = await translateParagraphs(content);

  const output = matter.stringify(translatedContent, translatedFrontMatter);
  if (DRY_RUN) {
    console.log(`[dry-run] Prepared translation for ${slug}`);
    return;
  }

  fs.writeFileSync(targetPath, output, 'utf8');
  console.log(`Saved ${targetPath}`);
}

async function run() {
  const files = fs.readdirSync(sourceDir).filter(file => file.endsWith('.md'));
  const targets = SPECIFIC_SLUG
    ? files.filter(file => path.parse(file).name === SPECIFIC_SLUG)
    : files;

  if (targets.length === 0) {
    console.warn('No markdown files to translate.');
    return;
  }

  for (const file of targets) {
    await processFile(file);
  }
  console.log('Translation complete.');
}

run().catch(error => {
  console.error('Translation script failed:', error);
  process.exit(1);
});
