# ScopeGuard

Full-stack ScopeGuard application scaffold.

## Backend

- Navigate to `ScopeGuard/server`
- Copy `.env.example` to `.env`
- Install dependencies: `npm install`
- Run Prisma generate: `npm run prisma:generate`
- Start server: `npm run dev`

## Frontend

- Navigate to `ScopeGuard/client`
- Install dependencies: `npm install`
- Start dev server: `npm run dev`

## Notes

Use PostgreSQL and set `DATABASE_URL` before running. The backend includes scope detection for work logs, invoice generation, PDF export, and overdue reminders.
