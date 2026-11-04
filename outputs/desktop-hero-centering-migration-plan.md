# Drey Studio Desktop Hero-Centering Migration Plan

**Status:** Planning only; no production-page code has been changed.  
**Reference:** `service/business-website-design-in-nigeria.html` (the desktop layout only).  
**Owner constraint:** Keep the current mobile experience intact.

## Objective

Give Drey Studio’s production pages a consistent, centered desktop hero treatment based on the business-website service-page reference, while keeping each page’s purpose-specific proof, imagery, SEO content and conversion path. This is a visual and usability consistency project, not a direct ranking tactic; do not promise SEO gains from alignment alone.

## What the reference does on desktop

At `min-width: 901px`, the business-service draft switches to a centered, single-column hero: centered breadcrumb; existing kicker centered as a pill; H1 centered with a 980px maximum width; supporting copy centered within 760px; centered CTA row; and centered proof metrics. The draft previously placed a dashboard/project visual beneath the copy, but the owner has since requested its removal from both synchronized drafts. The current draft hero keeps the copy, CTAs and proof stats and uses 118px top / 100px bottom padding; treat a visual below hero copy as optional and page-specific, not a required part of the pattern. The main copy remains within a 1,040px wrapper.

The existing tablet/mobile rules apply at `max-width: 900px` and below. The migration must preserve those rules and the current mobile alignment, stacking, control sizes and content order.

## Scope from the local HTML inventory

The repository contains 45 HTML files. The initial production-page migration scope is **36 pages**, organized by template:

- **Core conversion pages (5):** `index.html`, `about.html`, `contact.html`, `book-consultation.html`, `pricing.html`.
- **Service pages (5):** `service/service.html`, `service/website-development.html`, `service/ui-ux-design.html`, `service/graphic-design.html`, `service/seo-ai-search-optimization.html`.
- **Location pages (8):** Abeokuta, Abuja, Benin City, Enugu, Ibadan, Lagos, Nigeria and Port Harcourt (`website-developer-*.html`).
- **Portfolio (9):** `work.html` and the eight project-detail pages under `work/`.
- **Journal (9):** `blog/index.html` and the eight published article pages.

**Keep out of the first rollout:** the reference page `service/business-website-design-in-nigeria.html`; its synchronized alternate draft `service/business-website-design.html` (handoff notes say neither is in production navigation or sitemap); `homepage.html` (its canonical points to the competitor `websitedeveloper.tech`); `design-preview.html`, `design-preview-v2.html`, the blog `_template`, `404.html`, privacy policy and terms pages. Recheck route/canonical status before later changing any excluded file.

The static inventory did not find a common named hero wrapper on the eight location pages, and some pages (including pricing) also lack a clear `*hero*` module name. Do not target those pages with a broad H1/global selector; first identify or add an explicit, opt-in hero wrapper.

## Proposed implementation contract

1. Apply the center treatment only at `min-width: 901px`, scoped to an explicit hero wrapper or shared opt-in modifier. Never make all H1s, all `header` elements or all page copy globally centered.
2. Use the reference’s hierarchy as a guide, not a demand that every hero become identical: center existing breadcrumb/meaningful label, H1, lede and action row; constrain line lengths; center existing proof elements.
3. Preserve page-specific material unless the owner specifically requests its removal. Keep any retained image, dashboard, interactive proof panel, stat row, side note or project metadata appropriately placed; do not insert a visual into every centered hero. The business-service draft dashboard is intentionally removed, while the homepage's separate interactive proof panel remains in scope to preserve.
4. Do not add decorative kicker labels where none are useful. The project rule remains: labels should provide distinct context, not repeat the H1.
5. Preserve the mobile/tablet experience by keeping all new alignment/ordering rules desktop-only and validating the 900px breakpoint boundary.
6. Keep SEO and semantics stable: one H1; same H1 text, title, meta description, canonical, structured data, internal links and image alt text. Do not rewrite location wording or consolidate location pages as part of this visual task.
7. Maintain the CTA contrast rule: on white, near-white or pale-plum backgrounds, use a solid dark-plum CTA with white text; on dark backgrounds, keep a clearly contrasting light/lavender primary CTA.

## Page-family adaptations

- **Homepage:** center the headline, supporting copy and actions; retain the interactive proof/dashboard and its selectable panels, placing it below the copy at a readable maximum width. Keep all existing proof and homepage content.
- **Service pages:** center the service-specific heading, explanation and CTAs. Convert an existing side note into a compact centered support line/strip only if needed to prevent a stranded second grid column; do not delete useful information.
- **Location pages:** center the existing location-specific H1, description, trust information and CTA without adding city-keyword repetition. First establish explicit wrappers because the pages do not appear to share a named hero class.
- **About/contact/consultation/pricing:** center the top introduction only. Preserve contact routes, consultation form, pricing controls and price table; do not center form fields or dense pricing rows. About currently declares a two-column hero grid while its visible markup has one content block, so inspect the rendered result before removing the unused grid track.
- **Work listing and case studies:** center introductory copy, but retain project screenshots, project details, breadcrumbs and case metadata. For visual-led case studies such as TrackPoint, keep the image prominent below or alongside the centered text according to available width; do not discard the project visual.
- **Blog listing and articles:** center the journal introduction and article header/metadata. Keep the article body left-aligned at a readable editorial width, and preserve cover images, author/date information, table of contents and category controls.

## Rollout phases

1. **Three-template pilot:** `index.html` (interactive visual/proof), `service/service.html` (copy plus supporting note) and `work/trackpoint.html` (project image and metadata). Add a scoped desktop-only modifier or equivalent page-scoped rules; capture before/after views at desktop and mobile widths.
2. **Commercial and core pages:** apply the approved pattern to the remaining service pages, eight location pages, About, Contact, Book Consultation, Pricing and `work.html`. Handle location/pricing wrapper discovery before styling.
3. **Editorial and portfolio details:** adapt the eight case-study pages and the blog index plus eight articles using the page-family rules above. Keep long-form article copy left-aligned.
4. **Closeout:** compare the inventory against the production routes, resolve any route/canonical ambiguity, and record any page-specific exception in the handoff.

## Visual and technical acceptance checks

- Compare at 1440px, 1280px and 1024px desktop widths; test 901px and 900px to confirm the breakpoint transition.
- Recheck 768px, 390px and 360px widths; mobile/tablet should remain visually and functionally equivalent to the current experience.
- Confirm the hero does not collide with shared navigation, wrap CTAs awkwardly, overflow horizontally or bury the primary action below unnecessary whitespace.
- Confirm existing visuals and interactive proof remain present, images retain correct loading/priority behavior, and focus indicators/reduced-motion behavior still work.
- Confirm one H1, unchanged SEO metadata/schema/canonical URLs, working internal links, and strong button contrast on each section surface.

## Next action for the implementing AI

Implement only the three-page pilot first. Inspect the desktop and mobile result before expanding to the rest of the 36-page scope. Do not modify `homepage.html` or publish either business-website draft as part of this work. Update `PROJECT-HANDOFF.md` after each implementation batch.
