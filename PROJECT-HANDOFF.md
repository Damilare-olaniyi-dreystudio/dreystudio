# Drey Studio Project Handoff

**Project:** Drey Studio  
**Website:** https://dreystudio.ng/  
**Local project:** `C:\Users\PC\Downloads\dreystudio-main`  
**Last updated:** 4 November 2026

## Project goal

Attract more customers through online SEO and build authority against web-development competitors in Nigeria, especially Website Developer Tech. The website should combine search visibility, trust, proof, clear offers, conversion paths, a premium visual identity and accessible UX.

## Strategic research and design context

A comparative SEO and authority audit against https://websitedeveloper.tech/ is saved at `outputs/drey-studio-vs-website-developer-tech-audit.md`. Main finding: the competitor has stronger public authority through a larger content network, deeper service pages, visible reviews and outcome-led case studies. Drey already has a strong technical base: static crawlable HTML, canonical URLs, metadata, structured data, services, location pages, pricing, portfolio, blog, robots and sitemap. Drey's main gap is proof, authority and commercial content depth rather than basic indexability.

A cross-page competitor UI and offer-system review is saved at `outputs/website-developer-tech-ui-offer-system-review.md`. Useful patterns include the buyer problem -> promise -> inclusions -> process -> checkable proof -> objection handling -> CTA sequence, proof modules, job-based routing, comparison tables, verification links, distinction between client outcomes and sample capabilities, editorial topic clusters and structured enquiry forms. Borrow the architecture, not the competitor's identity, exact wording, prices, metrics or promises.

`design-preview.html` and `design-preview-v2.html` document design explorations. Preview v1 established the dark plum/lavender hybrid system; v2 moved beyond uniform grids with a split hero, proof tabs, horizontal offer rows, editorial case studies, process steps, comparison rows and a focused CTA. The production homepage `index.html` was redesigned in this direction while preserving SEO metadata, canonical, analytics, schema, FAQs, pricing, testimonials, project links, WhatsApp CTA and shared navigation/footer.

The owner supplied a screenshot of the competitor homepage. It confirms a light-led editorial sales page: white/pale-gray canvas, dark typography, bright blue accent, centered hero, real dashboard visual, image-led modules, proof/checklist sections, vertical process, reviews and generous whitespace. Drey should adapt the structural lessons while keeping Drey's plum/lavender identity and using only verified Drey proof.

## Current business-website service-page status

The two standalone drafts are `service/business-website-design-in-nigeria.html` and `service/business-website-design.html`. Keep them synchronized. They are not yet in production navigation or the sitemap; do not publish or replace the existing service page without approval.

The pages preserve title, description, canonical, Open Graph, Twitter tags, analytics, Service/BreadcrumbList/FAQPage JSON-LD, pricing, FAQs, responsive CSS, shared navigation/footer loading and accessibility behaviors. The non-homepage H1 is direct: “Business Website Developer and Designer in Nigeria.” The hero explains the service and verified starting price (NGN 200,000) and includes clear CTAs.

Current section order: hero; explanatory “A business website should make the next step clear” text section; six audience cards with a centered “Book a consultation” CTA; TrackPoint case-study proof panel; six-item business website features grid; scope-qualified website inclusions section; new “Other website services we offer” six-card service-routing section; process; pricing and FAQ; related links; final CTA.

The repeated Nexus project visual card immediately below the hero and the dashboard/project figure at the bottom of the hero have both been removed from both drafts. The dashboard removal clears its titlebar, image and alt text, caption and project link; the H1, supporting copy, CTAs and proof stats remain. Desktop hero bottom padding is reduced from 150px to 100px to avoid excess blank space. The separate featured Drey work section (Nexus showcase, project metadata/story link and “View all work” CTA) has also been removed from both drafts. The hero’s “See selected work” button now links directly to `/work`; the TrackPoint panel remains the page’s case-study proof section.

The audience cards cover small businesses, companies, corporate sites, professional services, e-commerce and multi-location businesses. The previous filler sentence below the cards was removed. The TrackPoint panel adapts the supplied reference with a pale plum/lavender panel, “What we built” checklist, Book/Track/Manage capability cards and a `/work/trackpoint/` link. The TrackPoint case study documents booking, shipment tracking, cost estimates/payment options and role-based tools; it does not document outcome metrics, so do not invent any. The Drey feature grid covers service-page structure, enquiry routes, responsive design/development, SEO-ready foundations, brand-led visual design and functionality scoped to the brief. The new two-column inclusions panel follows the feature grid, uses the existing online Material Symbols, and qualifies the checklist as common scope rather than a universal package guarantee.

