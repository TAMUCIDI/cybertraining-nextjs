# Live DB Export (Webinars/Workshops)

This folder is intended to hold JSON snapshots copied from PostgreSQL (the same data the live pages use via `src/utils/db/postgres.ts`).

At the moment, the export could not run because the local PostgreSQL connection failed authentication for user `postgres`. See `status.json`.

Temporary fallback:
- `webinars-seed.json` and `workshops-seed.json` contain the repo seed JSON data from `src/server/content/`.

Once you provide working PostgreSQL credentials (see `status.json`), I can re-run the export to include fields like:
- `thumbnail_r2_url` (webinars)
- `photo_url` and `schedule_json` (workshops)

