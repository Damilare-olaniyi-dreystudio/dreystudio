const fs = require('node:fs');
const path = require('node:path');
const file = path.resolve('contact.html');
let html = fs.readFileSync(file, 'utf8');
const original = html;
function replaceOnce(source, from, to, label) {
  const count = source.split(from).length - 1;
  if (count !== 1) throw new Error(`${label}: expected one match, found ${count}`);
  return source.replace(from, to);
}
html = replaceOnce(html, '<html class="dark" lang="en">', '<html lang="en">', 'HTML theme class');
html = replaceOnce(html, '<title>Contact Drey Studio | Website &amp; Digital Development in Nigeria</title>', '<title>Contact Drey Studio | Website Design &amp; Development in Nigeria</title>', 'title');
const oldDesc = 'Contact Drey Studio to discuss website development, redesigns, UI/UX, SEO, digital products and other web projects for businesses in Nigeria and beyond.';
const newDesc = 'Contact Drey Studio in Ibadan, Nigeria to plan a business website, redesign, UI/UX project or SEO improvement. Tell us what you need and we’ll discuss the next step.';
const descCount = html.split(oldDesc).length - 1;
if (descCount !== 3) throw new Error(`Expected 3 matching description fields, found ${descCount}`);
html = html.split(oldDesc).join(newDesc);
html = html.replaceAll('Contact Drey Studio | Website &amp; Digital Development in Nigeria', 'Contact Drey Studio | Website Design &amp; Development in Nigeria');
const styleStart = html.indexOf('  <style>\n    :root{--contact-bg:');
const styleEndMarker = '  </style>';
const styleEnd = html.indexOf(styleEndMarker, styleStart);
if (styleStart < 0 || styleEnd < 0) throw new Error('Could not find the existing Contact page style block');
const css = String.raw`  <style>
    :root{--contact-paper:#f7f5fa;--contact-surface:#fff;--contact-ink:#17131d;--contact-muted:#625d69;--contact-line:#e4deeb;--contact-purple:#8958e8;--contact-purple-dark:#7041c5;--contact-soft:#f0eafb;--contact-error:#a52a4b;}
    .contact-page{margin:0;background:var(--contact-paper);color:var(--contact-ink);font-family:Inter,Manrope,system-ui,sans-serif;overflow-x:hidden;}
    .contact-main{width:min(1180px,calc(100% - 40px));margin:0 auto;padding:112px 0 0;}
    .contact-hero{display:block;padding:76px 0 82px;border-bottom:1px solid var(--contact-line);text-align:center;}
    .contact-kicker,.contact-section-label{display:block;color:var(--contact-purple-dark);font:700 10px/1.3 Inter,sans-serif;letter-spacing:.15em;text-transform:uppercase;}
    .contact-hero h1{max-width:900px;margin:20px auto 18px;color:var(--contact-ink);font:800 clamp(2.8rem,6.4vw,5.35rem)/1.02 Inter,sans-serif;letter-spacing:-.07em;}
    .contact-hero-copy{max-width:700px;margin:0 auto;color:var(--contact-muted);font-size:18px;line-height:1.75;}
    .contact-hero-actions{display:flex;justify-content:center;flex-wrap:wrap;gap:12px;margin-top:30px;}
    .contact-hero-button{display:inline-flex;min-height:50px;align-items:center;justify-content:center;padding:0 23px;border:1px solid transparent;border-radius:999px;background:var(--contact-purple);color:#fff;font:700 12px/1 Inter,sans-serif;letter-spacing:.035em;text-decoration:none;transition:background-color .2s ease,border-color .2s ease,color .2s ease;}
    .contact-hero-button:hover,.contact-hero-button:focus-visible{background:var(--contact-purple-dark);}
    .contact-hero-button--secondary{border-color:var(--contact-line);background:#fff;color:var(--contact-ink);}
    .contact-hero-button--secondary:hover,.contact-hero-button--secondary:focus-visible{border-color:var(--contact-purple);background:#fff;color:var(--contact-purple-dark);}
    .contact-hero-button:focus-visible,.contact-button:focus-visible,.contact-submit:focus-visible,.contact-close:focus-visible{outline:3px solid #b99aff;outline-offset:4px;}
    .contact-section{padding:82px 0;border-bottom:1px solid var(--contact-line);}
    .contact-section h2,.contact-final h2{margin:12px 0 0;color:var(--contact-ink);font:800 clamp(2.15rem,4vw,3.6rem)/1.08 Inter,sans-serif;letter-spacing:-.06em;}
    .contact-intro{max-width:660px;margin:12px 0 0;color:var(--contact-muted);font-size:15px;line-height:1.75;}
    .contact-conversation{display:grid;grid-template-columns:minmax(260px,.78fr) minmax(0,1.22fr);gap:clamp(32px,6vw,82px);align-items:start;}
    .contact-methods{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:26px;}
    .contact-method{min-width:0;padding:20px;border:1px solid var(--contact-line);border-radius:15px;background:var(--contact-surface);}
    .contact-method h3{margin:0 0 8px;color:var(--contact-ink);font:700 16px/1.35 Inter,sans-serif;letter-spacing:-.02em;}
    .contact-method p{margin:0 0 12px;color:var(--contact-muted);font-size:13px;line-height:1.6;}
    .contact-method a{color:var(--contact-purple-dark);font-size:13px;font-weight:700;line-height:1.5;text-decoration:none;overflow-wrap:anywhere;}
    .contact-method a:hover,.contact-method a:focus-visible{color:var(--contact-purple-dark);text-decoration:underline;text-underline-offset:3px;}
    .contact-form-wrap{scroll-margin-top:100px;padding:clamp(24px,3vw,36px);border:1px solid var(--contact-line);border-radius:20px;background:var(--contact-surface);box-shadow:0 16px 44px rgba(42,25,72,.06);}
    .contact-form-wrap h2{margin:0 0 10px;font-size:clamp(1.7rem,3vw,2rem);}
    .contact-form-help{margin:0 0 28px;color:var(--contact-muted);font-size:13px;line-height:1.65;}
    .contact-form{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px 16px;}
    .contact-field{min-width:0;}
    .contact-field--full{grid-column:1/-1;}
    .contact-field label{display:block;margin-bottom:8px;color:var(--contact-ink);font:600 12px/1.4 Inter,sans-serif;}
    .contact-required{color:var(--contact-purple-dark);}
    .contact-field input,.contact-field select,.contact-field textarea{display:block;width:100%;min-height:50px;padding:12px 14px;border:1px solid #d8d2df;border-radius:9px;background:#fcfbfd;color:var(--contact-ink);font:400 14px/1.5 Inter,sans-serif;transition:border-color .18s ease,background-color .18s ease;}
    .contact-field textarea{min-height:142px;resize:vertical;}
    .contact-field input::placeholder,.contact-field textarea::placeholder{color:#88818f;}
    .contact-field input:focus,.contact-field select:focus,.contact-field textarea:focus{border-color:var(--contact-purple);outline:3px solid rgba(137,88,232,.14);background:#fff;}
    .contact-field input[aria-invalid="true"],.contact-field select[aria-invalid="true"],.contact-field textarea[aria-invalid="true"]{border-color:var(--contact-error);}
    .contact-error{min-height:18px;margin-top:6px;color:var(--contact-error);font-size:12px;line-height:1.4;}
    .contact-form-status{grid-column:1/-1;min-height:22px;margin:0;color:var(--contact-error);font-size:13px;line-height:1.5;}
    .contact-submit{display:inline-flex;min-height:50px;align-items:center;justify-content:center;padding:0 24px;border:0;border-radius:999px;background:var(--contact-purple);color:#fff;cursor:pointer;font:700 12px/1 Inter,sans-serif;letter-spacing:.035em;transition:background-color .18s ease;}
    .contact-submit:hover,.contact-submit:focus-visible{background:var(--contact-purple-dark);}
    .contact-submit:disabled{cursor:wait;opacity:.65;}
    .contact-message-guide{display:grid;grid-template-columns:minmax(260px,.78fr) minmax(0,1.22fr);gap:clamp(32px,6vw,82px);align-items:start;}
    .contact-guide-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 26px;border-top:1px solid var(--contact-line);}
    .contact-guide-item{padding:20px 0;border-bottom:1px solid var(--contact-line);color:var(--contact-muted);font-size:13px;line-height:1.65;}
    .contact-guide-item strong{display:block;margin-bottom:6px;color:var(--contact-ink);font:700 15px/1.4 Inter,sans-serif;}
    .contact-final{width:100vw;margin-left:calc(50% - 50vw);padding:72px max(20px,calc((100vw - 1180px)/2));background:#15121a;color:#fff;display:flex;align-items:end;justify-content:space-between;gap:32px;}
    .contact-final .contact-section-label{color:#d3bbff;}
    .contact-final h2{color:#fff;}
    .contact-final p{max-width:620px;margin:16px 0 0;color:#d6d0dc;font-size:15px;line-height:1.75;}
    .contact-final-actions{display:flex;flex-wrap:wrap;gap:10px;}
    .contact-button{display:inline-flex;min-height:48px;align-items:center;justify-content:center;padding:0 19px;border:1px solid #5a5264;border-radius:999px;background:transparent;color:#fff;font:700 11px/1 Inter,sans-serif;letter-spacing:.04em;text-decoration:none;white-space:nowrap;transition:border-color .18s ease,background-color .18s ease,color .18s ease;}
    .contact-button:hover,.contact-button:focus-visible{border-color:#d3bbff;color:#d3bbff;}
    .contact-final-actions .contact-button:first-child{border-color:var(--contact-purple);background:var(--contact-purple);color:#fff;}
    .contact-final-actions .contact-button:first-child:hover,.contact-final-actions .contact-button:first-child:focus-visible{border-color:var(--contact-purple-dark);background:var(--contact-purple-dark);color:#fff;}
    .contact-modal{position:fixed;inset:0;z-index:9999;display:grid;place-items:center;padding:20px;background:rgba(23,19,29,.62);opacity:0;pointer-events:none;visibility:hidden;transition:opacity .2s ease,visibility 0s linear .2s;}
    .contact-modal.is-open{opacity:1;pointer-events:auto;visibility:visible;transition-delay:0s;}
    .contact-modal-box{position:relative;width:min(520px,100%);max-height:calc(100dvh - 40px);overflow-y:auto;padding:34px;border:1px solid var(--contact-line);border-radius:20px;background:#fff;box-shadow:0 24px 80px rgba(0,0,0,.18);opacity:0;transform:translateY(12px);transition:opacity .22s ease,transform .22s ease;}
    .contact-modal.is-open .contact-modal-box{opacity:1;transform:translateY(0);}
    .contact-success-icon{display:grid;width:42px;height:42px;place-items:center;margin-bottom:22px;border:1px solid var(--contact-purple);border-radius:50%;color:var(--contact-purple-dark);font:600 22px/1 Inter,sans-serif;}
    .contact-modal-box h2{margin:0 0 12px;color:var(--contact-ink);font:700 2rem/1.1 Inter,sans-serif;}
    .contact-modal-box p{margin:0;color:var(--contact-muted);font-size:15px;line-height:1.7;}
    .contact-close{display:inline-flex;min-height:48px;align-items:center;justify-content:center;margin-top:26px;padding:0 22px;border:0;border-radius:999px;background:var(--contact-purple);color:#fff;cursor:pointer;font:700 12px/1 Inter,sans-serif;letter-spacing:.035em;transition:background-color .18s ease;}
    .contact-close:hover{background:var(--contact-purple-dark);}
    body.contact-modal-open{overflow:hidden;}
    @media(max-width:900px){.contact-main{padding-top:104px;}.contact-hero{padding:62px 0 70px;}.contact-conversation,.contact-message-guide{grid-template-columns:1fr;gap:34px;}.contact-conversation>div:first-child{max-width:760px;}.contact-final{align-items:flex-start;flex-direction:column;}}
    @media(max-width:640px){.contact-main{width:calc(100% - 32px);padding-top:94px;}.contact-hero{padding:48px 0 58px;}.contact-hero h1{font-size:clamp(2.55rem,12vw,4.2rem);}.contact-hero-copy{font-size:15px;line-height:1.7;}.contact-hero-actions{flex-direction:column;align-items:stretch;}.contact-hero-button{width:100%;}.contact-section{padding:62px 0;}.contact-section h2,.contact-final h2{font-size:2.4rem;}.contact-methods,.contact-guide-list{grid-template-columns:1fr;}.contact-form-wrap{padding:23px 17px;border-radius:16px;}.contact-form{grid-template-columns:1fr;gap:17px;}.contact-field--full{grid-column:auto;}.contact-submit{width:100%;}.contact-final{padding:58px 16px 64px;}.contact-final p{font-size:14px;}.contact-final-actions{width:100%;flex-direction:column;}.contact-final-actions .contact-button{width:100%;}.contact-modal-box{padding:30px 22px;}}
    @media(prefers-reduced-motion:reduce){.contact-page *,.contact-page *::before,.contact-page *::after{scroll-behavior:auto!important;transition-duration:.01ms!important;animation-duration:.01ms!important;animation-iteration-count:1!important;}}
  </style>`;
