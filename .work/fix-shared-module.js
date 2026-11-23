const fs = require('fs');
const root = 'C:/Users/PC/Downloads/dreystudio-main';
const endingPath = `${root}/assets/js/shared-ending.js`;
const source = fs.readFileSync(endingPath, 'utf8');
const match = source.match(/target\.innerHTML=([\s\S]*?)\n\}\)\(\);/);
if (!match) throw new Error('Existing shared ending markup was not found.');
const shared = match[1];
const next = `/* Canonical Case Studies-to-contact ending. Blog is intentionally excluded. */
(function(){
  var before=document.getElementById('site-ending-before-blog');
  var after=document.getElementById('site-ending-after-blog');
  var target=document.getElementById('site-ending');
  var markup=${shared};
  var split=markup.indexOf('<section class="home-section" aria-labelledby="faq-heading">');
  var beforeMarkup=split>0?markup.slice(0,split):markup;
  var afterMarkup=split>0?markup.slice(split):'';
  if(before) before.innerHTML=beforeMarkup;
  if(after) after.innerHTML=afterMarkup;
  if(target) target.innerHTML=markup;
})();
`;
fs.writeFileSync(endingPath, next, 'utf8');
const indexPath = `${root}/index.html`;
const index = fs.readFileSync(indexPath, 'utf8');
if (!index.includes('id="site-ending-before-blog"') || !index.includes('id="site-ending-after-blog"')) throw new Error('Homepage placeholders were not preserved.');
if (!index.includes('assets/js/shared-ending.js?v=1')) throw new Error('Homepage shared-ending script was not inserted.');
console.log('Shared ending module now supports homepage split and About single-target enrollment.');
