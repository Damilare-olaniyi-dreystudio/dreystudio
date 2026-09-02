/* Shared canonical Nav + Footer for all pages (plain HTML + vanilla JS).
   - Injects into #site-nav and #site-footer
   - Desktop: Services dropdown on hover
   - Mobile: Services accordion item in hamburger menu
   - Mobile nav container is fixed to remain reachable after scroll
*/

(function () {
  const NAV_HTML = `
<header
  class="fixed top-0 left-0 right-0 w-full flex justify-between items-center px-margin-mobile md:px-margin-desktop py-stack-sm bg-background dark:bg-background border-b border-outline-variant dark:border-outline-variant"
  style="z-index: 9999;"
>
  <a href="/" aria-label="Drey Studio home" class="font-headline-lg text-headline-lg tracking-tighter text-on-background dark:text-on-background hover:text-primary transition-colors">
    Drey Studio
  </a>

  <!-- Desktop Navigation -->
  <nav class="hidden lg:flex items-center gap-stack-md font-label-caps text-label-caps">
    <a class="text-on-surface-variant dark:text-on-surface-variant border-b-2 border-transparent hover:text-primary hover:border-primary transition-colors" href="/">Home</a>
    <a class="text-on-surface-variant dark:text-on-surface-variant border-b-2 border-transparent hover:text-primary hover:border-primary transition-colors" href="/work">Our Work</a>

    <!-- Services Dropdown -->
    <div class="relative group" aria-label="Our Services">
      <a href="/service/service"
        class="text-on-surface-variant dark:text-on-surface-variant border-b-2 border-transparent hover:text-primary hover:border-primary transition-colors inline-flex items-center gap-2"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <span>Our Services</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="text-primary">
          <path d="M7 10l5 5 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </a>

      <div
class="absolute left-0 w-64 rounded-lg bg-background dark:bg-background border border-outline-variant dark:border-outline-variant shadow-lg shadow-black/10 opacity-0 translate-y-1 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto"
        style="top: 100%; padding-top: 8px;"
        role="menu"
      >
        <a class="block px-5 py-3 font-label-caps text-label-caps text-on-surface-variant border-b-2 border-transparent hover:bg-surface-container hover:text-primary hover:border-primary transition-colors" href="/service/website-development" role="menuitem">Website Development</a>
<a class="block px-5 py-3 font-label-caps text-label-caps text-on-surface-variant border-b-2 border-transparent hover:bg-surface-container hover:text-primary hover:border-primary transition-colors" href="/service/ui-ux-design" role="menuitem">UI/UX Design</a>
        <a class="block px-5 py-3 font-label-caps text-label-caps text-on-surface-variant border-b-2 border-transparent hover:bg-surface-container hover:text-primary hover:border-primary transition-colors" href="/service/graphic-design" role="menuitem">Graphic Design</a>
        <a class="block px-5 py-3 font-label-caps text-label-caps text-on-surface-variant border-b-2 border-transparent hover:bg-surface-container hover:text-primary hover:border-primary transition-colors" href="/service/seo-ai-search-optimization" role="menuitem">SEO &amp; AI Search Optimization</a>
      </div>
    </div>

    <a class="text-on-surface-variant dark:text-on-surface-variant border-b-2 border-transparent hover:text-primary hover:border-primary transition-colors" href="/about">About</a>
    <a class="text-on-surface-variant dark:text-on-surface-variant border-b-2 border-transparent hover:text-primary hover:border-primary transition-colors" href="/contact">Contact Us</a>
  </nav>

  <!-- Mobile Hamburger Button -->
  <button
    id="mobile-menu-toggle"
    class="lg:hidden inline-flex items-center justify-center p-2 text-on-background"
    aria-label="Open navigation"
    aria-expanded="false"
    type="button"
    style="position: fixed; top: 12px; right: 16px; z-index: 80;"
  >
        <svg id="mobile-menu-open-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="text-primary w-6 h-6">
          <path d="M4 6h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M4 12h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M4 18h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <svg id="mobile-menu-close-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="text-primary w-6 h-6 hidden">
          <path d="M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>

  </button>

  <!-- Desktop CTA -->
  <a
    class="hidden lg:inline-flex bg-primary text-on-primary px-stack-md py-stack-sm font-label-caps text-label-caps hover:bg-primary-fixed-dim transition-all duration-300 rounded-lg active:translate-y-0.5"
    href="https://wa.me/2349019735169"
    target="_blank"
    rel="noopener noreferrer"
  >
    Hire Me
  </a>

  <!-- Mobile Navigation Panel -->
  <nav
    id="mobile-nav"
    class="lg:hidden hidden fixed left-0 right-0 bg-background dark:bg-background border-b border-outline-variant dark:border-outline-variant"
    style="top: 64px; max-height: calc(100vh - 64px); overflow-y: auto; z-index: 70; width: 100%;"
  >
    <div class="px-margin-mobile py-stack-sm flex flex-col gap-stack-md font-label-caps text-label-caps" style="min-width: 0;">
      <a class="text-on-surface-variant dark:text-on-surface-variant border-b-2 border-transparent hover:text-primary hover:border-primary transition-colors" href="/">Home</a>
      <a class="text-on-surface-variant dark:text-on-surface-variant border-b-2 border-transparent hover:text-primary hover:border-primary transition-colors" href="/work">Our Work</a>

      <!-- Mobile Services Accordion -->
      <div class="border border-outline-variant rounded-lg">
        <div class="flex items-center justify-between px-5 py-3"><a href="/service/service" class="text-on-surface-variant dark:text-on-surface-variant border-b-2 border-transparent hover:text-primary hover:border-primary transition-colors">Our Services</a><button
          type="button"
          id="mobile-services-toggle"
class="inline-flex items-center justify-center p-2 text-on-surface-variant dark:text-on-surface-variant hover:text-primary transition-colors"
          aria-label="Toggle Our Services menu"
          style="touch-action: manipulation;"
          aria-expanded="false"
          aria-controls="mobile-services-menu"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="text-primary" id="mobile-services-chevron">
            <path d="M7 10l5 5 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button></div>
        <div id="mobile-services-menu" class="hidden px-5 pb-4" role="region" aria-label="Our Services">
<a class="block py-2 text-on-surface-variant border-b-2 border-transparent hover:text-primary hover:border-primary transition-colors" href="/service/website-development">Website Development</a>
<a class="block py-2 text-on-surface-variant border-b-2 border-transparent hover:text-primary hover:border-primary transition-colors" href="/service/ui-ux-design">UI/UX Design</a>
          <a class="block py-2 text-on-surface-variant border-b-2 border-transparent hover:text-primary hover:border-primary transition-colors" href="/service/graphic-design">Graphic Design</a>
          <a class="block py-2 text-on-surface-variant border-b-2 border-transparent hover:text-primary hover:border-primary transition-colors" href="/service/seo-ai-search-optimization">SEO &amp; AI Search Optimization</a>
        </div>
      </div>

      <a class="text-on-surface-variant dark:text-on-surface-variant border-b-2 border-transparent hover:text-primary hover:border-primary transition-colors" href="/about">About</a>
      <a class="text-on-surface-variant dark:text-on-surface-variant border-b-2 border-transparent hover:text-primary hover:border-primary transition-colors" href="/contact">Contact Us</a>

      <a
        class="bg-primary text-on-primary px-stack-md py-stack-sm font-label-caps text-label-caps hover:bg-primary-fixed-dim transition-all duration-300 rounded-lg active:translate-y-0.5"
        href="https://wa.me/2349019735169"
        target="_blank"
        rel="noopener noreferrer"
      >
        Hire Me
      </a>
    </div>
  </nav>
</header>
`;

  const FOOTER_HTML = `
<footer class="relative pt-stack-lg flex flex-col" style="width: 100vw; margin-left: calc(50% - 50vw);" aria-label="Site footer">
    <div class="w-full bg-surface-container-lowest dark:bg-surface-container-lowest border-t border-outline-variant dark:border-outline-variant">
    <div class="px-margin-mobile md:px-margin-desktop py-stack-lg flex flex-col lg:flex-row lg:items-start lg:justify-between gap-stack-lg">

      <!-- Column 1: Brand + Description + Socials -->
      <div class="lg:max-w-xs">
        <div class="font-headline-lg text-headline-lg text-on-background mb-2">Drey Studio</div>
        <p class="text-on-surface-variant font-body-md max-w-sm">
          Helping businesses build credibility, attract customers, and grow online through strategic websites and visual branding.
        </p>

        <!-- Social Icons Row (moved lower for balance) -->
        <div class="mt-stack-md flex flex-wrap gap-x-gutter gap-y-stack-sm">
          <a class="text-on-surface-variant hover:translate-x-1 hover:text-primary transition-all duration-300 flex items-center gap-2 font-body-md" href="https://www.tiktok.com/@olaniyidami162" target="_blank" aria-label="TikTok">
<img alt="TikTok logo" loading="lazy" class="w-4 h-4" src="/assets/icons/tiktok.svg" /> TikTok
          </a>
          <a class="text-on-surface-variant hover:translate-x-1 hover:text-primary transition-all duration-300 flex items-center gap-2 font-body-md" href="https://x.com/olaniyidami162" target="_blank" aria-label="Twitter">
<img alt="Twitter logo" loading="lazy" class="w-4 h-4" src="/assets/icons/twitter.svg" /> Twitter
          </a>
          <a class="text-on-surface-variant hover:translate-x-1 hover:text-primary transition-all duration-300 flex items-center gap-2 font-body-md" href="https://www.linkedin.com/in/olaniyidami162/" target="_blank" aria-label="LinkedIn">
<img alt="LinkedIn logo" loading="lazy" class="w-4 h-4" src="/assets/icons/linkedinn.svg" /> LinkedIn
          </a>
          <a class="text-on-surface-variant hover:translate-x-1 hover:text-primary transition-all duration-300 flex items-center gap-2 font-body-md" href="https://www.instagram.com/olaniyidami162/" target="_blank" aria-label="Instagram">
<img alt="Instagram logo" loading="lazy" class="w-4 h-4" src="/assets/icons/instagram.svg" /> Instagram
          </a>
          <a class="text-on-surface-variant hover:translate-x-1 hover:text-primary transition-all duration-300 flex items-center gap-2 font-body-md" href="https://www.behance.net/damilareolaniyi12" target="_blank" aria-label="Behance">
<img alt="Behance logo" loading="lazy" class="w-4 h-4" src="/assets/icons/behance.svg" /> Behance
          </a>
        </div>
      </div>

      <!-- Column 2: Quick Links -->
      <div class="min-w-[10rem]">
        <div class="font-headline-lg text-headline-lg text-on-background mb-4">Quick Links</div>
        <ul class="space-y-3">
          <li><a class="text-on-surface-variant hover:text-primary transition-colors" href="/">Home</a></li>
          <li><a class="text-on-surface-variant hover:text-primary transition-colors" href="/work">Our Work</a></li>
          <li><a class="text-on-surface-variant hover:text-primary transition-colors" href="/service/service">Our Services</a></li>
          <li><a class="text-on-surface-variant hover:text-primary transition-colors" href="/about">About</a></li>
          <li><a class="text-on-surface-variant hover:text-primary transition-colors" href="/contact">Contact Us</a></li>
          <li><a class="text-on-surface-variant hover:text-primary transition-colors" href="/book-consultation">Book Consultation</a></li>
        </ul>
      </div>

      <!-- Column 3: Our Services -->
      <div class="min-w-[10rem]">
        <div class="font-headline-lg text-headline-lg text-on-background mb-4">Our Services</div>
        <ul class="space-y-3">
          <li class="text-on-surface-variant">Website Development</li>
          <li class="text-on-surface-variant">UI/UX Design</li>
          <li class="text-on-surface-variant">Graphic Design</li>
          <li class="text-on-surface-variant">SEO</li>
          <li class="text-on-surface-variant">WordPress Development</li>
        </ul>
      </div>

      <!-- Column 4: Contact Info -->
      <div class="min-w-[12rem]">
        <div class="font-headline-lg text-headline-lg text-on-background mb-4">Contact Info</div>
        <div class="space-y-3">
          <div>
            <div class="font-label-caps text-label-caps text-on-surface-variant mb-1">Address</div>
            <div class="text-on-surface-variant">Ibadan, Oyo State, Nigeria</div>
          </div>
          <div>
            <div class="font-label-caps text-label-caps text-on-surface-variant mb-1">Phone</div>
            <a class="text-on-surface-variant hover:text-primary transition-colors" href="tel:+2349019735169">+2349019735169</a>
          </div>
          <div>
            <div class="font-label-caps text-label-caps text-on-surface-variant mb-1">Email</div>
            <a class="text-on-surface-variant hover:text-primary transition-colors" href="mailto:thedreystudio1@gmail.com">thedreystudio1@gmail.com</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Bottom -->
    <div class="px-margin-mobile md:px-margin-desktop pb-0 flex flex-col md:flex-row gap-stack-sm md:gap-0 items-start md:items-center justify-between">
      <p class="text-on-surface-variant font-body-md opacity-70">© 2026 Drey Studio. All Rights Reserved.</p>
    </div>
  </div>
</footer>
`;

  function initStickyHeader() {
    const header = document.querySelector('header');
    if (!header) return;

    let ticking = false;
    let isScrolled = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const shouldBeScrolled = window.scrollY > 50;
        if (shouldBeScrolled !== isScrolled) {
          header.classList.toggle('bg-background/90', shouldBeScrolled);
          header.classList.toggle('backdrop-blur-md', shouldBeScrolled);
          isScrolled = shouldBeScrolled;
        }
        ticking = false;
      });
    };

    isScrolled = window.scrollY > 50;
    header.classList.toggle('bg-background/90', isScrolled);
    header.classList.toggle('backdrop-blur-md', isScrolled);
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function initMobileMenuAndServices() {
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');

    // Note: body filtering/dimming has been removed.
    // Applying CSS filters on <body> breaks position:fixed descendants,
    // which caused the mobile hamburger scroll-to-top bug.
    
    const header = document.querySelector('#site-nav header');


    const servicesToggle = document.getElementById('mobile-services-toggle');
    const servicesMenu = document.getElementById('mobile-services-menu');
    const servicesChevron = document.getElementById('mobile-services-chevron');

    if (!mobileToggle || !mobileNav) return;




    const setMobileOpen = (open) => {
    const isOpen = !mobileNav.classList.contains('hidden');

      if (open === isOpen) return;

      if (open) {
        mobileNav.classList.remove('hidden');
        mobileToggle.setAttribute('aria-expanded', 'true');
        const menuIcon = mobileToggle.querySelector('#mobile-menu-open-icon');
        const closeIcon = mobileToggle.querySelector('#mobile-menu-close-icon');
        if (menuIcon) menuIcon.classList.add('hidden');
        if (closeIcon) closeIcon.classList.remove('hidden');
      } else {
        mobileNav.classList.add('hidden');
        mobileToggle.setAttribute('aria-expanded', 'false');
        if (servicesMenu) servicesMenu.classList.add('hidden');
        if (servicesToggle) servicesToggle.setAttribute('aria-expanded', 'false');
        if (servicesChevron) servicesChevron.style.transform = 'rotate(0deg)';
        const menuIcon = mobileToggle.querySelector('#mobile-menu-open-icon');
        const closeIcon = mobileToggle.querySelector('#mobile-menu-close-icon');
        if (menuIcon) menuIcon.classList.remove('hidden');
        if (closeIcon) closeIcon.classList.add('hidden');
      }
    };


    mobileToggle.addEventListener('click', () => {
      const isOpen = !mobileNav.classList.contains('hidden');
      setMobileOpen(!isOpen);
    });

    // One delegated handler replaces listeners on every injected navigation link.
    mobileNav.addEventListener('click', (event) => {
      const link = event.target.closest('a');
      if (link) setMobileOpen(false);
    });

    if (servicesToggle && servicesMenu) {
      const setServicesExpanded = (expanded) => {
        const isExpanded = !servicesMenu.classList.contains('hidden');
        if (expanded === isExpanded) return;

        if (expanded) {
          servicesMenu.classList.remove('hidden');
          servicesToggle.setAttribute('aria-expanded', 'true');
          if (servicesChevron) servicesChevron.style.transform = 'rotate(180deg)';
        } else {
          servicesMenu.classList.add('hidden');
          servicesToggle.setAttribute('aria-expanded', 'false');
          if (servicesChevron) servicesChevron.style.transform = 'rotate(0deg)';
        }
      };

      servicesToggle.addEventListener('click', (event) => {
        // Keep dropdown control independent from the Services link itself.
        event.preventDefault();
        event.stopPropagation();
        const currentlyExpanded = !servicesMenu.classList.contains('hidden');
        setServicesExpanded(!currentlyExpanded);
      });

      // Close accordion when mobile menu closes.
    }
  }

