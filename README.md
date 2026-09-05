# Hot Stuff Stoves — website (v1)

A production-ready marketing site for Hot Stuff Stoves, a HETAS and Gas
Safe registered stove installer in Hoylake, Wirral. This v1 is scoped to
the Esse stove range only, and is enquiry-only — there is no e-commerce
or online payment anywhere on the site.

Built with Next.js (App Router) + TypeScript + Tailwind CSS. Deploy target
is Vercel.

## What's real vs. placeholder

Read this before anything goes live. Nothing below is hidden in code —
each item is flagged at the point it's defined (component or data file),
but it's collected here so it can't be missed.

| Area | Status | Where | What to do before launch |
|---|---|---|---|
| Business details (address, phone, email) | **Real** | `src/lib/content/site.ts` | — |
| Esse product copy & specs | **Real**, supplied by the client | `src/lib/content/stoves.ts` | — |
| Chimney services copy | **Drafted from the client's brief**, not a verbatim existing page | `src/lib/content/chimney-services.ts` | Have the client sign off on wording |
| **Product photography** | **Placeholder** — generated illustrations, not real photos | `public/images/stoves/*.jpg` | Replace each file with the real product photo, keeping the exact same filename (see below) |
| **Customer reviews** | **Placeholder** — fake quotes for layout only | `src/lib/content/testimonials.ts` | Replace the entire array with real, genuinely solicited customer reviews. Each entry is flagged `isPlaceholder: true`, and the reviews section renders a visible "placeholder" banner as long as any entry has that flag set. |
| **Brochure embed** | **Not built** — styled "coming soon" placeholder only | `src/components/BrochureTeaser.tsx` | Once brochure PDFs are supplied, wire up a FlippingBook or Publitas embed. See the `TODO(brochure)` comment in that file. |
| Contact form delivery | **Real code, needs your own Resend account** | `src/app/api/contact/route.ts` | Set `RESEND_API_KEY` (see below) |

**Do not ship the placeholder reviews or brochure section as if they were
real** — in commit messages, in a demo to the client, or in production
copy. They exist purely so the layout could be designed and built against
real-shaped data.

### Product photography — why it's a placeholder

The brief asked for real photos pulled from
`https://www.hotstuffstoves.com/assets/cards/`, reusing the live site's
filenames so a swap-in later is trivial. The environment this was built in
could not reach that domain (outbound network here is restricted to an
allowlist of package registries), so `scripts/make-placeholder-images.py`
generated on-brand placeholder illustrations under the **exact same
filenames** the live site uses:

- `esseonesemultifuel-one.jpg`
- `esse500vistase-one.jpg`
- `esse525se-one.jpg`
- `esse700-one.jpg`

To finish this: download the real photos from the live site's
`/assets/cards/` folder and overwrite the files of the same name in
`public/images/stoves/`. No code changes needed — `src/lib/content/stoves.ts`
already points at those paths.

## Content model (for the future CMS swap)

Content is defined as typed objects in `src/lib/content/*.ts`, against
interfaces in `src/lib/types.ts` (`Stove`, `Testimonial`,
`ChimneyService`, `SiteInfo`). Nothing is hardcoded into JSX. When this
moves to a headless CMS (Sanity was mentioned as the likely candidate),
the swap is: replace the contents of `src/lib/content/*.ts` with fetch
calls against the CMS's client, keeping the same exported shapes
(`stoves`, `testimonials`, `chimneyServices`, `siteInfo`) and the
existing types. No component should need to change.

## Contact form / Resend setup

The form at `/contact` posts to `POST /api/contact`
(`src/app/api/contact/route.ts`), which sends the enquiry by email via
[Resend](https://resend.com).

1. Create a Resend account and an API key.
2. Set `RESEND_API_KEY` as an environment variable (locally in `.env.local`,
   and in the Vercel project's Environment Variables for production).
3. **Verify `hotstuffstoves.com` as a sending domain in Resend.** Until
   that's done, the route falls back to Resend's shared test sender
   (`onboarding@resend.dev`), which Resend only reliably delivers to the
   Resend account's own owner address — fine for testing, not for
   production. Once the domain is verified, set `CONTACT_FROM_EMAIL` to
   something like `"Hot Stuff Stoves <enquiries@hotstuffstoves.com>"`.
4. Enquiries are sent to `kate@hotstuffstoves.com` by default
   (`CONTACT_TO_EMAIL` env var overrides this).

See `.env.example` for all of the above in one place. The form has a
hidden honeypot field and basic server-side validation; it degrades to a
clear on-page error (not a silent failure) if `RESEND_API_KEY` is missing
or Resend errors out.

## Local development

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

Fonts (Fraunces, IBM Plex Sans) load via `next/font/google`, which fetches
from Google Fonts at build time. If you're building somewhere with
restricted outbound network access, that fetch will fail — it works
normally on Vercel and on an unrestricted connection.

## Design system

Dark, warm, fire/smoke palette — defined as CSS custom properties in
`src/app/globals.css` and exposed to Tailwind v4 via `@theme inline`:

- `--charcoal-ink` / `--charcoal-ink-2` — backgrounds
- `--ember-red` / `--ember-red-bright` — primary accent
- `--flame-gold` — secondary accent, focus states
- `--ash-cream` — body text
- `--smoke-grey` / `--oak-brown` — supporting neutrals

Display type is Fraunces (serif), body type is IBM Plex Sans. Sections
are flat, divided by 1px hairlines (no cards/shadows). Product listings
use an alternating editorial layout (`src/components/StoveListing.tsx`),
not a repeated card grid.

### Hero animation

The homepage hero (`src/components/Hero.tsx` +
`src/components/Hero.module.css`) has a signature animated moment: drifting
embers, rising smoke wisps, and a flickering flame glow, built with CSS
keyframes on `transform`/`opacity` only (GPU-friendly, no layout
thrashing). All motion on the site — this included — is disabled under
`prefers-reduced-motion: reduce` via the global rule in `globals.css`. No
other section uses scroll-triggered animation; everything else is
hover-state only, by design.

*Note: this was built from the design brief's written spec rather than
from a reference HTML/CSS prototype, since the prototype wasn't provided
during the build. If you have that prototype file, it's a straightforward
swap — replace the keyframes/markup in `Hero.tsx` and `Hero.module.css`
with the prototype's values.*

## Accessibility & responsiveness

- Fully responsive from mobile up (mobile nav is a native `<details>`
  disclosure — no JS framework needed for it).
- Visible keyboard focus states site-wide via a global `:focus-visible`
  rule (gold outline), not just on links/buttons.
- A skip-to-content link is the first focusable element on every page.
- Motion respects `prefers-reduced-motion`.
- Semantic landmarks (`header`, `nav`, `main`, `footer`, `address`) and
  descriptive alt text throughout.

## Project structure

```
src/
  app/                  Routes (App Router): /, /stoves, /chimney-services, /contact, /api/contact
  components/           Shared UI
  lib/
    types.ts            Content type definitions
    content/             Typed content data (stoves, testimonials, chimney services, site info)
public/
  images/stoves/         Product images (see placeholder note above)
scripts/
  make-placeholder-images.py   Regenerates the placeholder product images
```

## Deployment

1. Push this repository to GitHub.
2. Import it into Vercel (framework preset: Next.js — auto-detected).
3. Set `RESEND_API_KEY` (and optionally `CONTACT_TO_EMAIL` /
   `CONTACT_FROM_EMAIL`) in the Vercel project's Environment Variables.
4. Deploy. No other configuration is required.