The local preview is `http://127.0.0.1:5501/service/business-website-design-in-nigeria.html`. It has returned HTTP 200 with the latest section edits. The local static preview does not apply all clean-URL rewrites: `/work/trackpoint/` returns 404 locally while `/work/trackpoint.html` serves; `firebase.json` and `_redirects` already map the clean production route to the HTML file.

## Current design system

Keep the dark plum/lavender identity while adding light conversion sections. Core tokens: dark background `#15121a`, dark surface `#2c2831`, lavender `#d3bbff`, strong lavender `#b994ff`, light background `#f7f5fa`, light surface `#efebf3`, dark text `#201a25`, body text `#655d69`, pale line `#ded8e3`. Use Manrope for body copy and Inter for headings/interface text. Mix centered hero/CTA composition with left-aligned editorial, proof, process and case-study sections. Use whitespace, project visuals, timelines, comparison rows and text-led sections rather than making every section a card grid.

## CTA contrast rule

On white, near-white or pale-plum backgrounds, use solid dark-plum CTA buttons with white text so the action is immediately obvious. For a secondary CTA on a light background, use a distinct dark-plum fill rather than a pale or low-contrast outline. Keep light/lavender buttons for dark backgrounds. This applies to CTAs, not FAQ accordion controls or inline text links.

## Global H1 and hero-copy rules

For every page except the homepage, use a plain, immediately understandable H1 that states the service, audience or location intent. The supporting hero text should briefly explain the service and likely inclusions, state a verified starting price where applicable, and end with a clear relevant CTA. Avoid tiny decorative arrows in CTAs; the arrow on the Our Work CTA is an intentional exception. Preserve the homepage headline direction unless a later handoff entry changes it.

Do not add unnecessary labels, eyebrow text or kicker labels above headings. Use one only when it provides distinct context not already clear from the heading. Prefer clear headings and whitespace over decorative labels.

## Guardrails

- Do not invent rankings, traffic, revenue, reviews, certificates, client outcomes or performance metrics.
- Do not copy Website Developer Tech's wording or exact visual identity.
- Do not remove existing metadata, schema or analytics during design changes.
- Do not create thin location pages or expand location pages by default.
- Location pages that may be near-duplicates include Abeokuta, Abuja, Benin City, Enugu, Ibadan, Lagos, Nigeria and Port Harcourt. Check Search Console before consolidation, canonicalization, noindex or redirects; do not make blanket redirects.
- Do not replace the static site with a framework unless explicitly requested.

## Next steps

1. Visually review the redesigned homepage and business-website draft at desktop, tablet and mobile sizes. Confirm shared navigation/footer, image paths, one H1, metadata, schema, analytics, keyboard behavior and responsive layout.
2. For the service page, specifically check the reflowed one-column text section after Nexus-card removal, the six audience cards and centered CTA, TrackPoint panel, Drey features grid, and transitions into process/pricing. Check the deployed clean TrackPoint case-study URL after deployment.
3. Verify prices and all commercial copy. Keep the drafts outside the sitemap/navigation until visual and commercial review is approved.
4. Audit and consolidate duplicate location pages only after checking Search Console data.
5. Upgrade Nexus Construction, TrackPoint and Ewa Fashion case studies with context, goals, Drey contribution, screenshots, verified measurable outcomes where available, testimonials with permission and similar-project CTAs.
6. Build authority through consistent business details, genuine Google reviews, client permissions, legitimate case-study links and relevant Nigerian business/design/technology mentions. Measure Search Console impressions, clicks, average position, query groups, WhatsApp clicks and consultation submissions.

## Key files

- Production homepage: `index.html`
- Business website draft: `service/business-website-design-in-nigeria.html`
- Synchronized alternate draft: `service/business-website-design.html`
- Existing website development page: `service/website-development.html`
- Preview v1/v2: `design-preview.html`, `design-preview-v2.html`
- SEO audit: `outputs/drey-studio-vs-website-developer-tech-audit.md`
- Competitor UI review: `outputs/website-developer-tech-ui-offer-system-review.md`
- Portfolio: `work.html`
- TrackPoint case study: `work/trackpoint.html`
- Pricing: `pricing.html`
- Shared behavior: `assets/js/shared-nav-footer.js`
- Images: `assets/images/`
- Sitemap: `sitemap.xml`
- Robots: `robots.txt`
- Desktop hero-centering plan: `outputs/desktop-hero-centering-migration-plan.md`

## Ongoing handoff maintenance rule

This file is the living source of truth. Every time a project change is made, update this file in the same task before finishing. Record what changed, why it changed, what was verified and what the next AI should do. Never leave this document describing an outdated state.

## Change log

### 3 November 2026 — Research, audit and initial design direction

Recorded the SEO/authority goal, competitor audit, hybrid plum/lavender design system, preview v1, duplicate-location concern and need to move beyond uniform cards and grids.

### 3 November 2026 — Cross-page competitor UI and offer-system review

