# Requirements Checklist

**Referensi utama: "What to Build" dari spesifikasi.** Semua halaman dan fitur di bawah ini mengikuti daftar itu; tidak ada menu atau fitur di luar spec.

---

## What to Build

### 1. Public Profile Page (Mobile-First) — Shareable page

| Requirement | Status | Implementasi |
|-------------|--------|--------------|
| User avatar & bio | ✅ | `/p/[userId]` menampilkan avatar (atau inisial), nama, dan bio dari DB |
| List of clickable links | ✅ | Daftar link aktif; setiap item link ke URL eksternal (`target="_blank"`) |
| Clean, modern design | ✅ | Tema warm editorial (Fraunces, DM Sans), kartu link, pola subtle |
| Mobile-first | ✅ | Layout responsif, `max-w-md`, padding & typography untuk mobile |

### 2. Admin Dashboard — Simple dashboard to manage

| Requirement | Status | Implementasi |
|-------------|--------|--------------|
| Add links (title + URL) | ✅ | Tombol "+ Add", `LinkForm`, POST `/api/links` |
| Edit links | ✅ | Ikon edit di kartu link → `LinkForm` + PATCH `/api/links/[id]` |
| Delete links | ✅ | Ikon hapus + konfirmasi, DELETE `/api/links/[id]` |
| Toggle links on/off | ✅ | `LinkToggle` (hijau = aktif); PATCH untuk field `active` |
| Reorder links | ✅ | Tombol naik/turun; PATCH `/api/links/reorder` dengan array `ids` |
| Edit profile (name, bio, avatar URL) | ✅ | Klik preview profil → `ProfileForm`; PATCH `/api/profile` |

*Catatan: Reorder pakai tombol ↑/↓. Drag & drop masuk "Nice to Have".*

### 3. Backend API

| Requirement | Status | Implementasi |
|-------------|--------|--------------|
| CRUD operations for links | ✅ | GET/POST `/api/links`, PATCH/DELETE `/api/links/[id]`, PATCH `/api/links/reorder` |
| Profile management | ✅ | PATCH `/api/profile`, GET `/api/profile/[userId]` (profil publik) |
| Basic authentication (login/register) | ✅ | POST `/api/auth/register`, POST `/api/auth/login`, logout; JWT di cookie |

---

## Tech Stack

| Layer | Spec | Status | Implementasi |
|-------|------|--------|---------------|
| Frontend | Next.js 14+ (App Router) | ✅ | App Router, `app/` structure |
| Styling | Tailwind CSS or custom CSS | ✅ | Tailwind + CSS variables (theme) |
| Backend | Next.js API Routes | ✅ | `app/api/` routes |
| Database | PostgreSQL + Prisma (or SQLite) | ✅ | SQLite + Prisma |
| Auth | NextAuth.js or simple JWT | ✅ | Simple JWT (`jose`) + httpOnly cookie |

---

## Must Have (Core)

| # | Requirement | Status |
|---|-------------|--------|
| 1 | User can register and login | ✅ |
| 2 | User can add links (title + URL) | ✅ |
| 3 | User can edit and delete links | ✅ |
| 4 | User can toggle links active/inactive | ✅ |
| 5 | Public profile page displays user's links | ✅ |
| 6 | Mobile-responsive design | ✅ |

**Core: 6/6 ✅**

---

## Nice to Have (Bonus)

| # | Requirement | Status |
|---|-------------|--------|
| 1 | Drag & drop reorder | ✅ | @dnd-kit: drag handle ⋮⋮ + tombol naik/turun |
| 2 | Click tracking/analytics | ✅ | Kolom `clicks` di DB; redirect `/l/[id]`; tampil di dashboard |
| 3 | Dark mode | ✅ | Theme toggle, `data-theme`, CSS variables |
| 4 | Custom theme colors | ✅ | 4 preset: Terracotta, Blue, Green, Purple (ThemeColorPicker) |

**Bonus: 4/4**

---

## Ringkasan

- **Shareable page:** Sesuai (avatar, bio, link bisa diklik, desain bersih, mobile-first).
- **Admin dashboard:** Sesuai (tambah/edit/hapus link, toggle aktif, reorder, edit profil).
- **Backend API:** Sesuai (CRUD link, profil, auth).
- **Tech stack:** Sesuai (Next.js 14+ App Router, Tailwind, API Routes, SQLite + Prisma, JWT).
- **Must Have (Core):** Semua 6 poin terpenuhi.
- **Nice to Have:** Hanya dark mode yang ada; drag & drop reorder, click tracking, dan custom theme colors belum.

**Kesimpulan: Web sudah sesuai dengan requirements inti dan semua Nice to Have (drag & drop, click tracking, dark mode, custom theme colors).**