function initFaqAccordion() {
    const faqRoot = document.querySelector('[data-faq="accordion"]');
    if (!faqRoot) return;

    const buttons = faqRoot.querySelectorAll('button[type="button"]');

    // Helper: ensure both plus and minus SVGs exist inside a button
    function ensureBothIcons(btn) {
      let iconPlus = btn.querySelector('svg[data-faq-icon="plus"]');
      let iconMinus = btn.querySelector('svg[data-faq-icon="minus"]');

      if (!iconPlus) {
        iconPlus = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        iconPlus.setAttribute('viewBox', '0 0 24 24');
        iconPlus.setAttribute('fill', 'none');
        iconPlus.setAttribute('aria-hidden', 'true');
        iconPlus.setAttribute('data-faq-icon', 'plus');
        iconPlus.classList.add('text-primary', 'w-5', 'h-5', 'mt-1');
        iconPlus.innerHTML = '<path d="M12 5v14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>';
        btn.appendChild(iconPlus);
      }
      if (!iconMinus) {
        iconMinus = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        iconMinus.setAttribute('viewBox', '0 0 24 24');
        iconMinus.setAttribute('fill', 'none');
        iconMinus.setAttribute('aria-hidden', 'true');
        iconMinus.setAttribute('data-faq-icon', 'minus');
        iconMinus.classList.add('text-primary', 'w-5', 'h-5', 'mt-1');
        iconMinus.innerHTML = '<path d="M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>';
        btn.appendChild(iconMinus);
      }
      return { iconPlus, iconMinus };
    }

    const closePanel = (btn) => {
      const controlsId = btn.getAttribute('aria-controls');
      const panel = document.getElementById(controlsId);
      if (!panel) return;

      btn.setAttribute('aria-expanded', 'false');
      panel.classList.add('hidden');

      const { iconPlus, iconMinus } = ensureBothIcons(btn);
      if (iconPlus) iconPlus.classList.remove('hidden');
      if (iconMinus) iconMinus.classList.add('hidden');
    };

    const openPanel = (btn) => {
      const controlsId = btn.getAttribute('aria-controls');
      const panel = document.getElementById(controlsId);
      if (!panel) return;

      btn.setAttribute('aria-expanded', 'true');
      panel.classList.remove('hidden');

      const { iconPlus, iconMinus } = ensureBothIcons(btn);
      if (iconPlus) iconPlus.classList.add('hidden');
      if (iconMinus) iconMinus.classList.remove('hidden');
    };

    buttons.forEach(btn => {
      // Ensure both icons exist before setting initial state
      const { iconPlus, iconMinus } = ensureBothIcons(btn);

      const expanded = btn.getAttribute('aria-expanded') === 'true';
      if (expanded) {
        if (iconPlus) iconPlus.classList.add('hidden');
        if (iconMinus) iconMinus.classList.remove('hidden');
      } else {
        if (iconPlus) iconPlus.classList.remove('hidden');
        if (iconMinus) iconMinus.classList.add('hidden');
      }

      btn.addEventListener('click', () => {
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';

        if (!isExpanded) {
          buttons.forEach(b => {
            if (b !== btn) closePanel(b);
          });
          openPanel(btn);
        } else {
          closePanel(btn);
        }
      });
    });
  }

  function initLocalPreviewLinks() {
    // Keep clean URLs in local development. Use the Firebase Hosting emulator
    // or a local server configured with the same rewrites as firebase.json.
  }

  function initFinalCtaTreatment() {
    const sections = [...document.querySelectorAll('main section')];
    const candidates = sections.filter((section) => {
      const text = section.textContent.toLowerCase();
      const hasCtaLink = [...section.querySelectorAll('a[href]')].some((link) => {
        const href = link.getAttribute('href') || '';
        const label = link.textContent.toLowerCase();
        return href === '/book-consultation' || href.includes('wa.me') || /book a consultation|start a project|get started now|request a project quote/.test(label);
      });
      return hasCtaLink;
    });

    const finalCta = candidates[candidates.length - 1];
    if (!finalCta) return;

    finalCta.classList.add('sitewide-final-cta');
    if (!document.getElementById('sitewide-final-cta-styles')) {
      const style = document.createElement('style');
      style.id = 'sitewide-final-cta-styles';
      style.textContent = `
        .sitewide-final-cta {
          position: relative !important;
          left: 0 !important;
          width: 100vw !important;
          max-width: none !important;
          margin-left: calc(50% - 50vw) !important;
          margin-right: 0 !important;
          transform: none !important;
          background-color: rgb(44 40 49 / 1) !important;
        }
      `;
      document.head.appendChild(style);
    }
  }

  function initFloatingWhatsapp() {
    if (document.querySelector('.floating-whatsapp')) return;

    if (!document.getElementById('floating-whatsapp-styles')) {
      const style = document.createElement('style');
      style.id = 'floating-whatsapp-styles';
      style.textContent = `
        .floating-whatsapp {
          position: fixed;
          right: 24px;
          bottom: 24px;
          z-index: 80;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          border-radius: 9999px;
          background-color: #25D366;
          box-shadow: 0 12px 30px rgba(37, 211, 102, 0.22);
          opacity: 0;
          transform: translateY(10px);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          animation: floating-whatsapp-enter 0.7s ease forwards;
        }
        .floating-whatsapp img,
        .floating-whatsapp svg {
          display: block;
          width: 26px;
          height: 26px;
        }
        .floating-whatsapp:focus {
          outline: none;
        }
        .floating-whatsapp:focus-visible {
          box-shadow: 0 0 0 3px rgba(119, 6, 254, 0.55), 0 12px 30px rgba(37, 211, 102, 0.22);
        }
        @keyframes floating-whatsapp-enter {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (hover: hover) {
          .floating-whatsapp:hover {
            transform: scale(1.05) translateY(-1px);
            box-shadow: 0 16px 40px rgba(37, 211, 102, 0.28);
          }
        }
        @media (max-width: 640px) {
          .floating-whatsapp {
            right: 18px;
            bottom: 18px;
            width: 54px;
            height: 54px;
          }
        }
      `;
      document.head.appendChild(style);
    }

    const whatsappLink = document.createElement('a');
    whatsappLink.className = 'floating-whatsapp';
    whatsappLink.href = 'https://wa.me/2349019735169';
    whatsappLink.target = '_blank';
    whatsappLink.rel = 'noopener noreferrer';
    whatsappLink.setAttribute('aria-label', 'Chat with Drey Studio on WhatsApp');

    const whatsappIcon = document.createElement('img');
    whatsappIcon.src = '/assets/icons/whatsapp.svg';
    whatsappIcon.alt = '';
    whatsappIcon.setAttribute('aria-hidden', 'true');
    whatsappLink.appendChild(whatsappIcon);
    document.body.appendChild(whatsappLink);
  }

  function getGa4LinkLocation(link) {
    const explicitLocation = link.getAttribute('data-ga-location');
    if (explicitLocation) return explicitLocation;
    if (link.classList.contains('floating-whatsapp')) return 'floating_button';
    if (link.closest('header')) return 'header';
    if (link.closest('footer')) return 'footer';

    const section = link.closest('section');
    if (section) {
      const sectionId = (section.id || '').toLowerCase();
      const sectionClass = (section.className || '').toString().toLowerCase();
      if (sectionId.includes('contact') || sectionClass.includes('contact')) return 'contact';
      if (sectionId.includes('hero') || sectionClass.includes('hero')) return 'hero';
      if (section.classList.contains('sitewide-final-cta')) return 'footer';
    }

    const path = window.location.pathname.toLowerCase();
    if (path.includes('book-consultation')) return 'consultation_page';
    if (path.includes('contact')) return 'contact_page';
    return 'page';
  }

  function initGa4Tracking() {
    // The shared script is included twice on one existing page; this guard keeps
    // one user action from producing duplicate events.
    if (window.__dreyStudioGa4TrackingInitialized) return;
    window.__dreyStudioGa4TrackingInitialized = true;

    document.addEventListener('click', (event) => {
      const link = event.target.closest?.('a[href]');
      if (!link || typeof window.gtag !== 'function') return;

      const href = (link.getAttribute('href') || '').trim().toLowerCase();
      const text = (link.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
      const linkLocation = getGa4LinkLocation(link);
      const isWhatsApp = href.startsWith('https://wa.me/') || href.startsWith('http://wa.me/') || href.startsWith('https://api.whatsapp.com/') || href.startsWith('http://api.whatsapp.com/');
      const isCta = link.getAttribute('data-ga-event') === 'click_cta' || link.getAttribute('data-ga-cta') === 'true' || /contact us|start a project|hire me|book consultation|book a consultation|request a quote|let's work together|discuss your project|get started/.test(text);

      if (isWhatsApp) {
        window.gtag('event', 'click_whatsapp', { link_location: linkLocation });
      } else if (href.startsWith('mailto:')) {
        window.gtag('event', 'click_email', { link_location: linkLocation });
      } else if (href.startsWith('tel:')) {
        window.gtag('event', 'click_phone', { link_location: linkLocation });
      }

      if (isCta) {
        window.gtag('event', 'click_cta', { cta_location: linkLocation });
      }
    });
  }

  function init() {
    initGa4Tracking();

    const navTarget = document.getElementById('site-nav');
    const footerTarget = document.getElementById('site-footer');

    if (navTarget) navTarget.innerHTML = NAV_HTML;
    if (footerTarget) footerTarget.innerHTML = FOOTER_HTML;

    initLocalPreviewLinks();
    initStickyHeader();
    initMobileMenuAndServices();
    initFaqAccordion();
    initFinalCtaTreatment();
    initFloatingWhatsapp();

    // Ensure any Service URL hash navigation doesn't break mobile UI state.
    // (No-op, but keeps the script deterministic.)
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

