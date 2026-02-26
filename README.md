# Full‑Stack Notes (Next.js + Prisma + SQLite)

A minimal full‑stack demo: create notes in the UI, stored in a SQLite database via Prisma.

## Stack
- Next.js (App Router)
- In-memory store (no database required)

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Database
Notes are stored in memory for this demo (no DB required).

## API
- `GET /api/notes` → list notes
- `POST /api/notes` → create note `{ title, content }`

## Deploy
Works on Vercel. For production, switch to Postgres (e.g., Neon/Supabase) and update `DATABASE_URL`.
