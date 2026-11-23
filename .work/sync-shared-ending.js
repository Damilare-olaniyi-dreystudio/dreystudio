const fs = require('fs');
const root = 'C:/Users/PC/Downloads/dreystudio-main';
const indexPath = `${root}/index.html`;
const aboutPath = `${root}/about.html`;
const index = fs.readFileSync(indexPath, 'utf8');

const caseStart = index.indexOf('<section class="home-section home-case-studies"');
const blogStart = index.indexOf('<section class="home-section home-blog"');
const faqStart = index.indexOf('<section class="home-section" aria-labelledby="faq-heading">');
const contactStart = index.indexOf('<section class="home-contact-strip"');
const contactEnd = index.indexOf('</section>', contactStart) + '</section>'.length;
if ([caseStart, blogStart, faqStart, contactStart, contactEnd].some(v => v < 0)) throw new Error('Homepage ending markers were not found.');
const sharedEnding = index.slice(caseStart, blogStart) + '\n\n' + index.slice(faqStart, contactEnd);

const styleStart = index.indexOf('<style>');
const styleEnd = index.indexOf('</style>', styleStart);
if (styleStart < 0 || styleEnd < 0) throw new Error('Homepage style block was not found.');
const homepageCss = index.slice(styleStart + '<style>'.length, styleEnd);
fs.mkdirSync(`${root}/assets/css`, { recursive: true });
fs.writeFileSync(`${root}/assets/css/shared-ending.css`, `${homepageCss}\n#site-ending{display:contents;}\n`, 'utf8');
fs.writeFileSync(`${root}/assets/js/shared-ending.js`, `/* Canonical Case Studies-to-contact ending. Blog is intentionally excluded. */\n(function(){\n  var target=document.getElementById('site-ending');\n  if(!target) return;\n  target.innerHTML=${JSON.stringify(sharedEnding)};\n})();\n`, 'utf8');

let about = fs.readFileSync(aboutPath, 'utf8');
about = about.replace('<link rel="stylesheet" href="/output.css">', '<link rel="stylesheet" href="/output.css">\n  <link rel="stylesheet" href="/assets/css/shared-ending.css">');
about = about.replace('<body class="about-page font-body-md">', '<body class="home-page about-page font-body-md">');
const oldHeroStart = about.indexOf('    <header class="about-hero">');
const oldHeroEnd = about.indexOf('    </header>', oldHeroStart) + '    </header>'.length;
if (oldHeroStart < 0 || oldHeroEnd < 0) throw new Error('About hero boundaries were not found.');
const hero = `    <header class="home-hero about-home-hero">
      <span class="home-eyebrow">About Drey Studio</span>
      <h1>Website design and development for <em>growing businesses</em> <strong>in Nigeria</strong></h1>
      <p class="home-hero-copy">Drey Studio is a website development and digital design studio in Ibadan. We help businesses explain what they do, build trust online and guide the right visitors toward action.</p>
      <div class="home-actions"><a class="home-button home-button--primary" data-ga-cta="true" data-ga-location="about_hero" href="/book-consultation">Start a project</a><a class="home-button home-button--secondary" data-ga-cta="true" data-ga-location="about_hero" href="/work">View our work</a></div>
      <div class="home-proof about-home-proof"><div class="home-proof-bar"><span class="home-proof-dots" aria-hidden="true"><i></i><i></i><i></i></span><span>drey-studio.ng / about</span></div><div class="home-proof-screen"><img src="/assets/images/nexus.png" alt="Drey Studio website project for a construction business" width="1200" height="960" fetchpriority="high" decoding="async"></div><p class="home-proof-caption">A clearer digital presence starts with understanding the business.</p></div>
    </header>`;
about = about.slice(0, oldHeroStart) + hero + about.slice(oldHeroEnd);
const finalStart = about.indexOf('    <section class="about-final"');
const finalEnd = about.indexOf('    </section>', finalStart) + '    </section>'.length;
if (finalStart < 0 || finalEnd < 0) throw new Error('About page-specific final CTA not found.');
about = about.slice(0, finalStart) + '    <div id="site-ending"></div>' + about.slice(finalEnd);
about = about.replace('<script defer src="assets/js/shared-nav-footer.js?v=3"></script>', '<script defer src="assets/js/shared-ending.js?v=1"></script>\n  <script defer src="assets/js/shared-nav-footer.js?v=3"></script>');
const overrides = `\n    /* About enrollment: homepage-centered hero and intentional comparison grids. */\n    .about-page .about-home-hero{display:block;position:relative;text-align:center;padding:84px 0 68px;background-image:linear-gradient(rgba(137,88,232,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(137,88,232,.055) 1px,transparent 1px);background-size:48px 48px;border-bottom:1px solid var(--about-line);}\n    .about-page .about-home-hero>*{position:relative;}\n    .about-page .about-home-hero h1{max-width:860px;margin:24px auto 16px;}\n    .about-page .about-home-hero h1 em{display:block;font-style:italic;font-weight:700;}\n    .about-page .about-home-hero h1 strong{color:var(--about-purple);font-weight:800;}\n    .about-page .about-home-hero .home-hero-copy{max-width:650px;margin:0 auto;}\n    .about-page .about-home-hero .home-actions{justify-content:center;}\n    .about-page .about-home-proof{margin:50px auto 0;max-width:1000px;padding:12px;}\n    .about-page .about-home-proof .home-proof-screen img{aspect-ratio:2.28/1;object-fit:cover;}\n    .about-page .about-service-list{display:grid;grid-template-columns:1.15fr .85fr;gap:14px;border:0;}\n    .about-page .about-service{display:block;min-height:190px;padding:24px;border:0;background:#15121A;color:#fff;}\n    .about-page .about-service:nth-child(2){background:#211D25;}\n    .about-page .about-service:nth-child(3){background:#2A1948;}\n    .about-page .about-service:nth-child(4){background:#fff;border:1px solid var(--about-line);}\n    .about-page .about-service:first-child{grid-row:span 2;}\n    .about-page .about-service-number{display:block;}\n    .about-page .about-service h3{margin:42px 0 10px;color:inherit;font-size:21px;}\n    .about-page .about-service p{color:#D6D0DC;}\n    .about-page .about-service:nth-child(4) p{color:var(--about-muted);}\n    .about-page .about-service-link{display:inline-block;margin-top:20px;color:#fff;}\n    .about-page .about-service:nth-child(4) .about-service-link{color:var(--about-purple-dark);}\n    .about-page .about-care-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;border:0;}\n    .about-page .about-care-item{display:block;padding:22px;border:1px solid var(--about-line);background:#fff;}\n    .about-page .about-care-item p{margin-top:8px;}\n    @media(max-width:900px){.about-page .about-service-list{grid-template-columns:1fr 1fr;}.about-page .about-service:first-child{grid-row:auto;grid-column:span 2;}.about-page .about-service{min-height:0;}.about-page .about-care-list{grid-template-columns:1fr 1fr;}}\n    @media(max-width:640px){.about-page .about-home-hero{padding:58px 0;}.about-page .about-home-hero h1{font-size:clamp(2.55rem,12vw,4.25rem);}.about-page .about-service-list,.about-page .about-care-list{grid-template-columns:1fr;}.about-page .about-service:first-child{grid-column:auto;}.about-page .about-service h3{margin-top:28px;}}\n`;
about = about.replace('  </style>', overrides + '  </style>');
fs.writeFileSync(aboutPath, about, 'utf8');
console.log('Shared ending module created and About enrolled.');
