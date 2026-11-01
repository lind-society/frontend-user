# Lind Society — Guest Website

The public website guests use to browse villas, properties and tourist
activities, and to book and pay for a stay.

Built with React 19, Vite, React Router, TanStack Query, Tailwind CSS and
`use-intl` (Indonesian / English).

## Getting started

```bash
cp .env.example .env.local   # point VITE_API_BASE_URL at the backend
pnpm install
pnpm dev                     # http://localhost:4780
```

| Script           | What it does                    |
| ---------------- | ------------------------------- |
| `pnpm dev`       | Dev server with hot reload      |
| `pnpm build`     | Type-check and build to `dist/` |
| `pnpm preview`   | Serve the production build      |
| `pnpm lint`      | ESLint                          |
| `pnpm typecheck` | TypeScript                      |
| `pnpm format`    | Prettier                        |

## Environment

| Variable            | Description                                           |
| ------------------- | ----------------------------------------------------- |
| `VITE_API_BASE_URL` | Backend API base, e.g. `http://localhost:4782/api/v1` |

| `VITE_CONCIERGE_WHATSAPP` | WhatsApp number of the concierge team (digits, with country code) |

`VITE_*` values are inlined at build time, so changing one needs a rebuild.

## Project layout

```
src/
  routes/       URL → page mapping, layouts, error and 404 pages
  modules/      One folder per page (landing-page, rent, buy, …)
  components/   Shared UI (shadcn/Radix primitives in components/ui)
  hooks/api/    TanStack Query hooks for the backend
  i18n/         Locale provider; messages live in /messages
  lib/          API client, mappers, helpers
```

## Docker

`Dockerfile` builds the site and serves it with nginx on port 80.
`docker-compose.prod.yml` is what the VPS deploy runs; the whole Lind Society
stack can be started locally from the repository root (`docker compose up`).
