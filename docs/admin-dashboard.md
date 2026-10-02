# Cyber-DART admin dashboard

The admin dashboard lives at `/admin` and uses Supabase Auth, Postgres row-level
security, and Supabase Storage. Its layout is adapted from TailAdmin's
MIT-licensed Next.js 14 template; see `THIRD_PARTY_NOTICES.md`.

## One-time Supabase setup

1. Open the Supabase SQL editor for the project configured by
   `NEXT_PUBLIC_SUPABASE_URL`.
2. Review and run
   `supabase/migrations/20261002000000_admin_cms.sql`.
   If the project was upgraded from the original Supabase schema, also run
   `supabase/migrations/20261002010000_notebook_category_text.sql` so module
   categories can use the editable labels managed by the CMS, followed by
   `supabase/migrations/20261002020000_workshop_mdx_optional.sql` so structured
   workshop records do not require a legacy MDX file. Run
   `supabase/migrations/20261002030000_content_reordering.sql` to enable the
   atomic ordering controls for modules, workshops, webinars, people, and news.
3. In Supabase Authentication, create or invite the first editor. Disable open
   public sign-ups unless the project deliberately needs them.
4. Bootstrap the first owner in the SQL editor, replacing the email value:

```sql
insert into public.admin_profiles (user_id, display_name, role)
select id, coalesce(raw_user_meta_data ->> 'name', email), 'owner'
from auth.users
where email = 'OWNER_EMAIL@example.edu'
on conflict (user_id) do update set role = 'owner';
```

The migration replaces existing row-level-security policies on the managed
content tables (`notebooks`, `workshops`, `webinars`, and `people`) with the
documented published-read/admin-write policy set. Review any external client
that depends on a custom policy before applying it.

The owner can add additional authenticated users to `admin_profiles` as
`editor` or `owner`. A signed-in account without an admin profile cannot write
content because every mutation is protected by RLS.

## Environment

The existing variables are sufficient:

```text
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

Do not add the Supabase service-role key to this application. Admin browser
requests intentionally use the anon key plus the signed-in user's session and
are authorized by RLS.

## Local verification

```bash
pnpm dev
```

Open `http://localhost:3000/admin/login`, sign in with the invited account, and
verify that the dashboard counts match the public content tables.

## Import the current repository content

After the migration and first owner are in place, open the admin overview and
choose **Import repository content**. The authenticated import copies the
newer local modules, workshops, advisory profiles, and featured news item into
Supabase. It is safe to run again: stable slugs update matching records instead
of creating another copy. A repeat import deliberately reapplies repository
values and publishes those records again, so use it for initial setup or
recovery rather than after routine editorial changes. If one collection fails,
the overview reports that collection; correct the record and run the import
again.

## Content behavior

- Existing notebooks, workshops, webinars, and people remain published when
  the migration is applied.
- New records default to `draft` in the expanded schema.
- Public tables expose only published records to anonymous users.
- Every insert, update, and delete creates a row in `content_revisions`.
- Modules, workshops, webinars, people, and news can be reordered from their
  admin list. Featured items remain ahead of regular items, and workshops stay
  grouped into upcoming and completed sections.
- The media library stores new images, HTML, PDFs, text, and ZIP files in the
  public `cybertraining-media` bucket. Public files can be opened by URL, while
  the media catalog and uploader identity are visible only to admins. Existing
  R2 URLs remain valid and do not need to be moved.
- Image fields accept root-relative project paths and the R2, Wix, and Supabase
  hosts configured for Next Image. Upload images through the media library when
  the source host is not already approved.
- Local TypeScript content remains a public fallback until the repository
  import completes. The import writes a cutover marker; after that, Supabase is
  authoritative, so an archived or deleted local item does not reappear from
  the fallback.
- Primary navigation, footer links, copyright text, and NSF award numbers are
  editable as JSON records under **Site settings**. Use `{year}` in the footer
  copyright value to insert the current year automatically.
- Learning-module records can change titles, metadata, cover art, source links,
  and the uploaded HTML or PDF URL. Editing notebook cells or application source
  code remains a Git workflow.

## Publishing checklist

1. Upload or select media and copy its public URL.
2. Create or edit the content record.
3. Keep the record as `draft` while reviewing it in the admin form.
4. Set the record to `published` after review.
5. Open the public preview link from the editor and verify the public page.

Application releases still follow `docs/cloudflare-deployment.md`. Routine
content updates are written to Supabase and do not require a Git deployment.
