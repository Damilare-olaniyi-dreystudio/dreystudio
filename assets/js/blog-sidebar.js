/* Reusable editorial sidebar for all Drey Studio article pages. */
(function () {
  const posts = [
    { href: '/blog/signs-your-business-needs-a-website-2026/', title: '10 Signs Your Business Needs a Website in 2026', date: 'September 5, 2026' },
    { href: '/blog/top-web-designers-in-nigeria-2026/', title: 'Top 10 Web Designers in Nigeria — 2026 Rankings', date: 'September 4, 2026' },
    { href: '/blog/ecommerce-website-cost-nigeria-2026/', title: 'How Much Does It Cost to Build an E-commerce Website in Nigeria in 2026?', date: 'September 4, 2026' },
    { href: '/blog/how-much-does-a-website-cost-in-nigeria-2026/', title: 'How Much Does a Website Cost in Nigeria in 2026?', date: 'September 3, 2026' }
  ];
  const categories = ['Web Design', 'Business', 'E-commerce', 'SEO', 'Technology', 'Digital Growth'];

  const slugify = (value) => value.toLowerCase().replace(/&amp;|&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const uniqueId = (heading, used) => {
    let id = heading.id || slugify(heading.textContent);
    if (!id) id = 'section';
    const base = id;
    let index = 2;
    while (used.has(id)) id = `${base}-${index++}`;
    used.add(id);
    heading.id = id;
    return id;
  };
  const linkMarkup = (headings) => headings.map((heading) => `<a href="#${heading.id}">${heading.textContent.trim()}</a>`).join('');

  function init() {
    const article = document.querySelector('.blog-article-page');
    const body = document.querySelector('.blog-article-body');
    if (!article || !body) return;
    const headings = [...body.querySelectorAll('h2')];
    const used = new Set();
    headings.forEach((heading) => uniqueId(heading, used));
    const toc = linkMarkup(headings);
    const currentPath = window.location.pathname.endsWith('/') ? window.location.pathname : `${window.location.pathname}/`;
    const recent = posts.filter((post) => post.href !== currentPath).slice(0, 3);

    const recentMarkup = recent.map((post) => `<a href="${post.href}"><strong>${post.title}</strong><small>${post.date}</small></a>`).join('');
    const sidebar = article.querySelector('.blog-article-sidebar');
    if (sidebar) {
      sidebar.setAttribute('aria-label', 'Article navigation and discovery');
      sidebar.innerHTML = `<div class="blog-sidebar-inner">
        <section class="blog-sidebar-section" aria-labelledby="article-toc-title"><h2 id="article-toc-title" class="blog-sidebar-heading">On This Page</h2><nav aria-label="Article sections">${toc}</nav></section>
        <section class="blog-sidebar-section" aria-labelledby="article-categories-title"><h2 id="article-categories-title" class="blog-sidebar-heading">Categories</h2><div class="blog-sidebar-categories">${categories.map((category) => `<span>${category}</span>`).join('')}</div></section>
        <section class="blog-sidebar-section" aria-labelledby="recent-posts-title"><h2 id="recent-posts-title" class="blog-sidebar-heading">Recent Posts</h2><div class="blog-recent-posts">${recentMarkup}</div></section>
      </div>`;
    }
    const mobile = article.querySelector('.blog-mobile-toc');
    if (mobile) {
      mobile.removeAttribute('aria-hidden');
      const nav = mobile.querySelector('nav');
      if (nav) nav.innerHTML = toc;
    }
    const links = [...article.querySelectorAll('.blog-article-sidebar a[href^="#"]')];
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`));
      }), { rootMargin: '-18% 0px -68% 0px' });
      headings.forEach((heading) => observer.observe(heading));
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