Reviewed six competitor page types and recorded the proof-led offer sequence, job-based routing, pricing/comparison logic, verification patterns, case-study separation, editorial clusters and restrained motion guidance. Saved the detailed UI review report.

### 3 November 2026 — Non-grid preview v2

Created `design-preview-v2.html` with split hero, interactive proof tabs, horizontal offer rows, editorial case study, guided process steps, quote/metrics proof, comparison scope table and focused CTA. Verified local assets, responsive rules, tab hooks, focus states and reduced-motion support.

### 4 November 2026 — Production homepage redesign

Applied the v2 direction to `index.html` while preserving SEO metadata, canonical, analytics, schema, FAQs, pricing, testimonials, project routes, WhatsApp and shared navigation/footer. Verified one H1, JSON-LD, metadata, image references, interaction hooks, responsive CSS and reduced-motion support.

### 4 November 2026 — Screenshot-based competitor observation

Recorded the correction that the competitor homepage is light-led, editorial and proof-heavy. The next homepage refinement should adapt those structural lessons while keeping Drey's identity and using only verified proof.

### 4 November 2026 — Business website service-page drafts

Created and corrected `service/business-website-design.html` and `service/business-website-design-in-nigeria.html` as standalone drafts. Applied the direct H1, verified starting price, consultation/pricing CTAs, accessible icons, expanded FAQ with FAQPage JSON-LD and shared navigation/footer. The desktop hero was centered, the secondary hero information card removed, and the heading-label rule recorded.

### 4 November 2026 — Editorial layout and audience-card refinements

Rebuilt the post-hero explanation as an editorial split with Nexus visual, benefit points and non-claim-based scope indicators. Reduced audience icons to 30px outlined icons with 16px SVG marks. Later restored missing CSS for the split/audience layouts, removed the duplicate explanatory section and redundant audience kicker, and added responsive styles.

### 4 November 2026 — TrackPoint case-study panel

Added a proof-led TrackPoint panel after featured work and before process. It uses documented features only, with a checklist and Book/Track/Manage cards; no unsupported performance metrics were added. Verified both drafts match and responsive styles are present. Note the local clean URL rewrite limitation described above.

### 4 November 2026 — Drey Studio business website feature grid

Added a centered six-item feature section after TrackPoint and before process. It covers service pages, enquiry routes, responsive design/development, SEO foundations, brand-led design and scoped functionality. Verified six cards, section order, responsive rules, synchronized drafts and local HTTP 200.

### 4 November 2026 — Audience grid expanded and CTA added

Expanded the audience section from three to six cards by adding professional service, e-commerce and multi-location use cases. Added a centered, tracked “Book a consultation” CTA. Removed the filler sentence requested by the owner. Verified six cards, responsive columns, CTA presence and synchronized drafts.

### 4 November 2026 — Post-hero Nexus card removed

Removed the Nexus project visual card immediately below the hero from both synchronized drafts, including its unused visual/badge styles. Kept the general explanatory copy, benefits, scope indicators and CTA, and reflowed them into a centered single-column layout. The Nexus hero visual and later selected-work card remain. Verified the card selectors/markup are absent, editorial copy remains, drafts match, and the local service-page preview returns HTTP 200. Next: visually check the reflowed copy section at desktop/tablet/mobile widths.

### 4 November 2026 — Custom icons replaced with online icon font

Replaced all eight inline hand-drawn SVGs on the business-website page (two explanatory benefit icons and six audience-card icons) and four CSS-drawn TrackPoint checks with official Material Symbols Outlined ligatures served by Google Fonts. The page requests only the needed glyph names: `arrow_forward`, `description`, `storefront`, `business`, `corporate_fare`, `badge`, `shopping_bag` and `location_on`, plus `check`. Decorative glyphs remain `aria-hidden`. Source checked against Google's official Material Symbols guide: https://developers.google.com/fonts/docs/material_symbols.

Verified both drafts remain identical, the icon font link appears once, 12 icon glyphs render in page markup, no inline SVG or CSS-drawn check remains, and the local page returns HTTP 200 with the icon link and markup. Next: visually confirm the hosted font renders at desktop and mobile; it requires access to Google Fonts.

### 4 November 2026 — Section color rhythm and CTA contrast

Adjusted the service-page sections to alternate between the existing near-white and pale-plum surfaces, with the hero, selected-work area and related-links area retaining the deeper plum surfaces. The sequence is now dark hero, pale-plum explanation, near-white audience cards, dark work, pale-plum TrackPoint, near-white feature grid, pale-plum process, near-white pricing, dark related links and lavender final CTA. Changed the explanatory-section button to a solid dark fill with white text; audience and TrackPoint CTAs were already dark-filled.

