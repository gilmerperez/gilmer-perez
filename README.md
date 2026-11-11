# Gilmer Perez Portfolio

## Description

The portfolio site of Gilmer Perez, a Digital Growth Specialist. It shows how one person can cover the whole path from website to customer: build and host the site, make it rank in search, track what it does, run paid ads, and report on the results, on custom code or any major website builder. Custom-coded front-end work is still shown as the favorite part.

- **Problem:** Most small businesses hire a developer, an SEO, an ads manager, and someone to explain the reports, and things get lost between them.

- **Solution:** A single-page site that explains the process, lets visitors explore it (search results, reports, projects), and proves the work by running on the same practices it sells.

- **Methodology:** Next.js App Router with server components by default, client components only for the interactive pieces, CSS Modules with a small set of design tokens, and JSON files for content.

**Live Demo:** [Link to Deployed Application](https://gilmer-perez.vercel.app/)

## Table of Contents

- [Features](#features)
- [Structure](#structure)
- [Design Tokens](#design-tokens)
- [Technology Stack](#technology-stack)
- [Development](#development)

## Features

- **Single-page layout with anchor sections:** Home, Process, Platforms, Search, Reporting, Experience, Projects, Proof, and Contact, plus separate Privacy Policy and Terms of Service pages. The old `/about`, `/contact`, `/projects`, and `/project-page/:id` URLs redirect permanently to the matching section.

- **Interactive process:** Six stages (Build, Rank, Track, Advertise, Report, Maintain), each with its own details, outcome, and tools.

- **Search simulator:** Four tabs (Organic, Map Pack, AI Answer, Paid Ad) show a generic results page and what it takes to appear in each place.

- **Report translator:** An accessible switch flips a sample monthly report between the analyst view and the plain-language owner view.

- **Project modal:** Native `<dialog>` with focus trapping, Escape and backdrop close, scroll lock, focus return, screenshots built from `projects.json`, and PREV and NEXT that wrap around.

- **Proof section:** Real Lighthouse scores read from `src/data/lighthouse.json`, plus a code panel that prints the exact JSON-LD object the page sends to search engines.

- **Dark only:** A single dark design with a slow blue glow. All animation is switched off under `prefers-reduced-motion`.

- **SEO and accessibility:** Metadata, canonical URLs, Open Graph and Twitter tags, sitemap, robots, JSON-LD (`Person` and `WebSite`), one `h1`, descriptive alt text, keyboard support, and visible focus outlines.

## Structure

```text
src/app/page.jsx                 composes the sections and renders JSON-LD
src/components/                  one folder per component, with a .module.css next to it
src/data/projects.json           project content (cards and modal)
src/data/process.json            the six process stages
src/data/search.json             the four search tabs
src/data/schema.js               Person and WebSite schema (shared by JSON-LD and the Proof panel)
src/data/lighthouse.json         measured Lighthouse scores and the date they were measured
src/data/contact.js              email, phone, location, and profile links
```

## Design Tokens

Colors, fonts, and glow values live in `src/styles/globals.css` on `:root`, and the three keyframes (`glowPulse`, `textPulse`, `hazePulse`) sit next to them. Component modules use the tokens instead of hard-coded values, so restyling the site starts in that one file.

## Technology Stack

- **Next.js 16** (App Router) and **React 19**, plain JavaScript
- **CSS Modules** with custom CSS (no CSS framework)
- **next/font** for Kode Mono and Source Code Pro, **next/image** for photos, logos, and screenshots
- **Vercel Analytics** and hosting on **Vercel**
- Inline SVG for all icons and illustrations

## Development

```bash
npm install
npm run dev      # development server
npm run lint     # ESLint
npm run build    # production build
npm start        # serve the production build
```

To refresh the Proof section's scores, run Lighthouse against the production build (`npm run build && npm start`) and update `src/data/lighthouse.json` with the results and the date.

---
