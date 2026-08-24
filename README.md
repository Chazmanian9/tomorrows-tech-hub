# Tomorrow's Tech Hub

The landing page and hub for **Tomorrow's Tech** — "Smart Solutions. Better Tomorrow."
Visitors subscribe with their email before the links to Tomorrow's Tech apps
(AI Beginner Guide, Resume Builder, and whatever ships next) are revealed.

## Brand assets used

- **Mascot — welcome**: [`public/images/mascot-welcome.jpg`](public/images/mascot-welcome.jpg)
  — the friendly white/blue rounded robot, used as the hero image before a
  visitor subscribes.
- **Mascot — HQ**: [`public/images/mascot-hq.jpg`](public/images/mascot-hq.jpg)
  — the neon-lit "Tomorrow's Tech HQ" building render, used as a dimmed
  background visual in the footer.
- **Logo mark**: a speech-bubble icon with two dot "eyes," recreated as
  inline SVG (not cropped from the photos) in [`components/logo.tsx`](components/logo.tsx)
  and [`app/icon.svg`](app/icon.svg) (site favicon). It mirrors the mark on
  the mascot's chest badge and the HQ signage.
- **Accent color**: `#00BFFF` (neon blue), defined as the `neon` color scale
  in [`tailwind.config.ts`](tailwind.config.ts).

## Stack

Next.js 14 (App Router) + TypeScript + Tailwind CSS + Supabase, matching the
Chaz Chats setup — deployed on Vercel.

## Getting started

```bash
npm install
cp .env.local.example .env.local   # fill in the Supabase values below
npm run dev
```

## Supabase setup

1. Create a Supabase project.
2. Run [`supabase/schema.sql`](supabase/schema.sql) in the SQL Editor — it
   creates the `subscribers` table (email, created_at) with RLS enabled and
   no public read/insert policy. Inserts only happen server-side via
   `/api/subscribe`, which uses the service-role key.
3. Copy the three keys from Project Settings → API into `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (secret — server-only)

## Environment variables

| Variable | Where it's used | Secret? |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | client + server | No |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | client + server | No (anon key, but this app grants it no table access) |
| `SUPABASE_SERVICE_ROLE_KEY` | `/api/subscribe` only | **Yes** — never expose to the browser |

## Deploying on Vercel

1. Import this repo into Vercel.
2. Add the three environment variables above under Project Settings →
   Environment Variables (Production + Preview).
3. Deploy. No other config needed — `next.config.mjs` is intentionally bare.

## Adding a new app to the hub

Edit [`data/apps.ts`](data/apps.ts) and add an object to the `apps` array:

```ts
{
  name: "New App Name",
  description: "One line describing what it does.",
  href: "https://your-app-url.com",
}
```

The card renders automatically on the unlocked (post-subscribe) screen —
no other changes needed.

## Known placeholders to fill in before launch

- [`data/apps.ts`](data/apps.ts) — `href` for **AI Beginner Guide** and
  **Resume Builder** are placeholders (`example.com`). Replace with the real
  URLs.
- Confirm the exact `#00BFFF` neon-blue accent still matches the brand once
  live, and adjust the `neon` color scale in `tailwind.config.ts` if needed.
