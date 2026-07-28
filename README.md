# City of Thunder Fencing Club

Website rebuild for [City of Thunder Fencing Club](https://cityofthunder.com), Oklahoma City. Built to the PRD in `city-of-thunder-fencing-website-prd.md` (v1.2).

## Stack

- **Next.js** (App Router) + React 19
- **TypeScript**
- **Tailwind CSS v4** — with the default palette turned off; only the design-system tokens declared in `app/globals.css` are available.
- **GSAP + ScrollTrigger** — hero scrub and section reveals.
- Self-hosted **Archivo**, **Newsreader** and **Roboto Mono** via `next/font`.

## Getting started

```bash
npm install
npm run dev
```

Dev server on <http://localhost:3210>.

## Structure

```
app/                        — routes
  page.tsx                  — home
  lessons/                  — the four things the club sells
  book/                     — booking flow
  api/enquiry/              — form receiver (email + sheet — phase 0 TODO)
components/
  Hero.tsx                  — Movement 1 · frame-sequence scroll hero
  ReviewWall.tsx            — Movement 5 · two counter-drifting rows
  home/                     — the rest of the movements
content/                    — typed content files (schedule, pricing, coaches, reviews, lessons, media)
lib/                        — small helpers (open-now, filters)
public/
  frames/                   — the hero's 61 preloaded WebP frames
  video/                    — full-length source clips + posters
  club/                     — Instagram photography, renamed per PRD §9.5
```

## Design system

Design tokens and the motion system live in `app/globals.css`. Every band on the home page uses the shared `.band`, `.band__rule` and `.band__index` classes so the section boundaries read as one system.

## Content

Everything the site displays is data-driven from `content/`. Pricing, schedule, coach records and lessons can be updated without touching a component.

**Reviews are hardcoded** in `content/reviews.ts` per PRD §10.5. Refresh policy: every six months, open the club's Google Business Profile, check the rating and count, update the file, bump `lastVerified`.

## Media

- **Hero** — Kling 3.0 generated clip, extracted to a 61-frame WebP sequence at 800px wide (~1.4 MB total), driven by canvas + scroll progress.
- **Club photography** — 8 curated shots from [@thunderfencing](https://www.instagram.com/thunderfencing/) on Instagram, saved as `CLUB-01…08.webp`.
- **Coaching video, room clip** — placeholder Kling clips. Real footage from the half-day shoot described in PRD §9.4 drops into the same slots.

## Deployment

Static-generation-friendly. Deploy to Vercel:

```bash
npm run build
```
