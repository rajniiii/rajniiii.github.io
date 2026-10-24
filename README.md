# rajniiii.github.io

Personal portfolio for Rajanee Shenkar — AI & Data Engineer. Live at
[rajniiii.github.io](https://rajniiii.github.io/).

Next.js App Router, TypeScript, Tailwind CSS v4 and GSAP, exported as a static site and served from
the `gh-pages` branch.

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script              | What it does                                              |
| ------------------- | --------------------------------------------------------- |
| `npm run dev`       | Dev server with fast refresh                               |
| `npm run build`     | Static export to `out/`                                    |
| `npm run start`     | Serves the built `out/` directory locally                  |
| `npm run lint`      | ESLint (`next/core-web-vitals` + `next/typescript`)        |
| `npm run typecheck` | `tsc --noEmit`                                             |
| `npm run deploy`    | Builds, then publishes `out/` to the `gh-pages` branch     |

Node 20.19+, 22.13+ or 24+ is recommended. Next is pinned to 15.x because Next 16 does not support
odd-numbered Node releases such as 23.

## Deploying

GitHub Pages serves this repository from the **`gh-pages` branch** (Settings → Pages), not from
`main`. So:

```bash
npm run deploy     # predeploy runs the build, then gh-pages publishes out/ --dotfiles
```

`public/.nojekyll` is published with the site so GitHub does not strip the `_next/` directory.
`--dotfiles` is what carries that file across. Pushing to `main` updates the source only; the live
site changes when `deploy` runs.

## Where the content lives

All copy is data, not JSX — edit these and the pages follow:

| File                     | Contents                                                     |
| ------------------------ | ------------------------------------------------------------ |
| `src/data/profile.ts`    | Name, headline, contact, résumé path, availability            |
| `src/data/projects.ts`   | Featured case studies and the secondary project list          |
| `src/data/experience.ts` | Roles                                                         |
| `src/data/skills.ts`     | Capability groups                                             |
| `src/data/background.ts` | Degrees, certifications, publication                          |

Adding a featured project to `featuredProjects` creates its case-study route at
`/work/<slug>/` automatically, including metadata and a sitemap entry. Each one needs a `visual`
key pointing at a component in `src/components/work/visuals/`.

Backticks inside content strings render as inline code.

## Structure

```
src/
  app/            layout, home page, /work/[slug] case studies, sitemap, robots, icon
  components/
    hero/ nav/ work/ experience/ skills/ background/ contact/ site/
    motion/       GSAP wrappers (Reveal, TiltPanel, Parallax)
    ui/           primitives and decorative motifs
  data/           all site content, typed
  lib/            utils and motion helpers
public/           résumé PDF, profile images, og.png, .nojekyll
```

## Conventions worth knowing

- **Motion is optional.** Content renders visible in the HTML; GSAP only animates after confirming
  `prefers-reduced-motion` is not set. Pointer effects additionally require a fine pointer, so touch
  devices get static panels.
- **Colour.** Pastels are surfaces; text uses `ink`, `slate` or one of the darker accents
  (`plum`, `forest`, `clay`, `marine`) so contrast holds on ivory.
- **Claims.** Project copy describes only what the linked repository or demo actually contains, and
  each case study ends with a "what this does not claim" section. Keep it that way.

## Social preview

`public/og.png` is a rendered 1200×630 card. To change it, edit the source HTML and re-render with
headless Chrome at that window size.