Verified the color overrides and dark CTA styles are present in both synchronized drafts. The local preview returns HTTP 200 and serves the updated styles. Next: visually inspect color transitions and button contrast at desktop and mobile widths.

### 4 November 2026 — Dark CTAs on light backgrounds

Applied the dark-fill CTA rule to every CTA on a light or pale section in both business-website drafts. The explanatory section, audience section, TrackPoint panel and final lavender CTA now have dark-filled buttons; the final CTA secondary action uses a distinct dark-plum fill to preserve hierarchy. Added the rule to the project-wide design guidance for future pages.

Verified CTA styles in both synchronized drafts and the local preview returns HTTP 200.

### 4 November 2026 — Desktop hero-centering migration plan

Created `outputs/desktop-hero-centering-migration-plan.md` after reviewing the centered desktop hero in `service/business-website-design-in-nigeria.html` and scanning the repository’s page inventory. The plan records the reference behavior (desktop-only at 901px+, centered H1/lede/actions/proof, supporting visual below), keeps the current mobile/tablet experience unchanged, and scopes an opt-in rollout across 36 production candidates in page families. It excludes the business-service drafts, competitor-canonical `homepage.html`, previews, utility/legal pages and the blog template. It calls for a three-template pilot (production homepage, services index, TrackPoint case study), then commercial/core pages, then editorial/portfolio pages, with SEO, accessibility and CTA-contrast checks. No production HTML/CSS was changed in that planning task.

**Next for another AI:** read the plan file, implement the three-page pilot only, and visually check 1440/1280/1024px plus 901/900px and 768/390/360px before expanding. Preserve copy, proof, images, metadata and mobile behavior; do not edit the competitor snapshot or publish either business-website draft.

### 4 November 2026 — Outline-only audience-card hover pilot

Added a restrained plum outline hover to the six business-website audience cards (`.bw-fit-card`) in both synchronized drafts. The outline appears only on hover-capable fine-pointer devices; there is no fill, movement or shadow change, and the outline-color transition is disabled for reduced-motion users. Mobile card styling remains unchanged. No other pages received this hover treatment, pending the owner's review of the pilot.

Verified both drafts remain identical, each still contains six audience cards, the hover rule changes only the outline, reduced-motion handling is present, and the local preview at `http://127.0.0.1:5501/service/business-website-design-in-nigeria.html` returns HTTP 200 with the new rule. **Next:** have the owner review the hover on this page; only extend the card treatment elsewhere if they approve it.

### 4 November 2026 — Hero dashboard/project strip removed

Removed the `.bw-dashboard` figure from the hero in both synchronized business-service drafts, including “Selected work / Drey Studio,” “Responsive experience,” the Nexus image/alt text, “Construction Showcase / business website” and the “View project” link. Retained the hero H1, supporting copy, CTAs and proof stats; reduced desktop hero bottom padding from 150px to 100px so the shorter hero does not leave an oversized gap. Removed the now-unused dashboard CSS. Updated the hero-centering plan and current-state notes to reflect the removal. **Next:** visually review the shorter hero at desktop and mobile. At the time of this entry, the later featured-work section still existed; it was removed by owner request in the subsequent handoff entry.

### 4 November 2026 — Featured Drey work section removed

Removed the complete `.bw-work` Featured Drey Studio work section from both synchronized business-service drafts, including the Nexus Construction project visual, description, strategy/UI/UX/development metadata, project-story link and “View all work” button. Removed its desktop, tablet and mobile-specific CSS, including the orphaned mobile spacing selector. Repointed the hero’s “See selected work” CTA from the deleted `#bw-work` anchor to `/work`. Kept the audience cards, TrackPoint case-study proof, feature grid and subsequent service sections.

Verified there is no featured-work section, `.bw-work` styling or broken `#bw-work` anchor in either draft; the drafts remain identical, the hero CTA targets `/work`, the TrackPoint panel remains, and the local preview returns HTTP 200. **Next:** visually review the updated flow from the audience cards into TrackPoint on desktop and mobile.

### 4 November 2026 — Complementary website services section

Added a Drey-branded “Other website services we offer” section immediately after the scope-qualified “What’s included” section in both synchronized business-website drafts. The new light-surface section uses the existing plum/lavender design system and Material Symbols, includes six concise service cards (website development, UI/UX design, SEO & AI search optimization, graphic design, e-commerce experiences and website support), provides internal routing to existing service pages or consultation/contact routes where a standalone page does not exist, and includes a link to compare all website services. No competitor wording, unsupported claims, new pricing or performance metrics were added.

Verified both drafts contain the same new CSS and markup, the section sits between inclusions and process, and the existing metadata, schema, analytics, FAQ and navigation/footer scripts remain untouched. **Next:** visually review the new six-card section at 1440/1280/1024px and 768/390/360px, then run the local HTTP and link checks before any production navigation or sitemap decision.
