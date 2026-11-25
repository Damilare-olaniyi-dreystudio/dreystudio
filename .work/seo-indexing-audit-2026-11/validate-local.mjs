import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const paths = [
  '/work/skincare-website/', '/privacy-policy', '/website-developer-nigeria',
  '/work/Nexus-Construction/', '/website-developer-lagos', '/website-developer-abuja',
  '/pricing', '/blog/top-web-designers-in-nigeria-2026/', '/contact', '/website-developer-ibadan',
];
const errors = [];
const read = relative => readFile(path.join(root, relative), 'utf8');
function tagAttribute(html, tagName, key, value) {
  const tags = html.match(new RegExp(`<${tagName}\\b[^>]*>`, 'gi')) ?? [];
  const tag = tags.find(candidate => new RegExp(`\\b${key}=["']${value}["']`, 'i').test(candidate));
  return tag?.match(new RegExp(`\\b${key === 'rel' ? 'href' : 'content'}=["']([^"']+)["']`, 'i'))?.[1] ?? null;
}
function fileForRoute(route) {
  if (route === '/') return 'index.html';
  if (route === '/blog/') return 'blog/index.html';
  if (route.startsWith('/work/') && route.endsWith('/')) return `work/${route.slice('/work/'.length, -1)}.html`;
  if (route.startsWith('/blog/') && route.endsWith('/')) return `blog/${route.slice('/blog/'.length, -1)}/index.html`;
  return `${route.replace(/^\//, '').replace(/\/$/, '')}.html`;
}

for (const route of paths) {
  const file = fileForRoute(route);
  let html;
  try { html = await read(file); } catch { errors.push(`Missing local route file: ${file}`); continue; }
  const canonical = tagAttribute(html, 'link', 'rel', 'canonical');
  const ogUrl = tagAttribute(html, 'meta', 'property', 'og:url');
  const expected = `https://dreystudio.ng${route}`;
  if (canonical !== expected) errors.push(`Canonical mismatch for ${route}: ${canonical}`);
  if (ogUrl && ogUrl !== expected) errors.push(`og:url mismatch for ${route}: ${ogUrl}`);
  if (route === '/privacy-policy' && ogUrl !== expected) errors.push('Privacy policy og:url missing or incorrect');
}

const template = await read('blog/_template/index.html');
if (/https?:\/\/www\.dreystudio\.ng/i.test(template)) errors.push('www origin remains in blog template');
if (!/name="robots"\s+content="noindex, nofollow"/i.test(template)) errors.push('Template noindex guard was not preserved');

const sitemap = await read('sitemap.xml');
const sitemapUrls = [...sitemap.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map(match => match[1]);
if (sitemapUrls.length !== 38) errors.push(`Expected 38 sitemap URLs, found ${sitemapUrls.length}`);
for (const url of sitemapUrls) {
  const route = new URL(url).pathname;
  if (!url.startsWith('https://dreystudio.ng/')) errors.push(`Sitemap URL has wrong origin: ${url}`);
  try { await read(fileForRoute(route)); } catch { errors.push(`Sitemap URL has no local file: ${url} -> ${fileForRoute(route)}`); }
}

const [live, liveSitemap, liveLinks] = await Promise.all([
  read('.work/seo-indexing-audit-2026-11/live-url-results.json').then(JSON.parse),
  read('.work/seo-indexing-audit-2026-11/sitemap-results.json').then(JSON.parse),
  read('.work/seo-indexing-audit-2026-11/live-link-results.json').then(JSON.parse),
]);
const wwwResults = live.results.filter(result => result.role === 'reported-www');
if (wwwResults.length !== 10) errors.push(`Expected 10 www URL results, found ${wwwResults.length}`);
for (const result of wwwResults) {
  if (result.chain.length !== 2 || result.chain[0].status !== 301 || result.chain[0].location !== result.expectedUrl || result.finalStatus !== 200 || result.finalUrl !== result.expectedUrl || result.canonical !== result.expectedUrl) errors.push(`www redirect/final canonical assertion failed: ${result.requestedUrl}`);
}
if (liveSitemap.entryCount !== 38 || liveSitemap.results.some(result => result.finalStatus !== 200 || result.chain.length !== 1 || result.canonical !== result.finalUrl)) errors.push('At least one live sitemap URL did not return a direct 200 self-canonical');
if (liveLinks.results.length !== 10 || liveLinks.results.some(result => result.status !== 200 || result.wwwInternalCount !== 0)) errors.push('At least one affected live page failed or has absolute www internal links');

const firebase = JSON.parse(await read('firebase.json'));
const firebaseRc = JSON.parse(await read('.firebaserc'));
const workflow = await read('.github/workflows/firebase-hosting-merge.yml');
if (firebase.hosting.site !== 'drey-studio' || firebaseRc.projects.default !== 'drey-studio' || !workflow.includes('FirebaseExtended/action-hosting-deploy@v0') || !workflow.includes('channelId: live')) errors.push('Firebase production pipeline settings did not match expected values');
const handoff = await read('PROJECT-HANDOFF.md');
if (!handoff.includes('Search indexing audit: privacy Open Graph URL') || !handoff.includes('Search indexing audit: blog template origin')) errors.push('Post-change handoff entries are missing');

async function scan(directory, ignored = false) {
  if (ignored) return [];
  const found = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (['.git', '.work', 'node_modules', 'outputs'].includes(entry.name)) continue;
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) found.push(...await scan(full));
    else if (/\.(?:html|js|json|xml|txt)$/i.test(entry.name)) {
      const text = await readFile(full, 'utf8');
      if (/https?:\/\/www\.dreystudio\.ng/i.test(text)) found.push(path.relative(root, full));
    }
  }
  return found;
}
const wwwFiles = await scan(root);
if (wwwFiles.length) errors.push(`Unexpected local www URLs remain in source files: ${wwwFiles.join(', ')}`);

if (errors.length) {
  for (const error of errors) console.error(`FAIL: ${error}`);
  process.exitCode = 1;
} else {
  console.log('PASS: ten affected local pages have matching self-canonicals; privacy og:url matches.');
  console.log('PASS: all 38 sitemap URLs map to local files, and their live responses are direct 200 self-canonicals.');
  console.log('PASS: all ten reported www URLs redirect directly by 301 to the expected non-www target, which returns 200 and self-canonicalizes.');
  console.log('PASS: all ten affected live pages have no absolute internal www links; local source files contain no www origin references.');
  console.log('PASS: Firebase live-deployment configuration and both post-change handoff entries are present.');
}
