# All Material Export

This folder contains extracted text and media references for these site sections:
- `about` (including `/about` sub-content like people profiles)
- `webinars` (including `/webinars/[id]`)
- `workshops` (including `/workshops/[id]`)
- `news` (including `/news`)

Source locations used in this repo:
- Hardcoded page text: `src/app/about/page.tsx`, `src/app/news/page.tsx`
- People data: `src/server/content/people.json`
- Webinar data seed: `src/server/content/webinars.json`
- Workshop data seed + MDX: `src/server/content/workshops.json` and `public/content/workshops/*.mdx`

Important limitations (repo-only extraction):
- `webinars` and `workshops` index/detail pages load some fields from PostgreSQL via `src/utils/db/postgres.ts` (e.g. `thumbnail_r2_url`, `photo_url`, `schedule_json`).
- When those DB fields are not present in the local seed JSON/MDX, this export records what is available from the seed files and documents what is missing.

