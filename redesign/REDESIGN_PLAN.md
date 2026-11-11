# Portfolio redesign plan for Claude Code

Repo: `gilmerperez/gilmer-perez` (live at https://gilmer-perez.vercel.app)
Companion file: `redesign-reference.html` (the approved mockup source, in this same folder)

## 0. Read this first

Gilmer designed and approved a new version of this site in a mockup. Your job is to rebuild the site so it **looks and behaves exactly like that mockup**. Do not redesign, restyle, or rewrite copy. Where this plan and the reference file disagree, the reference file wins for visuals and copy, and this plan wins for architecture and behavior.

How to read `redesign-reference.html`:

- It is a design-tool template, not a page you can open in a browser. Treat it as a spec.
- Everything inside `<x-dc>` is the markup. Every inline style value (sizes, colors, gaps, clamps, radii, shadows) is exact and approved. Port them into CSS Modules.
- `<helmet><style>` holds the global rules and the three `@keyframes`.
- `{{ name }}` is a value returned by `renderVals()` in the script at the bottom of the file.
- `<sc-for list="{{ xs }}" as="x">` repeats its children per item. `<sc-if value="{{ flag }}">` renders its children only when the flag is true. `onClick="{{ fn }}"` calls a handler from `renderVals()`.
- The `Component` class at the bottom holds all state, data, and copy for the interactive sections. Port its data and logic into React state.

Positioning change, for context: the site used to present Gilmer as a front-end web developer. It now presents him as a **Digital Growth Specialist**: he builds and hosts the site, makes it rank, tracks it, runs paid ads, and reports on it, on custom code or any major website builder. Custom-coded front-end work is still shown as his favorite part.

## 1. Ground rules

1. Work on a new branch, `redesign/digital-growth`. Do not commit to `main`, push, or deploy unless Gilmer asks.
2. Keep the stack: Next.js 16 App Router, React 19, plain JavaScript (no TypeScript conversion), **CSS Modules with custom CSS**. No Tailwind. No new npm dependencies.
3. Follow the existing code style: commented sections, one component folder per component with a `.module.css` next to it, existing naming conventions. Check for existing patterns before writing new ones.
4. Never modify `.env` or `.env.local` without asking.
5. Copy rules, no exceptions:
   - Use the copy in the reference file word for word.
   - **No em dashes anywhere** in user-facing text.
   - **No resume button, link, or file anywhere on the site.** Remove the existing one and its Google Doc URL entirely. The header button goes to the contact section instead.
   - **No employer names** in the Experience section (see the reference copy).
   - Spell it "resume", never with accents, if the word ever appears in code comments.
6. Dark only. Remove the light theme and the theme toggle completely.
7. Do not invent numbers, testimonials, or client names. The only real stats are "$500,000 in ad spend managed" and "50+ client websites managed".
8. If something in this plan is ambiguous, ask Gilmer instead of guessing.

## 2. Design tokens

Put these on `:root` in `src/styles/globals.css` and delete both `html[data-theme=...]` blocks.

| Token | Value | Use |
|---|---|---|
| `--bg-color` | `#0d0d0d` | page background |
| `--surface` | `#060606` | panels, footer, cards |
| `--primary` | `#0099ff` | accent, borders, glow |
| `--primary-light` | `#4dbbff` | taillights in footer scene |
| `--text-primary` | `#e6e6e6` | main text |
| `--text-secondary` | `#cccccc` | body copy |
| `--text-muted` | `#b3b3b3` | labels, captions |
| `--border-muted` | `#4d4d4d` | inactive buttons, chips |
| `--border-faint` | `#333333` / `#262626` | panel dividers |

Fonts stay as they are: Kode Mono (headings, italic 700, labels, buttons) and Source Code Pro (body), loaded with `next/font/google`. The search results mock uses `Arial, Helvetica, sans-serif` on purpose so it reads as a real results page.

Add `color-scheme: dark` on `html`.

### Glow and pulse

The three keyframes in the reference `<helmet>` are the approved effect (think of a brake light at night): `glowPulse` (box-shadow), `textPulse` (text-shadow), `hazePulse` (opacity of a blurred radial gradient). Durations per element are in the inline styles (3s to 7s, `ease-in-out infinite`).

- Keep the look identical. For performance you may implement `glowPulse` as a static shadow on a `::after` pseudo-element whose `opacity` animates, as long as it looks the same as the reference.
- Wrap all animation in `@media (prefers-reduced-motion: reduce)` to turn it off, as the reference does.

## 3. Architecture changes

The site becomes a **single page** with anchor sections, plus the two legal pages.

Section ids, in order: `top`, `how`, `search`, `reporting`, `experience`, `projects`, `proof`, `contact`. Give sections `scroll-margin-top: 120px` so the sticky header does not cover headings.

### Routes

| Route | Action |
|---|---|
| `/` | Rebuilt as the single page |
| `/privacy-policy`, `/terms-of-service` | Keep. Restyle only as needed to match dark tokens. Review their text for any mention of the removed pages or theme feature |
| `/about`, `/contact`, `/projects` | Delete the folders. Add permanent redirects in `next.config.mjs` to `/#experience`, `/#contact`, `/#projects` |
| `/project-page/[id]` | Delete the folder. Redirect `/project-page/:id` to `/#projects` |

Verify the redirects with a production build (`next build && next start`, then request each old URL). If a hash in a redirect destination does not work in this Next version, redirect to `/` instead and tell Gilmer.

### Files to delete

- `src/app/about/`, `src/app/contact/`, `src/app/projects/`, `src/app/project-page/`
- `src/components/Technologies/` and `src/data/technologies.json`
- `src/components/Project/` (replaced by the new project card and modal)
- The Font Awesome `@import` in `globals.css`. Replace every icon with inline SVG (the reference contains the SVG paths). This also removes a render-blocking request.

### New structure

```
src/app/page.jsx                      composes the sections, renders JSON-LD
src/components/Header/                rewritten
src/components/Footer/                rewritten, includes FooterScene
src/components/Hero/
src/components/Process/               client component
src/components/Platforms/
src/components/SearchSimulator/       client component
src/components/ReportTranslator/      client component
src/components/Experience/            includes PhotoSwitcher (client)
src/components/Projects/              ProjectCard + ProjectModal (client)
src/components/Proof/                 Lighthouse scores + schema explainer
src/components/Contact/
src/data/projects.json                kept, edited (section 6)
src/data/process.json                 the 6 stages from the reference script
src/data/search.json                  the 4 search tabs from the reference script
src/data/lighthouse.json              measured scores (section 5.8)
src/data/schema.js                    the Person and WebSite schema objects
```

Keep server components by default. Only the interactive pieces need `"use client"`.

## 4. Build order

Do these in order and run `npm run lint` and `npm run build` after each phase.

1. **Foundation.** Branch, tokens, keyframes, remove light theme, remove Font Awesome, add redirects, delete old routes and components, update `sitemap.js` to list only `/`, `/privacy-policy`, `/terms-of-service`.
2. **Header and Footer.** They wrap everything, so do them first.
3. **Static sections.** Hero, Platforms, Experience (without the photo switcher), Contact.
4. **Interactive sections.** Process, SearchSimulator, ReportTranslator, PhotoSwitcher, Projects with modal.
5. **Proof.** Schema explainer first, Lighthouse scores last (they need the finished build).
6. **SEO and metadata** (section 7).
7. **Verification** (section 8), then update `README.md` to describe the new site.

## 5. Section specs

The reference file has the exact markup, styles, and copy. This section covers behavior and the things the mockup cannot show.

### 5.1 Header

- Sticky at `top: 16px`, always visible (remove the old hide-on-scroll logic), translucent background with backdrop blur, 1px blue border, slow glow pulse.
- Desktop: `GILMERPEREZ` logo left. Links right: HOME, PROCESS, EXPERIENCE, PROJECTS, then a bordered CONTACT button. HOME is underlined as in the mockup.
- At `max-width: 860px`: only the logo and a hamburger button. The menu opens as a dropdown **inside the header box** (not the old slide-in sidebar, and remove the `createPortal` code). Links stack, CONTACT is a full-width blue button. The icon switches to a blue X when open.
- Close the menu on link click, on Escape, and when the viewport grows past 860px. Set `aria-expanded` on the button.
- Remove completely: theme toggle, resume button, `handleResumeClick`, the phone icon button, the sidebar legal links.
- On the legal pages the links must point to `/#how`, `/#experience`, and so on.

### 5.2 Hero

- Intro line, two-line heading, a thin 2px glowing bar the width of the heading, body text, two buttons, then the BUILD > RANK > TRACK > ADVERTISE > REPORT > MAINTAIN strip.
- **Width rule Gilmer asked for:** the intro line is exactly as wide as the heading, and the body paragraph is only slightly wider than the heading (heading width plus 72px, capped at 88vw). The reference does this with a `width: fit-content` wrapper and `width: 0; min-width: ...` on the paragraphs. Keep that behavior at every viewport.
- Heading lines never wrap (`white-space: nowrap`), font size `clamp(32px, 6.4vw, 84px)`.
- A blurred blue haze sits behind the heading and pulses slowly.
- Buttons: SEE THE PROCESS goes to `#how`, VIEW PROJECTS goes to `#projects`.

### 5.3 Process (01)

- Six stage buttons in an auto-fit grid. One is active at a time (state: index, default 0). Use `aria-pressed`.
- The panel below shows the active stage: title, body, "WHAT YOU GET", tool chips.
- BUILD shows the stat "50+ client websites managed". ADVERTISE shows "$500,000 in ad spend managed for clients". The other stages show no stat.
- The active button is solid blue with black text and pulses.

### 5.4 Platforms (02)

Four static cards. Custom Code is the highlighted one with the blue border and pulse. Cards lift 5px on hover.

### 5.5 Search simulator (03)

- Four tabs: ORGANIC, MAP PACK, AI ANSWER, PAID AD (state: tab key, default `organic`).
- Left: a white results page mock in Arial with a search bar, tab row, and a different result layout per tab. "Your Business" is always the item ringed in blue glow. Right: a dark "WHAT IT TAKES" panel with title, body, and chips for the active tab. The PAID AD tab also shows the $500,000 stat.
- Keep every bracketed placeholder such as `[your service]` and `[Your City]` exactly as written. They are intentional.
- Do not add any real search engine logo, name, or brand colors beyond what is in the reference. It must stay a generic results page.
- The map is the inline SVG from the reference.

### 5.6 Report translator (04)

- A real switch (`role="switch"`, `aria-checked`) between "WHAT I SEE" and "WHAT YOU GET". The knob slides with a 0.3s transition and the active label turns blue.
- Analyst view: a six-bar chart (last bar bright and glowing, the rest at 38% opacity) plus a metric list. Owner view: three large glowing numbers with a plain sentence each, plus the "next month" line.
- Keep the caption "SAMPLE MONTHLY REPORT. ILLUSTRATIVE NUMBERS, NOT A REAL CLIENT." It must stay visible in both views.

### 5.7 Experience (05)

- Left: a vertical timeline with a 2px blue line and a dot per entry. Only the first dot pulses. **Do not add any box-shadow to the timeline container** (an earlier version had a stray glow above and below it).
- Copy is formal, third person, and names no employers. Use it word for word.
- Right: the **photo switcher**. A button with a 3:2 frame holding both photos stacked, `public/images/gilmer-perez-1.jpg` (shown first) and `public/images/gilmer-perez-2.jpg`. Clicking crossfades to the other one (opacity, 0.6s). Caption chip bottom right: "01 OF 02 / CLICK TO SWITCH" and "02 OF 02 / CLICK TO SWITCH". Use `next/image` with proper `sizes` and the alt text from the reference.
- The two columns wrap, so the photo drops under the timeline on narrow screens.

### 5.8 Projects (06)

**Cards.** Four cards in an auto-fit grid. The whole card is one `<button>`. Clicking anywhere on it opens the modal.

- **Use the project logos on the cards, not screenshots** (`logo` in `projects.json`). The mockup shows screenshots only because the logos were not available there. Logo area is 170px tall, `object-fit: contain`. The logos have solid backgrounds, so add a `logoBg` field per project and use it as the tile background: white for Bubbalous Bodacious BBQ and Moonstar Esthetics, black for Kingdom Movement. Reelix is a PNG with possible transparency, so check it and pick black or the surface color.
- Card text: category label, title, one-line summary, "LOOK INSIDE +".

**Modal.** Replaces the old individual project pages.

- Use a native `<dialog>` opened with `showModal()` so you get focus trapping, Escape to close, and an inert background for free. Style `::backdrop` as `rgba(0,0,0,0.84)` with a 6px blur.
- Close on: the X button, Escape, and a click on the backdrop. Lock page scroll while open and return focus to the card that opened it.
- Layout (see reference): sticky header with "CATEGORY / 02 OF 04" and the title, sticky footer with PREV, VISIT WEBSITE, NEXT. PREV and NEXT cycle through the projects and wrap around.
- Left column: screenshot viewer (16:9, `object-fit: cover`, top aligned) with one button per screenshot, then the project description. The mockup shows three screenshots per project. **In the real build show every screenshot listed in `projects.json`**, and derive the button label from the file name (`homePage` becomes HOME, `orderOnlinePage` becomes ORDER ONLINE, `darkTheme` becomes DARK THEME).
- Right column: a two-button switch, KEY FEATURES and BUILT WITH. Each `keyFeatures` and `technologyStack` string is "Name: description". Split on the first `": "`. Features render as a numbered list with glowing numbers, stack entries as label and value rows.
- All content comes from `projects.json`. Do not hardcode project text in the component.

### 5.9 Proof (07)

**Lighthouse scores.** Four circular gauges styled like the Lighthouse report (green ring, tinted fill, number inside), with the 0-49 / 50-89 / 90-100 legend pill under them.

- Build each gauge with HTML and CSS (a bordered round `div` with the number centered). An earlier SVG `<text>` version failed to show the numbers.
- **The numbers must be real.** After the build is finished, run Lighthouse against the production build (`next build && next start`) and store the results in `src/data/lighthouse.json` with the date measured. The component reads from that file. The mockup shows 100 in all four, which is what the current live site scores according to Gilmer's screenshot. If the rebuilt site scores lower anywhere, fix the cause first. If it still is not 100, show the true number and tell Gilmer.
- Color each ring by its range (red, orange, green) so the component stays honest if a score changes.

**Schema explainer.** Left: the "WHAT SEARCH ENGINES READ" explanation from the reference, so a non-technical visitor understands what they are looking at. Right: a code panel showing the Person schema.

- The code panel must render the **same object** that is injected as JSON-LD (import it from `src/data/schema.js` and `JSON.stringify(schema, null, 2)`), so the two can never drift apart.

### 5.10 Contact

- The heading is always three lines, never reflowed: "ONE PARTNER" (large), "FOR THE WHOLE" (about half the size, `rgba(230,230,230,0.6)`), "DIGITAL SIDE." (large, same as line one). Each line is `white-space: nowrap`. Keep it a single `<h2>` with three block spans.
- EMAIL ME is a `mailto:` link and CALL ME is a `tel:+14073501805` link. Use real `<a>` elements, not buttons with `window.location`.

### 5.11 Footer

- Four columns that wrap: brand block (logo, tagline, email, phone, location with small blue line icons), SECTIONS, CONNECT, START SOMETHING (short text plus a GET IN TOUCH button with 14px of space above it).
- Phone is displayed as **+1 (407) 350-1805**. Location is **Florida, USA**.
- Below: copyright on the left (keep the dynamic year), Privacy Policy | Terms of Service on the right.
- At the bottom: the night scene SVG from the reference, full width, height `clamp(200px, 24vw, 340px)`, `preserveAspectRatio="xMidYMax slice"`. Stars, two mountain ridges, a glowing blue horizon line, a perspective grid, a road, and a car whose taillights and reflection pulse. A blurred blue haze behind the ridges pulses slowly. Gilmer loves this, so port it exactly. Mark it `aria-hidden`.

## 6. Data changes in `src/data/projects.json`

1. Add `kind` per project: `RESTAURANT`, `FITNESS`, `SKINCARE`, `WEB APP` (in id order).
2. Add `summary` per project (the short card line, copy in the reference).
3. Add `logoBg` per project (section 5.8).
4. **Fix a live bug:** the Bubbalous entry points to `.../screenshots/partyPacksPage.png` but the file on disk is `PartyPacksPage.png`. This breaks on Vercel because the file system is case sensitive. Rename the file to `partyPacksPage.png` with `git mv` so it matches the other file names.
5. Leave `description`, `keyFeatures`, `technologyStack`, `screenshots`, and `deployedLink` as they are.

## 7. SEO and metadata

The site sells SEO, so this part has to be right.

- `src/app/layout.jsx` metadata:
  - Title default: `Gilmer Perez | Digital Growth Specialist`
  - Description, written around: web development, SEO, paid media, and analytics. One partner for the whole digital side of a business. No em dashes.
  - Keywords: replace the list. Remove PostgreSQL, MongoDB, GraphQL, Express.js, Node.js Developer, Full-Stack Developer. Add Digital Growth Specialist, SEO Specialist, Technical SEO, Local SEO, Google Ads, Meta Ads, PPC, GA4, Web Developer, Next.js Developer, Orlando, Florida.
  - Update Open Graph and Twitter titles, descriptions, and image alt text to match. Keep the Google site verification value.
- `src/data/schema.js`:
  - `Person`: `jobTitle: "Digital Growth Specialist"`, updated `description`, `knowsAbout` as in the reference, `sameAs` filled with the GitHub and LinkedIn URLs from the footer (it is currently an empty array with placeholder comments), `alumniOf` kept. **No `worksFor`.**
  - `WebSite`: updated description.
- Remove the per-page metadata and JSON-LD that belonged to the deleted routes.
- One `<h1>` on the page (the hero heading). Section titles are `<h2>`, panel titles `<h3>`.
- Every image has real alt text. Decorative SVG is `aria-hidden`.

## 8. Verification checklist

Do not report the work as finished until all of these pass.

- [ ] `npm run lint` and `npm run build` are clean.
- [ ] Side by side with the reference at 1440px, 1024px, 768px, and 390px wide: spacing, sizes, colors, and copy match.
- [ ] No horizontal scroll at any width. Hero heading and the contact heading keep their line breaks at 390px.
- [ ] Header: sticky, hamburger at 860px and below, menu closes on link click and Escape.
- [ ] Every anchor link lands with the section heading visible below the header.
- [ ] Process, search tabs, report switch, photo switcher: all work with mouse and keyboard, with visible focus outlines.
- [ ] Project modal: opens from anywhere on a card, traps focus, closes on X, Escape, and backdrop click, returns focus, PREV and NEXT wrap, every screenshot loads (including the renamed party packs file).
- [ ] Old URLs (`/about`, `/contact`, `/projects`, `/project-page/1`) redirect.
- [ ] Search the codebase: no "resume", no theme toggle code, no `data-theme`, no Font Awesome classes, no em dashes in user-facing strings, no employer names in the Experience copy.
- [ ] `prefers-reduced-motion: reduce` stops every pulse.
- [ ] JSON-LD validates, and the code panel in the Proof section matches it exactly.
- [ ] Lighthouse run on the production build, results saved to `src/data/lighthouse.json`, numbers on the page match.

## 9. Open items to raise with Gilmer when you finish

1. The HOME link stays underlined while scrolling, as in the mockup. Ask whether he wants the underline to follow the section in view.
2. Report the measured Lighthouse scores and anything that kept them under 100.
3. He has said he wants to change the overall look of the site in a later pass, so keep colors, fonts, and glow values in the tokens and keyframes rather than scattered through the modules.
