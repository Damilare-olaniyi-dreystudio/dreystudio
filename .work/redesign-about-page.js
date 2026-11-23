const fs = require('fs');
const path = 'C:/Users/PC/Downloads/dreystudio-main/about.html';
let html = fs.readFileSync(path, 'utf8');
html = html.replace('<html class="dark" lang="en">', '<html lang="en">');

const styleStart = html.indexOf('  <style>');
const styleEnd = html.indexOf('  </style>', styleStart);
if (styleStart < 0 || styleEnd < 0) throw new Error('About style block not found.');
const css = `  <style>
    :root{--about-paper:#f5f0ff;--about-surface:#fff;--about-ink:#15121a;--about-muted:#5a535f;--about-line:#d6d0dc;--about-purple:#8958e8;--about-purple-dark:#7041c5;--about-soft:#e9deff;}
    .about-page{margin:0;background:var(--about-paper);color:var(--about-ink);font-family:Inter,Manrope,system-ui,sans-serif;overflow-x:hidden;}
    .about-main{width:min(1180px,calc(100% - 40px));margin:0 auto;padding:112px 0 0;}
    .about-hero{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(330px,.95fr);gap:clamp(42px,7vw,92px);align-items:center;padding:58px 0 82px;border-bottom:1px solid var(--about-line);}
    .about-kicker,.about-section-label{display:block;color:var(--about-purple-dark);font:800 10px/1.2 Inter,sans-serif;letter-spacing:.16em;text-transform:uppercase;}
    .about-hero h1{max-width:720px;margin:16px 0 20px;color:var(--about-ink);font:800 clamp(2.65rem,6vw,5.25rem)/1.02 Inter,sans-serif;letter-spacing:-.07em;}
    .about-hero-copy{max-width:620px;margin:0;color:var(--about-muted);font-size:16px;line-height:1.75;}
    .about-hero-visual{position:relative;margin:0;}
    .about-hero-visual img{display:block;width:100%;aspect-ratio:1.25/1;object-fit:cover;border:12px solid var(--about-ink);box-shadow:18px 18px 0 var(--soft-purple);}
    .about-hero-caption{display:inline-flex;position:absolute;left:-18px;bottom:20px;max-width:220px;padding:12px 14px;background:var(--about-purple);color:#fff;font:700 11px/1.45 Inter,sans-serif;}
    .about-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:28px;}
    .about-button{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 21px;border:1px solid transparent;border-radius:999px;font:700 12px/1 Inter,sans-serif;text-decoration:none;transition:background-color .2s ease,border-color .2s ease,color .2s ease,transform .2s ease;}
    .about-button:hover{transform:translateY(-2px);}
    .about-button:focus-visible,.about-service-link:focus-visible,.about-project-link:focus-visible{outline:3px solid #b99aff;outline-offset:4px;}
    .about-button--primary{background:var(--about-purple);color:#fff;box-shadow:0 9px 20px rgba(137,88,232,.18);}
    .about-button--primary:hover,.about-button--primary:focus-visible{background:var(--about-purple-dark);}
    .about-button--secondary{border-color:var(--about-line);background:#fff;color:var(--about-ink);}
    .about-button--secondary:hover,.about-button--secondary:focus-visible{border-color:var(--about-purple);color:var(--about-purple-dark);}
    .about-section{padding:82px 0;border-bottom:1px solid var(--about-line);}
    .about-split{display:grid;grid-template-columns:minmax(220px,.72fr) minmax(0,1.28fr);gap:clamp(40px,8vw,110px);align-items:start;}
    .about-section h2{max-width:500px;margin:11px 0 0;color:var(--about-ink);font:800 clamp(2rem,4vw,3.5rem)/1.08 Inter,sans-serif;letter-spacing:-.06em;}
    .about-copy p{max-width:700px;margin:0 0 18px;color:var(--about-muted);font-size:15px;line-height:1.8;}
    .about-callout{max-width:620px;margin-top:26px;padding:18px 20px;border-left:3px solid var(--about-purple);background:#fff;color:var(--about-ink);font:700 14px/1.6 Inter,sans-serif;}
    .about-founder-panel{display:grid;grid-template-columns:minmax(210px,.7fr) minmax(0,1.3fr);gap:30px;align-items:start;padding:24px;border:1px solid var(--about-line);background:#fff;}
    .about-founder-name{margin:0;color:var(--about-ink);font:800 clamp(1.7rem,3vw,2.55rem)/1.1 Inter,sans-serif;letter-spacing:-.05em;}
    .about-founder-role{margin:9px 0 0;color:var(--about-purple-dark);font:800 10px/1.3 Inter,sans-serif;letter-spacing:.13em;text-transform:uppercase;}
    .about-founder-panel p{margin:0 0 17px;color:var(--about-muted);font-size:14px;line-height:1.75;}
    .about-service-list{margin-top:30px;border-top:1px solid var(--about-line);}
    .about-service{display:grid;grid-template-columns:52px minmax(150px,.55fr) minmax(0,1fr) auto;gap:18px;align-items:start;padding:21px 0;border-bottom:1px solid var(--about-line);}
    .about-service-number{color:var(--about-purple);font:800 11px/1.4 Inter,sans-serif;letter-spacing:.1em;}
    .about-service h3{margin:0;color:var(--about-ink);font:800 16px/1.35 Inter,sans-serif;letter-spacing:-.025em;}
    .about-service p{margin:0;color:var(--about-muted);font-size:13px;line-height:1.6;}
    .about-service-link,.about-project-link{align-self:center;color:var(--about-purple-dark);font:700 10px/1.3 Inter,sans-serif;letter-spacing:.07em;text-transform:uppercase;text-decoration:underline;text-underline-offset:4px;white-space:nowrap;}
    .about-process{margin-top:26px;border-top:1px solid var(--about-line);}
    .about-process-item{display:grid;grid-template-columns:54px minmax(180px,.55fr) minmax(0,1fr);gap:18px;align-items:start;padding:20px 0;border-bottom:1px solid var(--about-line);}
    .about-process-number{color:var(--about-purple);font:800 11px/1.4 Inter,sans-serif;letter-spacing:.1em;}
    .about-process h3{margin:0;color:var(--about-ink);font:800 16px/1.35 Inter,sans-serif;}
    .about-process p{margin:0;color:var(--about-muted);font-size:13px;line-height:1.65;}
    .about-care-list{margin-top:26px;border-top:1px solid var(--about-line);}
    .about-care-item{display:grid;grid-template-columns:220px minmax(0,1fr);gap:28px;padding:19px 0;border-bottom:1px solid var(--about-line);}
    .about-care-item h3{margin:0;color:var(--about-ink);font:800 15px/1.35 Inter,sans-serif;}
    .about-care-item p{max-width:590px;margin:0;color:var(--about-muted);font-size:13px;line-height:1.65;}
    .about-work-section{padding:82px 0;border-bottom:1px solid var(--about-line);}
    .about-work-heading{display:flex;align-items:end;justify-content:space-between;gap:24px;margin-bottom:28px;}
    .about-work-heading h2{margin:11px 0 0;}
    .about-work-heading p{max-width:380px;margin:0;color:var(--about-muted);font-size:14px;line-height:1.65;}
    .about-project-grid{display:grid;grid-template-columns:1.15fr .85fr;gap:18px;align-items:start;}
    .about-project{min-width:0;}
    .about-project--large{grid-row:span 2;}
    .about-project-media{display:block;overflow:hidden;border:1px solid var(--about-line);background:#15121a;}
    .about-project-media img{display:block;width:100%;aspect-ratio:16/10;object-fit:cover;transition:transform .5s ease;}
    .about-project--large .about-project-media img{aspect-ratio:4/3;}
    .about-project:hover img,.about-project:focus-within img{transform:scale(1.025);}
    .about-project h3{margin:13px 0 5px;color:var(--about-ink);font:800 18px/1.25 Inter,sans-serif;letter-spacing:-.03em;}
    .about-project p{margin:0;color:var(--about-muted);font-size:13px;line-height:1.6;}
    .about-project-link{display:inline-block;margin-top:15px;}
    .about-final{width:100vw;margin-left:calc(50% - 50vw);padding:76px max(20px,calc((100vw - 1180px)/2));background:#15121a;color:#fff;display:flex;align-items:end;justify-content:space-between;gap:32px;}
    .about-final h2{margin:10px 0 0;color:#fff;font:800 clamp(2.25rem,4.8vw,4rem)/1.05 Inter,sans-serif;letter-spacing:-.06em;}
    .about-final p{max-width:620px;margin:16px 0 0;color:#d6d0dc;font-size:15px;line-height:1.75;}
    .about-final .about-button--secondary{border-color:#5a5264;background:transparent;color:#fff;}
    .about-final .about-button--secondary:hover,.about-final .about-button--secondary:focus-visible{border-color:#d3bbff;color:#d3bbff;}
    @media(max-width:900px){.about-main{padding-top:104px;}.about-hero{grid-template-columns:1fr;gap:44px;padding:42px 0 70px;}.about-hero-visual{max-width:600px;}.about-split{grid-template-columns:1fr;gap:25px;}.about-founder-panel{grid-template-columns:1fr;gap:20px;}.about-service{grid-template-columns:46px minmax(150px,.75fr) minmax(0,1.2fr);}.about-service-link{grid-column:2/-1;justify-self:start;}.about-final{align-items:start;flex-direction:column;}}
    @media(max-width:640px){.about-main{width:calc(100% - 32px);padding-top:94px;}.about-hero{padding-top:28px;padding-bottom:58px;}.about-hero h1{font-size:clamp(2.55rem,12vw,4.25rem);}.about-hero-copy{font-size:15px;}.about-hero-caption{left:-6px;bottom:12px;}.about-actions{flex-direction:column;align-items:stretch;}.about-button{width:100%;}.about-section,.about-work-section{padding:62px 0;}.about-section h2{font-size:2.35rem;}.about-service{grid-template-columns:38px 1fr;gap:10px;padding:18px 0;}.about-service p{grid-column:2;}.about-service-link{grid-column:2;}.about-process-item{grid-template-columns:38px 1fr;gap:10px;}.about-process-item p{grid-column:2;}.about-care-item{grid-template-columns:1fr;gap:6px;}.about-work-heading{align-items:start;flex-direction:column;}.about-project-grid{grid-template-columns:1fr;gap:30px;}.about-project--large{grid-row:auto;}.about-project--large .about-project-media img,.about-project-media img{aspect-ratio:4/3;}.about-final{padding:58px 16px 64px;}.about-final h2{font-size:2.55rem;}.about-final p{font-size:14px;}}
    @media(prefers-reduced-motion:reduce){.about-page *,.about-page *::before,.about-page *::after{scroll-behavior:auto!important;transition-duration:.01ms!important;animation-duration:.01ms!important;animation-iteration-count:1!important;}}
  </style>`;
