const fs = require('fs');
const root = 'C:/Users/PC/Downloads/dreystudio-main';
const path = `${root}/index.html`;
let html = fs.readFileSync(path, 'utf8');
if (!html.includes('id="site-ending-before-blog"')) {
  const caseStart = html.indexOf('<section class="home-section home-case-studies"');
  const blogStart = html.indexOf('<section class="home-section home-blog"');
  const faqStart = html.indexOf('<section class="home-section" aria-labelledby="faq-heading">');
  const contactStart = html.indexOf('<section class="home-contact-strip"');
  const contactEnd = html.indexOf('</section>', contactStart) + '</section>'.length;
  if ([caseStart, blogStart, faqStart, contactStart, contactEnd].some(v => v < 0)) throw new Error('Homepage markers not found.');
  html = html.slice(0, caseStart) + '<div id="site-ending-before-blog"></div>\n\n' + html.slice(blogStart, faqStart) + '<div id="site-ending-after-blog"></div>' + html.slice(contactEnd);
}
if (!html.includes('assets/js/shared-ending.js?v=1')) {
  html = html.replace('<script defer src="assets/js/shared-nav-footer.js?v=3"></script>', '<script defer src="assets/js/shared-ending.js?v=1"></script>\n    <script defer src="assets/js/shared-nav-footer.js?v=3"></script>');
}
fs.writeFileSync(path, html, 'utf8');
console.log('Homepage now uses shared ending placeholders around the preserved blog section.');
