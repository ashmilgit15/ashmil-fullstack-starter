# Full‑Stack Notes (Next.js + Prisma + SQLite)

A minimal full‑stack demo: create notes in the UI, stored in a SQLite database via Prisma.

## Stack
- Next.js (App Router)
- Prisma ORM
- SQLite

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Database
The SQLite DB is stored at `prisma/dev.db` (via `DATABASE_URL` in `.env`).

To reset migrations:
```bash
npx prisma migrate reset
```

## API
- `GET /api/notes` → list notes
- `POST /api/notes` → create note `{ title, content }`

## Deploy
Works on Vercel. For production, switch to Postgres (e.g., Neon/Supabase) and update `DATABASE_URL`.
