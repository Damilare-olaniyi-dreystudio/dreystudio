# DREY STUDIO V2 — MASTER SPECIFICATION
**Version 1.0 — This is the single source of truth for every AI tool working on this site (Blackbox AI, Google Stitch, Claude, or any future tool/contractor).**

> Rule zero: If any generated output — code, copy, design, or prompt — contradicts this document, the document wins. Fix the output, not the rule, unless you're deliberately revising this spec itself.

---

## 1. VISION

Drey Studio becomes the most trusted, most cited, most findable strategic website development studio serving Nigerian and international (UK/US/UAE/African) businesses — a founder-led studio that grows into an agency through proof, not pretense.

## 2. MISSION

Help growing businesses build credibility, attract customers, and grow through strategy-first websites — and build the digital presence (site + content + profiles) that makes that claim provably true.

## 3. FOUNDER POSITIONING — READ THIS BEFORE WRITING ANY COPY

**This is not a faceless agency site. It is not a solo-freelancer site either. It is founder-led.**

Rules:
- The brand name is **Drey Studio** everywhere — every page title, every meta tag, every schema entity, every nav label, every CTA.
- **Damilare Olaniyi is named as the founder**, primarily in: the About page, a dedicated "Founder" section/bio block, author bylines on any future content, and LinkedIn/social bios.
- Correct pattern: *"I'm Damilare, founder of Drey Studio — [role/credibility statement]."* Use this construction in About and founder-context sections only.
- Incorrect pattern: using "Olaniyi Damilare" or "Damilare" in page `<title>` tags, meta tags, or anywhere the *brand* (not the *founder*) should be speaking. Page titles always lead with **Drey Studio** or the page's SEO-target phrase, never the personal name.
- Do not write copy that implies a team ("our team of designers," "our engineers") unless/until that's literally true. Acceptable: "I" for personal craft/process, "we" only when referring to Drey Studio as the entity/brand in a general sense (e.g., "Drey Studio helps businesses..."). When in doubt, prefer "I" — it's honest and, for a founder-led studio, it's a trust signal, not a weakness.

## 4. BRAND VOICE

**Tone: Professional + friendly.** Not premium-luxury-cold, not casual-slangy. Confident, warm, clear.

Always:
- Explain in plain language.
- Lead with business outcomes before technical detail.
- Be confident without exaggeration.
- Answer the reader's real question directly before elaborating (this also serves AEO — see Section 11).

Never:
- Hype words: "revolutionary," "game-changing," "cheap," "overnight success," "dominate," "unrivaled" (fix: the current live Services page copy violates this — rewrite it).
- Generic filler openers ("In today's digital world...").
- Overpromising specific results without a case study to back it.

**Writing formula (every page, every section):** Business Problem → Insight → Solution → Outcome → Next Step.

## 5. DESIGN SYSTEM

### Colors — CONFIRMED, locked to 3 tokens from the existing Tailwind config

**Critical context:** the live site's `tailwind.config` currently defines a 22-token Material Design 3 color system (primary/secondary/tertiary/error/surface + every `on-*` and `-container` variant). That is NOT the "three colors, nothing else" system that was requested — it's a full AI-generated M3 palette that invites drift, because every future Stitch prompt has 22 "valid" options to pull from instead of 3. **This spec overrides that.** Only the three tokens below may be used anywhere on the site, regardless of what else exists in the config:

- **Dark Purple (background):** `background` / `surface` → `#15121a`
- **Light Purple (section/accent):** `secondary-container` → `#7706fe` **[CONFIRMED — founder sign-off received]**
- **White (text-on-dark):** `on-surface` → `#e7e0ec`

All color work across the site — Blackbox fixes, Stitch-generated sections, everything — uses only these three locked values. `primary-container` (`#47019c`) and every other token in the 22-token M3 palette are off-limits.

