const fs = require('fs');
const vm = require('vm');
const assert = require('assert');
const root = process.cwd();
const read = p => fs.readFileSync(`${root}/${p}`, 'utf8');
const home = read('index.html');
const contact = read('contact.html');
const gutters = read('assets/css/homepage-layout-refinements.css');
const shared = read('assets/js/shared-ending.js');

function count(text, regex) { return (text.match(regex) || []).length; }
function checkCss(css, label) {
  const clean = css.replace(/\/\*[\s\S]*?\*\//g, '');
  let depth = 0;
  for (const ch of clean) {
    if (ch === '{') depth++;
    if (ch === '}') depth--;
    assert(depth >= 0, `${label}: unexpected closing brace`);
  }
  assert.strictEqual(depth, 0, `${label}: unbalanced CSS braces`);
}

assert.strictEqual(count(home, /<h1\b/gi), 1, 'homepage must retain one H1');
assert.strictEqual(count(contact, /<h1\b/gi), 1, 'Contact must retain one H1');
assert.strictEqual(count(home, /href="\/assets\/css\/homepage-layout-refinements\.css\?v=1"/g), 1, 'homepage stylesheet must load exactly once');
assert(home.indexOf('shared-ending.css?v=8') < home.indexOf('homepage-layout-refinements.css?v=1'), 'refinements must load after shared styles');
assert(gutters.includes('.home-page .home-main{width:min(1120px,calc(100% - 64px))'), 'homepage main width refinement missing');
assert(gutters.includes('@media(max-width:800px)') && gutters.includes('@media(max-width:520px)'), 'homepage responsive gutters missing');
for (const selector of ['home-case-grid', 'home-project-layout', 'home-included-grid', 'home-reviews-layout', 'home-contact-strip-inner']) {
  assert(gutters.includes(selector), `homepage gutter rule missing ${selector}`);
  assert(shared.includes(selector), `shared-ending markup missing ${selector}`);
}
assert(contact.includes('.contact-main{width:min(1080px,calc(100% - 56px));padding-top:96px;}'), 'Contact width refinement missing');
assert(contact.includes('.contact-conversation > div:first-child{padding:0;border-radius:0;background:transparent;}'), 'nested Contact panel removal missing');
assert(contact.includes('@media(max-width:640px){.contact-main{width:calc(100% - 40px)'), 'Contact mobile gutters missing');
assert(contact.includes('action="https://formspree.io/f/xqeowvyn"'), 'Contact form endpoint changed');
for (const marker of ['id="contact-form"', 'name="full_name"', 'name="email"', 'name="project_type"', 'name="message"', 'contact-form-status', 'contact-success-modal', 'data-omit-project-form']) {
  assert(contact.includes(marker), `Contact behavior marker missing: ${marker}`);
}

for (const [file, html] of [['index.html', home], ['contact.html', contact]]) {
  const blocks = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)];
  for (const [, attrs, source] of blocks) {
    if (/application\/ld\+json/i.test(attrs) || !source.trim()) continue;
    new vm.Script(source, { filename: file });
  }
  const schemas = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  assert(schemas.length > 0, `${file}: no JSON-LD found`);
  for (const [, json] of schemas) JSON.parse(json);
  const inlineCss = [...html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)].map(m => m[1]);
  inlineCss.forEach((css, i) => checkCss(css, `${file} style block ${i + 1}`));
}
checkCss(gutters, 'homepage-layout-refinements.css');
console.log('PASS: page structure, one H1 each, stylesheet order/count, responsive rules, scoped shared-ending selectors, Contact form markers/routes, JSON-LD, inline JavaScript syntax and CSS brace balance.');
