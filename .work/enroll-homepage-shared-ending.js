const fs = require('fs');
const root = 'C:/Users/PC/Downloads/dreystudio-main';
const indexPath = `${root}/index.html`;
const index = fs.readFileSync(indexPath, 'utf8');
const caseStart = index.indexOf('<section class="home-section home-case-studies"');
const blogStart = index.indexOf('<section class="home-section home-blog"');
const faqStart = index.indexOf('<section class="home-section" aria-labelledby="faq-heading">');
const contactStart = index.indexOf('<section class="home-contact-strip"');
const contactEnd = index.indexOf('</section>', contactStart) + '</section>'.length;
if ([caseStart, blogStart, faqStart, contactStart, contactEnd].some(v => v < 0)) throw new Error('Homepage markers not found.');
let updated = index.slice(0, caseStart) + '<div id="site-ending-before-blog"></div>\n\n' + index.slice(blogStart, faqStart) + '<div id="site-ending-after-blog"></div>' + index.slice(contactEnd);
if (!updated.includes('assets/js/shared-ending.js?v=1')) {
  updated = updated.replace('<script defer src="assets/js/shared-nav-footer.js?v=3"></script>', '<script defer src="assets/js/shared-ending.js?v=1"></script>\n    <script defer src="assets/js/shared-nav-footer.js?v=3"></script>');
}
fs.writeFileSync(indexPath, updated, 'utf8');
const endingPath = `${root}/assets/js/shared-ending.js`;
let module = fs.readFileSync(endingPath, 'utf8');
const marker = "  var target=document.getElementById('site-ending');\n  if(!target) return;\n  target.innerHTML=";
if (module.includes(marker)) {
  const valueStart = module.indexOf('target.innerHTML=') + 'target.innerHTML='.length;
  const valueEnd = module.indexOf(';\n})();', valueStart);
  const shared = module.slice(valueStart, valueEnd);
  module = `/* Canonical Case Studies-to-contact ending. Blog is intentionally excluded. */\n(function(){\n  var before=document.getElementById('site-ending-before-blog');\n  var after=document.getElementById('site-ending-after-blog');\n  var target=document.getElementById('site-ending');\n  var markup=${shared};\n  var split=markup.indexOf('<section class="home-section" aria-labelledby="faq-heading">');\n  var beforeMarkup=split>0?markup.slice(0,split):markup;\n  var afterMarkup=split>0?markup.slice(split):'';\n  if(before) before.innerHTML=beforeMarkup;\n  if(after) after.innerHTML=afterMarkup;\n  if(target) target.innerHTML=markup;\n})();\n`;
  fs.writeFileSync(endingPath, module, 'utf8');
}
console.log('Homepage enrolled in shared ending while blog remains between ending segments.');