- `borderRadius.full` is currently set to `0.75rem` (12px) — this does NOT produce a pill/circle shape (standard "full" radius is `9999px`). Confirm whether the soft-rounded-rectangle look is intentional; if true pill buttons/avatars are wanted anywhere, a proper `full` value needs to be added separately rather than overloading this token.
- No gradients unless explicitly added to this spec later. Rhythm across the page is created by **alternating Dark → Light Purple → White → Dark**, using only the three locked tokens above.

### Typography — CONFIRMED, already well-built, keep as-is
Font: **Inter** (loaded via Google Fonts, weights 400/600/700). The existing custom type scale is solid and should be kept exactly as configured — do not let Stitch introduce new sizes:

| Token | Size | Line-height | Weight | Use |
|---|---|---|---|---|
| `display-lg` | 80px | 1.1 | 700 | Desktop hero headline |
| `display-lg-mobile` | 48px | 1.1 | 700 | Mobile hero headline |
| `headline-xl` | 48px | 1.2 | 600 | Major section headings |
| `headline-lg` | 32px | 1.3 | 600 | Sub-section headings |
| `body-lg` | 18px | 1.6 | 400 | Lead/intro paragraphs |
| `body-md` | 16px | 1.6 | 400 | Standard body text |
| `label-caps` | 12px | 1.0 | 600, tracked | Eyebrow labels/tags |

