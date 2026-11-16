# Gilmer Perez Portfolio

Hi, I'm Gilmer. This is the code behind my portfolio, live at [gilmer-perez.vercel.app](https://gilmer-perez.vercel.app/).

I'm a Digital Growth Specialist. I started out building websites, then spent my time in SEO, paid ads, and reporting at a marketing agency. That showed me how much gets lost when a small business hires one person for the website, another for search, another for ads, and nobody explains the reports. So I like to handle the whole path myself: build and host the site, help it get found, track what it does, run the ads, and report on the results in a way an owner can actually use.

Front-end development is still my favorite part, so I coded this site by hand instead of using a builder. I wanted it to prove the work by following the same practices I use for clients.

## What's on the Site

It's one page split into sections, and the navigation jumps between them.

- **The Process:** The six steps I take a business through (Build, Rank, Track, Advertise, Report, Maintain), each with what I do, the outcome, and the tools I use.
- **Any Platform:** Custom code or a popular website builder. I work with whichever fits the business.
- **Search:** A small results page you can click through (Organic, Map Pack, AI Answer, Paid Ad) showing what it takes to show up in each spot.
- **Reporting:** A sample monthly report you can switch between the analyst view and a plain-language view for the owner.
- **Proof:** Real Lighthouse scores for this site and the exact structured data it sends to search engines.
- **Experience:** The roles I've held and what I handled in each one.
- **Projects:** A carousel of sites I've built. It slides slowly on its own, the project in the middle grows and glows, and you can use the arrows, the dots, your keyboard, or a swipe. Opening one shows screenshots, features, and the tech behind it.
- **Contact:** How to reach me.

There's also a dark theme and a light theme. You can switch between them with the moon in the footer, or by clicking the sun (or the black hole, in the dark theme) at the top of the page.

## How I Built It

- **Next.js 16** (App Router) and **React 19**, in plain JavaScript
- **CSS Modules** with custom CSS. I don't use Tailwind because I like being able to read my styles. Colors, fonts, and glows live as tokens in `src/styles/globals.css`, so a restyle starts in one file.
- **Content in data files**, so updating a project or a section doesn't mean digging through components. Projects live in `src/data/projects.json`.
- **Server components by default.** Only the interactive pieces (the carousel, the project popup, the search tabs, the report switch, the theme switch) run in the browser.
- **SEO basics done right:** page metadata, canonical URLs, Open Graph tags, a sitemap, robots rules, and structured data (`Person`, `WebSite`, and the services I offer). Old URLs from the previous version redirect to the matching section.
- **Accessibility:** one `h1`, real buttons and links, keyboard support everywhere, visible focus outlines, and every animation turned off for people who prefer reduced motion.
- **Tracking:** Google Tag Manager with Google Analytics 4, plus Vercel Analytics.
- **Fonts:** Newsreader for headings and Outfit for body text, loaded with `next/font`.
- **Hosting:** Vercel, which deploys every push to `main`.

## Project Structure

```text
src/app/              the page, layout, legal pages, sitemap, and robots
src/components/       one folder per component, with its CSS Module next to it
src/data/             projects, process steps, search tabs, Lighthouse scores, contact info, and schema
src/styles/           global tokens, themes, and shared styles
public/projects/      logos and screenshots for each project
```

## Running It Locally

```bash
npm install
npm run dev      # start the dev server at http://localhost:3000
npm run lint     # check the code with ESLint
npm run build    # make a production build
npm start        # serve the production build
```

To refresh the scores in the Proof section, I run Lighthouse against the production build (`npm run build && npm start`) and update `src/data/lighthouse.json` with the new numbers and the date.

## Get in Touch

If you have a project in mind or just want to talk, the contact section on [the site](https://gilmer-perez.vercel.app/#contact) is the best way to reach me. You can also find me on [LinkedIn](https://www.linkedin.com/in/gilmer-perez-a35ba0354/).