html = html.slice(0, styleStart) + css + html.slice(styleEnd + '  </style>'.length);

const mainStart = html.indexOf('  <main class="about-main">');
const mainEnd = html.indexOf('  </main>', mainStart);
if (mainStart < 0 || mainEnd < 0) throw new Error('About main boundaries not found.');
const main = `  <main class="about-main">
    <header class="about-hero">
      <div>
        <span class="about-kicker">About Drey Studio</span>
        <h1>Website design for businesses that want to grow online</h1>
        <p class="about-hero-copy">Drey Studio is a website development and digital design studio in Ibadan, Nigeria. We help businesses explain what they do, build trust online and guide the right visitors toward action.</p>
        <div class="about-actions"><a class="about-button about-button--primary" data-ga-cta="true" data-ga-location="about_hero" href="/book-consultation">Start a project</a><a class="about-button about-button--secondary" data-ga-cta="true" data-ga-location="about_hero" href="/work">View our work</a></div>
      </div>
      <figure class="about-hero-visual"><img src="/assets/images/nexus.png" alt="Drey Studio website project for a construction business" width="1200" height="960" fetchpriority="high" decoding="async"><figcaption class="about-hero-caption">Clear structure. Useful design. Stronger digital presence.</figcaption></figure>
    </header>

    <section class="about-section about-split" aria-labelledby="who-title">
      <div><span class="about-section-label">Who we are</span><h2 id="who-title">A practical web partner for growing businesses.</h2></div>
      <div class="about-copy"><p>Drey Studio helps businesses turn goals into useful digital experiences through website development, UI/UX design, SEO and visual design.</p><p>We work with businesses across Nigeria and internationally that need a clear place to explain their offer, present their work and make the next step easy for customers.</p><div class="about-callout">The approach is simple: understand the business first, then make the experience clear, responsive and practical to maintain.</div></div>
    </section>

    <section class="about-section about-split" aria-labelledby="founder-title">
      <div><span class="about-section-label">The person behind the studio</span><h2 id="founder-title">Design decisions should start with the business.</h2></div>
      <div class="about-founder-panel"><div><h3 class="about-founder-name">Damilare Olaniyi</h3><p class="about-founder-role">Founder / Website Developer</p></div><div><p>Damilare Olaniyi is the founder of Drey Studio and a website developer focused on building websites that help businesses attract customers and grow online.</p><p>His approach starts with what the business does, who it needs to reach, what information people need and what a useful next action looks like. From there, the work brings together structure, UI/UX, development, performance and search considerations.</p><p>The aim is not to make a page that only looks finished. It is to create a digital experience that makes sense for the business and the people it serves.</p></div></div>
    </section>

    <section class="about-section" aria-labelledby="services-title">
      <div class="about-split"><div><span class="about-section-label">What we do</span><h2 id="services-title">The core pieces of a stronger online presence.</h2></div><div class="about-copy"><p>From the first structure and interface decisions through development and search visibility, we bring the pieces together around what your business needs next.</p></div></div>
      <div class="about-service-list">
        <article class="about-service"><span class="about-service-number">01</span><h3>Website Development</h3><p>Business websites, landing pages, e-commerce websites, custom web applications and redesigns built around clear customer journeys.</p><a class="about-service-link" href="/service/website-development">Explore website development</a></article>
        <article class="about-service"><span class="about-service-number">02</span><h3>UI/UX Design</h3><p>User interfaces and experiences designed around clarity, usability and the needs of the product or business.</p><a class="about-service-link" href="/service/ui-ux-design">Explore UI/UX design</a></article>
        <article class="about-service"><span class="about-service-number">03</span><h3>SEO &amp; AI Search Optimization</h3><p>Technical SEO, on-page improvements, local visibility and AI-search foundations that make useful content easier to discover.</p><a class="about-service-link" href="/service/seo-ai-search-optimization">Explore SEO services</a></article>
        <article class="about-service"><span class="about-service-number">04</span><h3>Graphic Design</h3><p>Brand and visual design work that gives the business a more coherent presence across its digital touchpoints.</p><a class="about-service-link" href="/service/graphic-design">Explore graphic design</a></article>
      </div>
    </section>

    <section class="about-section about-split" aria-labelledby="process-title">
      <div><span class="about-section-label">How we work</span><h2 id="process-title">A clear process from first conversation to launch.</h2></div>
      <div class="about-copy"><p>Each stage helps the next decision become clearer, from understanding the business through the work that keeps a site useful after launch.</p><div class="about-process">
        <div class="about-process-item"><span class="about-process-number">01</span><h3>Discovery</h3><p>Understand the business, audience, goals and requirements.</p></div>
        <div class="about-process-item"><span class="about-process-number">02</span><h3>Structure and research</h3><p>Review the context, content and customer paths that should shape the experience.</p></div>
        <div class="about-process-item"><span class="about-process-number">03</span><h3>Design and development</h3><p>Turn the agreed direction into a responsive website or digital product.</p></div>
        <div class="about-process-item"><span class="about-process-number">04</span><h3>Testing and launch</h3><p>Check important routes, interactions, page states and responsive behavior before launch.</p></div>
        <div class="about-process-item"><span class="about-process-number">05</span><h3>Support</h3><p>Continue with maintenance, content updates or improvements when the project needs them.</p></div>
      </div></div>
    </section>

    <section class="about-section about-split" aria-labelledby="care-title">
      <div><span class="about-section-label">What we care about</span><h2 id="care-title">Useful work is measured by what it helps people do.</h2></div>
      <div class="about-care-list">
        <div class="about-care-item"><h3>Clear user experience</h3><p>People should understand the offer, find important information and see the next step.</p></div>
        <div class="about-care-item"><h3>Performance and mobile experience</h3><p>Responsive behavior and sensible loading are part of the design, not final adjustments.</p></div>
        <div class="about-care-item"><h3>Search-ready foundations</h3><p>Useful content, sound technical structure and local context help the right people find the business.</p></div>
        <div class="about-care-item"><h3>Maintainable development</h3><p>A finished website should be practical to update, support and build on.</p></div>
      </div>
    </section>

    <section class="about-work-section" aria-labelledby="work-title">
      <div class="about-work-heading"><div><span class="about-section-label">Selected work</span><h2 id="work-title">Websites built around real business needs.</h2></div><p>Explore selected websites and digital products from the Drey Studio portfolio.</p></div>
      <div class="about-project-grid">
        <article class="about-project about-project--large"><a class="about-project-media" href="/work"><img src="/assets/images/optimized-live/nexus-1000.jpg" alt="Construction company website with service highlights and project gallery" width="1000" height="1000" loading="lazy" decoding="async"></a><h3>Construction Showcase</h3><p>A project-focused construction website that brings services and completed work together.</p></article>
        <article class="about-project"><a class="about-project-media" href="/work/trackpoint/"><img src="/assets/images/trackpoint-devices.png" alt="TrackPoint logistics website shown across desktop, tablet and mobile devices" width="854" height="384" loading="lazy" decoding="async"></a><h3>TrackPoint</h3><p>Logistics website and shipment management platform for booking, tracking and delivery coordination.</p></article>
        <article class="about-project"><a class="about-project-media" href="/work/ewa-fashion/"><img src="/assets/images/ewa-devices.png" alt="Ewa Fashion e-commerce website shown across desktop, tablet and mobile mockups" width="854" height="384" loading="lazy" decoding="async"></a><h3>Ewa Fashion</h3><p>Fashion e-commerce storefront with a clear collection browsing experience.</p></article>
      </div>
      <a class="about-project-link" href="/work">View all work</a>
    </section>

    <section class="about-final" aria-labelledby="final-title"><div><span class="about-section-label">Start a project</span><h2 id="final-title">Need a clearer website for your business?</h2><p>Tell Drey Studio about your website, digital product, redesign or the next thing you are building.</p></div><div class="about-actions"><a class="about-button about-button--primary" data-ga-cta="true" data-ga-location="about_final" href="/book-consultation">Book a consultation</a><a class="about-button about-button--secondary" data-ga-cta="true" data-ga-location="about_final" href="/contact">Contact us</a></div></section>
  </main>`;
html = html.slice(0, mainStart) + main + html.slice(mainEnd + '  </main>'.length);
fs.writeFileSync(path, html, 'utf8');
console.log('About page redesigned.');