html = html.slice(0, styleStart) + css + html.slice(styleEnd + styleEndMarker.length);
const oldHero = `    <header class="contact-hero">
      <div><h1>Let's Build Something That Moves Your Business Forward</h1><p class="contact-hero-copy">Reach out to discuss a new website, redesign, UI/UX work, SEO, a digital product or another web project</p></div>
    </header>`;
const newHero = `    <header class="contact-hero">
      <span class="contact-kicker">Contact Drey Studio · Ibadan, Nigeria</span>
      <h1>Let’s talk about the website your business needs</h1>
      <p class="contact-hero-copy">Planning a new website, a redesign or a stronger search presence? Tell us what your business needs, and we’ll help you work out a practical next step.</p>
      <div class="contact-hero-actions">
        <a class="contact-hero-button" data-ga-cta="true" data-ga-location="contact_hero" href="#contact-form">Send a project enquiry</a>
        <a class="contact-hero-button contact-hero-button--secondary" data-ga-location="contact_hero" href="https://wa.me/2349019735169" target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
      </div>
    </header>`;
html = replaceOnce(html, oldHero, newHero, 'hero markup');
html = replaceOnce(html, '<h2 id="conversation-title">Start a Conversation</h2><p class="contact-intro">Choose the route that suits the kind of conversation you want to have. For a detailed enquiry, use the form and include whatever context you already have.</p>', '<span class="contact-section-label">Get in touch</span><h2 id="conversation-title">Choose how you’d like to talk</h2><p class="contact-intro">Use the contact option that feels right, or send a project enquiry with a few details about what you need.</p>', 'conversation intro');
html = replaceOnce(html, '<h2>Send an enquiry</h2><p class="contact-form-help">Tell us enough to understand what you need. Required fields are marked with <span aria-hidden="true">*</span>.</p>', '<h2>Tell us about your project</h2><p class="contact-form-help">Share the essentials so we can understand what you need. Required fields are marked with <span aria-hidden="true">*</span>.</p>', 'form heading');
const oldGuide = '<section class="contact-section" aria-labelledby="tell-title"><div class="contact-message-guide"><div><h2 id="tell-title">What to Tell Us</h2></div><div class="contact-guide-list"><div class="contact-guide-item"><strong>What the business does</strong></div><div class="contact-guide-item"><strong>What you want to build</strong></div><div class="contact-guide-item"><strong>The problem to solve</strong></div><div class="contact-guide-item"><strong>Existing links</strong></div><div class="contact-guide-item"><strong>Desired features</strong></div><div class="contact-guide-item"><strong>Approximate timeline</strong></div></div></div></section>';
const newGuide = '<section class="contact-section" aria-labelledby="tell-title"><div class="contact-message-guide"><div><span class="contact-section-label">A useful starting point</span><h2 id="tell-title">What to include in your enquiry</h2><p class="contact-intro">You do not need a finished brief. A few useful details are enough to start a focused conversation.</p></div><div class="contact-guide-list"><div class="contact-guide-item"><strong>Your business</strong>What you offer and who you serve.</div><div class="contact-guide-item"><strong>Your project goal</strong>What you want the website or digital project to help you achieve.</div><div class="contact-guide-item"><strong>What needs to change</strong>The challenge you want the project to solve.</div><div class="contact-guide-item"><strong>Current website or examples</strong>Share any existing links or references that can help explain your direction.</div><div class="contact-guide-item"><strong>Features you have in mind</strong>List the key functions or pages you would like to include.</div><div class="contact-guide-item"><strong>Your preferred timing</strong>Include a target date or approximate timeline if you have one.</div></div></div></section>';
html = replaceOnce(html, oldGuide, newGuide, 'enquiry guidance');
html = replaceOnce(html, '<section class="contact-final" aria-labelledby="final-title"><div><h2 id="final-title">Have a project in mind?</h2><p>Not ready to send an enquiry yet? Explore the work or book a consultation when you are ready to talk through the next step.</p></div>', '<section class="contact-final" aria-labelledby="final-title"><div><span class="contact-section-label">Your next step</span><h2 id="final-title">Have a website project in mind?</h2><p>When you’re ready, send a few project details, explore our case studies or book a consultation to talk through what comes next.</p></div>', 'final CTA');
if (html === original) throw new Error('No changes were made');
if ((html.match(/<h1\b/g) || []).length !== 1) throw new Error('Expected exactly one H1');
if ((html.match(/id="contact-form"/g) || []).length !== 1) throw new Error('Expected one contact form anchor');
for (const required of ['action="https://formspree.io/f/xqeowvyn"','assets/js/shared-nav-footer.js?v=8','name="full_name"','name="email"','name="project_type"','name="message"','contact-success-modal','form_submit']) {
  if (!html.includes(required)) throw new Error(`Preservation check failed: ${required}`);
}
fs.writeFileSync(file, html, 'utf8');
console.log('Updated contact.html and passed targeted preservation checks for H1, form action/fields, analytics, modal and shared nav/footer.');
