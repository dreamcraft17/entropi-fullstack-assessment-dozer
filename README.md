# Link in Bio

Small link-in-bio app (inspired by Linktree / Lynktree) built for the Fullstack Engineer assessment.

I focused on getting the core flows working first (auth, public profile, dashboard), then added some UX polish and the extra Lynktree-style menus as placeholders.

---

## Tech stack

- Next.js 14 (App Router, TypeScript)
- Tailwind CSS
- PostgreSQL (Railway) + Prisma
- Next.js API routes
- JWT auth stored in HTTP-only cookie

---

## What I implemented

### Mapping to the brief

**Must have (core)** from the spec:

- [x] User can register and login  
  → `app/register`, `app/login` + `/api/auth/*` with JWT cookie.
- [x] User can add links (title + URL)  
  → Form in `/dashboard/links` (`LinkForm` component).
- [x] User can edit and delete links  
  → Edit/delete actions on each link card in `/dashboard/links`.
- [x] User can toggle links active/inactive  
  → On/off switch on each link card.
- [x] Public profile page displays user’s links  
  → `/p/[userId]`, only shows active links ordered by `order`.
- [x] Mobile‑responsive design  
  → Public profile and dashboard are built mobile‑first with Tailwind.

**Nice to have (bonus)** from the spec:

- [x] Drag & drop reorder  
  → Implemented with `@dnd-kit` in `/dashboard/links`.
- [x] Click tracking / analytics  
  → `clicks` field on `Link`, incremented on redirect, auto‑refreshed in the dashboard.
- [x] Dark mode  
  → `ThemeToggle` toggles `data-theme` on `<html>`.
- [x] Custom theme colors  
  → `ThemeColorPicker` toggles `data-accent` (terracotta/blue/green/purple).

### Feature summary

- **Auth** – register, login, logout with email/password.
- **Public profile** (`/p/[userId]`) – avatar, name, bio, list of active links, click counter per link.
- **Dashboard shell** (`/dashboard`):
  - Sidebar with Linktree‑style menu (My Linktree, Earn, Tools).
  - Header with “View profile”, “Logout”, and theme controls.
- **Bio Pages editor** (`/dashboard/links`):
  - Full CRUD for links (create/edit/delete/toggle).
  - Reorder via drag & drop or arrow buttons.
  - Edit profile (name, bio, avatar URL).
  - Background refresh for click counts.
- **Audience** (`/dashboard/audience`):
  - Uses the existing `clicks` field to show total clicks, active vs inactive links, and average clicks per link.
  - Simple “Top links by clicks” list so you can see which URLs get the most traction.
- **Insights** (`/dashboard/insights`):
  - Highlights the top‑performing link, a low‑performing link, and how many links still have 0 clicks.
  - Lists zero‑click links so it’s obvious which ones might need to move, be renamed, or be turned off.
- **Other menus** (Shop, Design, Short Links, Files, vCards, Events, Host HTML, QR Codes, Web Tools, Splash Pages, Tracking Pixels, Custom Domains, Projects, Social planner, Instagram auto‑reply, Post ideas) are **UI placeholders** with short notes about possible future work, but no extra backend logic.

---

## Time & process

I built this over **2 days (2026‑02‑03 and 2026‑02‑04)**, roughly:

- Project setup (Next.js, Prisma, DB, auth skeleton): **~2.5 hours**
- Auth + public profile (end‑to‑end): **~3 hours**
- Dashboard (layout, Links editor, drag & drop, click refresh): **~4 hours**
- Extra dashboard menus + copy (including Audience & Insights): **~2–2.5 hours**
- Theming (dark/light, accent picker) + layout tweaks: **~2 hours**
- Small bugfixes + README/docs cleanup: **~1–1.5 hours**

So in total it landed around **14–15 hours** of work.

---

## Live demo / hosting

- **Vercel demo**: `https://entropi-fullstack-assessment-dozer.vercel.app/`

For the bonus “live demo” part of the brief I wired the app to PostgreSQL on **Railway**, then deployed the Next.js app to **Vercel** pointing at the same database.

The intended setup is:

- Create a PostgreSQL instance on Railway.
- Set `DATABASE_URL` in both local `.env` and in the Vercel/Railway service env vars to the given connection string.
- Set `JWT_SECRET` to any long random string.

Once deployed, the flows are the same as locally:

- Open the deployed URL.
- Register an account and go to `/dashboard`.
- Use **View profile** to open the public page.

All deployment‑specific details live in env vars; nothing is hard‑coded for a particular environment.

---

## Setup instructions

All commands are run from the project root.

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Generate Prisma client & sync schema**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

   If the schema changes later (e.g. you add a field on `Link`), run `npx prisma db push` again.

3. **Run dev server**

   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000`:
   - Register a new account.
   - Go to `/dashboard`.
   - Use the **View profile** button in the header to open the public page (`/p/[userId]`).

---

## Environment notes

- `DATABASE_URL` – PostgreSQL connection string (for example the one Railway gives you).
- `JWT_SECRET` – secret used to sign JWTs. If unset, the project falls back to a dev‑only value.
- `.env.local` already contains `NEXT_IGNORE_INCORRECT_LOCKFILE=1` to avoid a Windows/SWC lockfile issue.

---

## Project structure (short)

- `app/` – App Router pages + API routes
  - `app/login`, `app/register` – auth pages
  - `app/dashboard` – dashboard + all sub‑pages
  - `app/p/[userId]` – public profile
  - `app/api/auth/*` – auth API
  - `app/api/links/*` – link CRUD + reorder
  - `app/api/profile/*` – profile API
- `lib/` – Prisma client + auth helpers
- `prisma/schema.prisma` – Prisma models (User, Link)

If you want to judge the implementation quickly, the most representative files are:  
`app/dashboard/links/page.tsx`, `app/dashboard/DashboardContent.tsx`, `app/api/links/*`, and `lib/auth.ts`.