Note: the config currently duplicates this scale under both `fontFamily` and `fontSize` (all `fontFamily` entries just point to `["Inter"]`, which is redundant since there's only one font family in use). This is harmless but messy — Blackbox can simplify to a single `fontFamily.sans = ["Inter"]` entry and keep the `fontSize` scale as the source of truth for named type tokens.

### Components — one definition per component, reused everywhere
- **Buttons:** one primary style (solid, brand color), one secondary style (outline/ghost). No third variant unless added here first.
- **Cards:** one border-radius value, one shadow value, one padding scale — used identically on portfolio cards, service cards, testimonial cards.
- **Icons:** inline SVG only. Do NOT use an icon font. **CONFIRMED root cause:** the live `<head>` loads Google's "Material Symbols Outlined" via a ligature-based icon font — this is exactly why raw words like "code," "draw," "brush" appear as visible text ("liquid names showing up") when the font hasn't loaded yet. This is a hard requirement, not a preference: migrate every icon reference to inline SVG and remove the Material Symbols font link entirely. **Bonus confirmed bug:** the current `<head>` loads the Material Symbols `<link>` twice (identical URL, duplicated tag) — remove the duplicate regardless of the SVG migration timeline.
- **Section spacing:** one consistent vertical padding scale for all sections (e.g., defined small/medium/large spacing tokens — pick once, apply everywhere).
- **Animation:** minimal. Subtle fade/slide-in on scroll is acceptable. No heavy motion, no Awwwards-style scroll-jacking, no cursor-follow effects. Animation duration should be one consistent value (e.g., 200–300ms) across all interactive elements.

### Design direction
Minimal — closer to Linear/Stripe restraint than Awwwards spectacle. Keep the current visual direction; refine consistency, don't reinvent the aesthetic.

## 6. INFORMATION ARCHITECTURE

**Do not build 50–100 pages today.** Build this structure now, populate it in phases:

```
/                           Home
/about                      About + Founder
/services                   Services overview
  /services/website-development
  /services/ui-ux-design
  /services/graphic-design
  /services/seo-ai-search-optimization
/projects (or /portfolio)   Portfolio grid (12 projects)
  /projects/[project-name]  Individual project page (SEO-friendly slug = project's real/brand name, not "/project/1")
/contact                    Contact
/book-consultation          Consultation booking
```

Reserved but not built yet (leave room in nav config / sitemap structure, do not expose live links):
- `/blog` — architecture-ready, hidden from nav until content exists.
- Industry-specific landing pages — build only once 3+ real case studies per industry exist to support them. Do not build empty industry pages.
- Mobile App Development service page — **hold until a real shipped mobile project exists.** Do not list as a live service before there's proof.

### Navigation (desktop)
`Home | About | Services ▾ | Projects | Contact`
- "Services" is a hover/click dropdown containing: Website Development, UI/UX Design, Graphic Design, SEO & AI Search Optimization. Each links to its own page.
- Primary header CTA button: **WhatsApp** (direct inquiry).

### Navigation (mobile)
- Hamburger menu **must remain fully accessible regardless of scroll position.** This fixes the current bug where the menu becomes unreachable after scrolling down. Requirement: nav trigger uses `position: fixed` (not `absolute`) with a z-index above all page content, tested at every scroll depth on every page.
- "Services" in the mobile menu expands as an accordion/dropdown (not a separate page navigation) showing the same 4 service links.

## 7. SERVICES (confirmed list)

1. Website Development (custom websites, landing pages, e-commerce, business websites, website redesign, website maintenance)
2. UI/UX Design
3. Graphic Design
4. SEO & AI Search Optimization *(not just "SEO" — name it fully; this phrase also does double duty as an SEO/GEO keyword target)*

Each gets its own page with: what's delivered, who it's for, process, FAQ block (see Section 11), and a CTA.

*Mobile App Development is a future addition — do not add it to live navigation/services until there's a real project to back it.*

## 8. TARGET CLIENTS

Primary: business owners in Nigeria running custom/business websites, e-commerce, and general business sites. Secondary: international businesses (UK, US, UAE) and other African countries needing the same.

**Not** exclusively construction/real estate/vertical-specific — those show up as portfolio examples, not as the stated niche. Copy should reflect "businesses that need a strategic website" broadly, not fake a narrow niche that doesn't exist yet.

## 9. HOMEPAGE STRUCTURE

**Section background alternation (required — prevents the "everything is dark purple" flatness of the current homepage):**

| # | Section | Background |
|---|---|---|
| 1 | Hero | Dark Purple (`#15121a`) |
| 2 | Client pain points / why websites fail | Light Purple (`#7706fe`) |
| 3 | Philosophy / approach | White (`#e7e0ec`), dark text |
| 4 | Featured projects | Dark Purple |
| 5 | Services overview | Light Purple |
| 6 | Process | Dark Purple |
| 7 | Testimonials | White, dark text |
| 8 | FAQ | Dark Purple |
| 9 | Final CTA | Light Purple |

Text color always flips to maintain contrast: white/light text on Dark Purple and Light Purple sections, dark text on White sections. No section repeats the same background as the section immediately before or after it.

1. Hero — headline + subheadline, **two buttons only**: WhatsApp (direct inquiry) + View Portfolio/Past Projects.
2. Client pain points / why websites fail (business-problem framing, not company boasting)
3. Philosophy / approach (short version of Founder Doctrine — "Strategy before design")
4. Featured projects (subset of the 12, linking to individual project pages)
5. Services overview (4 services, brief, linking to full service pages)
6. Process (existing 4-step: Discovery → Strategy & Planning → Design & Development → Launch & Support)
7. Testimonials (with full names + company where possible — see Section 14)
8. FAQ (existing FAQ block, expanded with schema — see Section 11)
9. Final CTA

## 10. PORTFOLIO RULES

- 12 projects total (real client + personal projects), each gets its own dedicated page — URL uses the project's real/brand name, not a generic `/project/1` pattern.
- Page `<title>` and meta description for each project page must be SEO-optimized around real search intent (e.g., "Real Estate Website Design & Development — Drey Studio Portfolio"), **not** a plain "Portfolio — Nexus" style title.
- Images: mockup-style presentation (device frames), sourced from the actual live project screenshots — convert to a consistent format (JPEG or WebP), stored under a single organized `/assets/projects/[project-name]/` folder structure.
- Alt text must accurately describe the actual project shown — no leftover placeholder names ("Eco-Retail Platform," "Nova Fintech Dashboard," etc. must all be corrected to match real project names).
- **Flagship case studies (build first, full depth):** Construction Website, WAEC/Exam Score Predictor, E-commerce Website. Structure: Overview → Challenge → Discovery → Strategy → Execution → Results → (Testimonial if available).
- **Remaining 9 projects (lighter, build now):** Overview, Technologies used, Live link (if available), Image gallery. Can be expanded into full case studies later — the page structure should be built so upgrading a project from "light" to "flagship" later doesn't require a URL or template change.

## 11. SEO / AEO / GEO REQUIREMENTS

This is not a later phase. Every page ships with these from day one.

### On every page
- Unique, keyword-relevant `<title>` (under ~60 characters) and meta description (150–160 characters).
- One `<h1>` per page, logical heading hierarchy beneath it.
- `Organization` + `Person` (founder) JSON-LD schema site-wide (in a shared partial/include, not copy-pasted per page).
- `Service` schema on each service page. `FAQPage` schema wrapping any FAQ block. `Review`/`AggregateRating` schema wrapping testimonials once verified (name + company present).
- Open Graph + Twitter Card tags matching the page's actual title/description (no defaults leaking through).
- `robots.txt` + `sitemap.xml` present and kept current as pages are added.

### AEO (Answer Engine Optimization)
- FAQ and service pages should answer questions in a direct, extractable, "answer-first" format: state the answer in the first sentence, then elaborate. This applies to both on-page FAQ text and schema.
- Every service page should implicitly or explicitly answer: What is this service? Who is it for? What's included? How long does it take? What's the starting investment range?

### GEO (Generative Engine Optimization) — two distinct goals, both required
1. **Entity recognition** — AI assistants (ChatGPT, Claude, Gemini, Perplexity, Copilot) can accurately answer "Who is Drey Studio / who founded it / what does it do / where is it based" from on-site content + consistent off-site profiles.
2. **Discovery** — the harder goal. The site and its supporting ecosystem should be structured so that when someone asks an AI assistant *"who's a good website developer in Ibadan / Nigeria"* without naming the brand, Drey Studio is a plausible, well-evidenced answer. This depends on:
   - Consistent NAP (name/address/phone/email) across the site, Google Business Profile, and every listed platform.
   - Genuine, specific, extractable content (case studies with real numbers/outcomes, not vague claims).
   - External corroboration: Google Business Profile, LinkedIn, Behance, GitHub, and (as bandwidth allows) GoodFirms/Clutch/DesignRush listings — all pointing back consistently.
   - This is a multi-month compounding effort, not a one-time technical fix — but the on-site foundation (schema, consistent NAP, real case studies) must exist before off-site work can compound.

## 12. CONVERSION RULES

- Two consistent conversion paths site-wide: **WhatsApp** (quick inquiry — use direct `wa.me/[number]?text=[context-specific message]` links, not the generic message-request short-link, so each CTA can carry context about what page/service the visitor came from) and **Contact/Book Consultation form** (formal inquiry).
- Forms submit via **Netlify Forms** (`data-netlify="true"` on the `<form>` tag) — no external form service needed since the site is already Netlify-hosted.
- One email address, used identically everywhere: footer, contact page link text, the `mailto:` href behind it, schema markup, and all social bios.
  **CONFIRMED: `thedreystudio1@gmail.com`** — Blackbox must find and replace every instance of `thedreystudio@gmail.com`, `hello@olaniyidamilare.com`, and any other variant across every page with this exact address.
- No dead links. No `href="#"` placeholders on real CTAs — audit every CTA before shipping a page.

## 13. ACCESSIBILITY

- Every `<img>` has accurate, descriptive alt text.
- All form fields have real `<label>` elements (not placeholder-text-only).
- FAQ accordions and any expandable UI use real `<button>` elements with `aria-expanded`/`aria-controls`, not `<div onclick>`.
- Skip-to-content link present.
- Contrast-check the light-purple-on-dark-purple and white-on-purple combinations specifically before finalizing — confirm AA compliance, don't assume.
- Full keyboard navigability (tab order, visible focus states) — no mouse-only interactions.

## 14. TRUST & TESTIMONIALS

- Every testimonial needs a full name and, where permission allows, company name/logo and a link to the relevant project. No unverifiable single-initial testimonials going forward.
- "Available for new projects" status badges must be manually kept accurate — remove if it can't be kept honest.

## 15. PERFORMANCE

- All images converted to WebP (JPEG fallback where needed), explicit `width`/`height` attributes on every `<img>` to prevent layout shift, lazy-loading on everything below the fold.
- No icon fonts (see Section 5) — inline SVG removes both the performance cost and the fallback-text bug.
- No hotlinked external images (fix: the current Google-hosted placeholder image on Contact must be replaced with an owned asset).
- Tailwind: **CONFIRMED** — the live `<head>` loads Tailwind via `<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries">`, compiling styles live in the browser on every page load (JIT-in-browser mode). This is explicitly not recommended for production by Tailwind's own team — it's slower (blocks render until the JS compiles the CSS) and can't purge unused utility classes, so every visitor downloads the full utility engine. Not a same-day emergency, but scheduled for Phase 6: migrate to a proper build step producing a compiled, purged stylesheet, moving the current inline `tailwind.config` (colors/spacing/fontSize) into that build config unchanged.

## 16. FOLDER STRUCTURE

```
/                       (root HTML pages)
/assets
  /images
    /projects/[project-name]/
    /icons/            (inline SVGs, not a font)
  /css
  /js
/services/[service-slug].html
/projects/[project-name].html
sitemap.xml
robots.txt
```
Shared nav/footer/meta must live in a single reusable source (include/partial, or a shared JS include if the stack stays plain HTML) — not hand-duplicated per page. This is the single most important structural fix, since it's the root cause of the current nav/footer drift.

## 17. CODING CONVENTIONS

- Stack: HTML + Tailwind CSS + vanilla JavaScript. No React, no Next.js, no build-heavy framework.
- Consistent naming: kebab-case for files and CSS classes.
- No inline `style=""` attributes where a Tailwind utility or a defined component class exists.
- Comment any non-obvious JavaScript (form handling, nav toggle logic, accordion logic).
- No placeholder/lorem-ipsum content ships to production — if content isn't ready, the section doesn't ship.

## 18. GOOGLE STITCH GUIDELINES

When prompting Stitch to generate any section or page:
- Reference this document explicitly.
- Do not invent new colors, fonts, spacing values, button styles, or card styles — reuse Section 5's system exactly.
- Do not add gradients, new icon styles, or animation types not already defined here.
- Every generated section must be checked against existing sections for visual consistency before acceptance.

## 19. CLAUDE (COPYWRITING) GUIDELINES

- Follow Section 4's voice rules and formula on every page.
- Write to answer real questions directly and specifically (real timeframes, real starting-price ranges once approved) — vague copy hurts both conversion and AEO.
- Founder voice ("I") in About/founder contexts; brand voice ("Drey Studio") in titles, meta, and general marketing copy — per Section 3.
- Every piece of copy delivered alongside the exact meta title + meta description for that page.

## 20. QUALITY CHECKLIST — before any page is considered done

- [ ] Mobile responsive at 320/375/390/414/768/1024/1440
- [ ] No dead links, no `href="#"` placeholders
- [ ] Unique meta title + description present
- [ ] Schema markup present and valid
- [ ] All images have accurate alt text, explicit dimensions, WebP format
- [ ] No icon-font fallback-text risk (inline SVG only)
- [ ] Nav + footer identical in structure to every other page (pulled from shared source, not hand-copied)
- [ ] Hamburger menu accessible at every scroll position
- [ ] Contrast checked, keyboard-navigable, labeled form fields
- [ ] Copy follows Section 4 voice rules — no leftover hype words, no lorem ipsum
- [ ] One consistent email address, one consistent phone number, matching schema

---

**Status:** This is v1.0 of a living document. Update it here first whenever a rule changes — never let an individual prompt to Blackbox, Stitch, or Claude silently override it.
