/* Subtle Fade/Fade-Up Animation System
   - Uses IntersectionObserver
   - Professional, minimal motion only
   - Respects prefers-reduced-motion

   Markup hooks:
   - Elements: data-anim="fade" | data-anim="fade-up"
   - Groups: data-anim-group="stagger" (optional)
*/

(function () {
  const prefersReducedMotion = () => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };

  const SETUP = {
    durationMs: 700, // within 0.6-0.8s
    staggerMs: 80, // within 0.05-0.1s
    yFromPx: 20,
    ease: 'cubic-bezier(0.16, 1, 0.3, 1)', // power2.out-ish feel
  };

  function applyBaseStyles(el, variant) {
    el.style.willChange = 'opacity, transform';

    if (variant === 'fade') {
      el.style.opacity = '0';
      el.style.transform = 'translateY(0px)';
      el.style.transition = `opacity ${SETUP.durationMs}ms ${SETUP.ease}`;
    } else {
      // fade-up
      el.style.opacity = '0';
      el.style.transform = `translateY(${SETUP.yFromPx}px)`;
      el.style.transition = `opacity ${SETUP.durationMs}ms ${SETUP.ease}, transform ${SETUP.durationMs}ms ${SETUP.ease}`;
    }
  }

  function activate(el) {
    el.style.opacity = '1';
    if (el.dataset.anim === 'fade-up') {
      el.style.transform = 'translateY(0px)';
    }
    // fade variant just sets opacity
    // Clear delay so subsequent activations (rare) don't keep compounding.
    el.style.transitionDelay = '';
  }


  function initReveal() {
    if (prefersReducedMotion()) {
      document.querySelectorAll('[data-anim]').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
        // keep it lightweight
        el.style.willChange = '';
      });
      return;
    }

    const nodes = Array.from(document.querySelectorAll('[data-anim]'));
    nodes.forEach(el => applyBaseStyles(el, el.dataset.anim));

    const staggerGroups = new Map();
    document.querySelectorAll('[data-anim-group="stagger"]').forEach(group => {
      const items = Array.from(group.querySelectorAll('[data-anim]'));
      if (items.length) staggerGroups.set(group, items);
    });

    // IntersectionObserver callback
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const group = el.closest('[data-anim-group="stagger"]');

          if (group && staggerGroups.has(group)) {
            const items = staggerGroups.get(group);
            const index = items.indexOf(el);
            if (index >= 0) {
              // Stagger by applying a delay before activating
              el.style.transitionDelay = `${index * SETUP.staggerMs}ms`;
            }
          }

          activate(el);
          observer.unobserve(el);
        });
      },
      {
        threshold: 0.12,
      }
    );

    nodes.forEach(el => observer.observe(el));
  }

  function initPageTransitions() {
    // Opacity-only transitions when clicking internal links
    if (prefersReducedMotion()) return;

    let overlay = document.getElementById('__page_fade_overlay__');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = '__page_fade_overlay__';
      overlay.setAttribute('aria-hidden', 'true');
      overlay.style.position = 'fixed';
      overlay.style.inset = '0';
      overlay.style.background = 'transparent';
      overlay.style.opacity = '0';
      overlay.style.pointerEvents = 'none';
      overlay.style.zIndex = '9999';
      overlay.style.transition = 'opacity 240ms cubic-bezier(0.16, 1, 0.3, 1)';
      document.documentElement.appendChild(overlay);
    }

    const shouldFadeLink = (a) => {
      if (!a || !a.href) return false;
      try {
        const url = new URL(a.href, window.location.href);
        const sameOrigin = url.origin === window.location.origin;
        const notHashOnly = url.pathname && url.pathname !== window.location.pathname;
        // Allow any internal navigation to a different path
        return sameOrigin && notHashOnly;
      } catch {
        return false;
      }
    };

    document.addEventListener('click', (e) => {
      const target = e.target && e.target.closest ? e.target.closest('a[href]') : null;
      if (!target) return;
      if (!shouldFadeLink(target)) return;

      // Fade out quickly
      overlay.style.transition = 'opacity 220ms cubic-bezier(0.16, 1, 0.3, 1)';
      overlay.style.opacity = '1';

      // Let browser navigate. Navigation usually happens fast enough.
      // The next page will reveal its own content via IntersectionObserver.
      // For safety, prevent default only if you need deterministic behavior.
    }, { passive: true });

    // Ensure it resets on load
    window.addEventListener('pageshow', () => {
      overlay.style.opacity = '0';
    });
  }

  function init() {
    initReveal();
    initPageTransitions();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

