-- Cyber-DART whole-site CMS schema and security policies.
-- Review and apply this file in the Supabase SQL editor before enabling /admin.

create extension if not exists pgcrypto;

create table if not exists public.admin_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role text not null default 'editor' check (role in ('owner', 'editor')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.is_cybertraining_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_profiles
    where user_id = auth.uid()
      and role in ('owner', 'editor')
  );
$$;

revoke all on function public.is_cybertraining_admin() from public;
grant execute on function public.is_cybertraining_admin() to anon, authenticated;

create or replace function public.is_cybertraining_owner()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_profiles
    where user_id = auth.uid()
      and role = 'owner'
  );
$$;

revoke all on function public.is_cybertraining_owner() from public;
grant execute on function public.is_cybertraining_owner() to authenticated;

alter table public.notebooks
  add column if not exists slug text,
  add column if not exists description text,
  add column if not exists source_url text,
  add column if not exists status text not null default 'published',
  add column if not exists featured boolean not null default false,
  add column if not exists display_order integer not null default 0,
  add column if not exists published_at timestamptz;

alter table public.workshops
  add column if not exists slug text,
  add column if not exists end_date date,
  add column if not exists photo_alt text,
  add column if not exists image_fit text not null default 'cover',
  add column if not exists resources_json jsonb,
  add column if not exists gallery_json jsonb,
  add column if not exists biographies_json jsonb,
  add column if not exists registration_json jsonb,
  add column if not exists status text not null default 'published',
  add column if not exists featured boolean not null default false,
  add column if not exists display_order integer not null default 0,
  add column if not exists published_at timestamptz;

alter table public.webinars
  add column if not exists slug text,
  add column if not exists status text not null default 'published',
  add column if not exists featured boolean not null default false,
  add column if not exists display_order integer not null default 0,
  add column if not exists published_at timestamptz;

alter table public.people
  add column if not exists slug text,
  add column if not exists display_role text,
  add column if not exists profile_url text,
  add column if not exists visible_on_about boolean not null default true,
  add column if not exists display_order integer not null default 0,
  add column if not exists status text not null default 'published';

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'notebooks_status_check') then
    alter table public.notebooks add constraint notebooks_status_check check (status in ('draft', 'published', 'archived'));
  end if;
  if not exists (select 1 from pg_constraint where conname = 'workshops_status_check') then
    alter table public.workshops add constraint workshops_status_check check (status in ('draft', 'published', 'archived'));
  end if;
  if not exists (select 1 from pg_constraint where conname = 'webinars_status_check') then
    alter table public.webinars add constraint webinars_status_check check (status in ('draft', 'published', 'archived'));
  end if;
  if not exists (select 1 from pg_constraint where conname = 'people_status_check') then
    alter table public.people add constraint people_status_check check (status in ('draft', 'published', 'archived'));
  end if;
  if not exists (select 1 from pg_constraint where conname = 'workshops_image_fit_check') then
    alter table public.workshops add constraint workshops_image_fit_check check (image_fit in ('cover', 'contain'));
  end if;
end $$;

with slug_source as (
  select id, coalesce(nullif(trim(both '-' from regexp_replace(lower(title), '[^a-z0-9]+', '-', 'g')), ''), 'module') as base_slug
  from public.notebooks
  where slug is null
), ranked as (
  select id, base_slug, row_number() over (partition by base_slug order by id::text) as duplicate_number
  from slug_source
)
update public.notebooks as target
set slug = case
  when ranked.duplicate_number = 1 and not exists (select 1 from public.notebooks where slug = ranked.base_slug)
    then ranked.base_slug
  else ranked.base_slug || '-' || left(md5(ranked.id::text), 8)
end
from ranked
where target.id = ranked.id;

with slug_source as (
  select id, coalesce(nullif(trim(both '-' from regexp_replace(lower(title), '[^a-z0-9]+', '-', 'g')), ''), 'workshop') as base_slug
  from public.workshops
  where slug is null
), ranked as (
  select id, base_slug, row_number() over (partition by base_slug order by id::text) as duplicate_number
  from slug_source
)
update public.workshops as target
set slug = case
  when ranked.duplicate_number = 1 and not exists (select 1 from public.workshops where slug = ranked.base_slug)
    then ranked.base_slug
  else ranked.base_slug || '-' || left(md5(ranked.id::text), 8)
end
from ranked
where target.id = ranked.id;

with slug_source as (
  select id, coalesce(nullif(trim(both '-' from regexp_replace(lower(title), '[^a-z0-9]+', '-', 'g')), ''), 'webinar') as base_slug
  from public.webinars
  where slug is null
), ranked as (
  select id, base_slug, row_number() over (partition by base_slug order by id::text) as duplicate_number
  from slug_source
)
update public.webinars as target
set slug = case
  when ranked.duplicate_number = 1 and not exists (select 1 from public.webinars where slug = ranked.base_slug)
    then ranked.base_slug
  else ranked.base_slug || '-' || left(md5(ranked.id::text), 8)
end
from ranked
where target.id = ranked.id;

with slug_source as (
  select id, coalesce(nullif(trim(both '-' from regexp_replace(lower(name), '[^a-z0-9]+', '-', 'g')), ''), 'person') as base_slug
  from public.people
  where slug is null
), ranked as (
  select id, base_slug, row_number() over (partition by base_slug order by id::text) as duplicate_number
  from slug_source
)
update public.people as target
set slug = case
  when ranked.duplicate_number = 1 and not exists (select 1 from public.people where slug = ranked.base_slug)
    then ranked.base_slug
  else ranked.base_slug || '-' || left(md5(ranked.id::text), 8)
end
from ranked
where target.id = ranked.id;

create unique index if not exists notebooks_slug_key on public.notebooks(slug);
create unique index if not exists workshops_slug_key on public.workshops(slug);
create unique index if not exists webinars_slug_key on public.webinars(slug);
create unique index if not exists people_slug_key on public.people(slug);

update public.notebooks set published_at = coalesce(updated_at, created_at, now()) where status = 'published' and published_at is null;
update public.workshops set published_at = coalesce(updated_at, created_at, now()) where status = 'published' and published_at is null;
update public.webinars set published_at = coalesce(updated_at, created_at, now()) where status = 'published' and published_at is null;

alter table public.notebooks alter column status set default 'draft';
alter table public.workshops alter column status set default 'draft';
alter table public.webinars alter column status set default 'draft';
alter table public.people alter column status set default 'draft';

update public.people
set visible_on_about = false
where name = 'Xiao Li'
  and visible_on_about is distinct from false;

update public.people
set display_order = -100
where name = 'Michael Goodchild'
  and display_order is distinct from -100;

create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  title text not null,
  slug text not null unique,
  excerpt text,
  body text,
  date date,
  image_url text,
  image_alt text,
  related_workshop_id uuid references public.workshops(id) on delete set null,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  featured boolean not null default false,
  display_order integer not null default 0,
  published_at timestamptz
);

create table if not exists public.pages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  page_key text not null unique,
  title text not null,
  eyebrow text,
  heading text,
  summary text,
  body text,
  image_url text,
  image_alt text,
  cta_label text,
  cta_url text,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  published_at timestamptz
);

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  key text not null unique,
  label text not null,
  value_json jsonb not null default '{}'::jsonb,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived'))
);

create table if not exists public.media (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  title text not null,
  alt_text text,
  bucket text not null default 'cybertraining-media',
  storage_path text not null unique,
  public_url text not null,
  mime_type text,
  size_bytes bigint,
  uploaded_by uuid references auth.users(id) on delete set null
);

create table if not exists public.content_revisions (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  table_name text not null,
  record_id text not null,
  operation text not null check (operation in ('INSERT', 'UPDATE', 'DELETE')),
  changed_by uuid references auth.users(id) on delete set null,
  before_data jsonb,
  after_data jsonb
);

insert into public.pages (page_key, title, eyebrow, heading, summary, body, image_url, image_alt, status, published_at)
values
  ('home', 'Homepage hero', null, 'An International Cyberinfrastructure-Powered GeoAI Network for Disaster Assessment, Reduction, and Training', 'Funded by NSF award numbers', null, null, null, 'published', now()),
  ('about', 'About page', 'Our mission', 'Building cyberinfrastructure capacity for disaster management', null, E'Disasters are global challenges that can threaten multiple communities at once. Across mitigation, preparedness, response, and recovery, geospatial big data and advanced computing can help researchers build clearer vulnerability assessments and timely situational awareness.\n\nAdvanced cyberinfrastructure resources are increasingly available, yet awareness, access, and technical readiness remain real barriers. Researchers may not know which resources exist or how those capabilities can support work in their own fields.\n\nCyber-DART brings together students, scientists, faculty, cyberinfrastructure contributors, and users. Through practical training in advanced computing, geospatial analytics, and GeoAI, the project helps participants develop the skills needed to observe, analyze, and manage disaster events.', '/images/ctdm_about.png', 'Cyber-DART GeoAI network diagram', 'published', now()),
  ('modules', 'Modules landing page', 'Learn by doing', 'CyberTraining modules', 'Open practical tutorials for cyberinfrastructure, geospatial analytics, disaster data, and GeoAI.', null, null, null, 'published', now()),
  ('workshops', 'Workshops landing page', 'Training in action', 'Workshops and activities', 'Explore completed CyberTraining programs, event materials, and upcoming opportunities to learn with the project team.', null, null, null, 'published', now()),
  ('webinars', 'Webinars landing page', 'Shared expertise', 'CyberTraining webinars', 'Hear from researchers and practitioners working across cyberinfrastructure, geospatial science, GeoAI, and disaster management.', null, null, null, 'published', now()),
  ('news', 'News landing page', 'Project updates', 'Cyber-DART news', 'Follow new training opportunities, project milestones, and stories from the Cyber-DART network.', null, null, null, 'published', now())
on conflict (page_key) do nothing;

insert into public.site_settings (key, label, value_json, status)
values
  ('nsf_awards', 'NSF award numbers', '{"awards":["2321069","2519476","2321070","2519477"]}'::jsonb, 'published'),
  ('navigation', 'Primary navigation', '{"items":[{"href":"/about","label":"About"},{"href":"/notebooks","label":"Modules"},{"href":"/workshops","label":"Workshops"},{"href":"/webinars","label":"Webinars"},{"href":"/news","label":"News"}]}'::jsonb, 'published'),
  ('footer', 'Footer content', '{"copyright":"Copyright © {year} Cyber-DART. All rights reserved.","resource_links":[{"href":"/notebooks","label":"Modules"},{"href":"/workshops","label":"Workshops"},{"href":"/webinars","label":"Webinars"}],"organization_links":[{"href":"/about","label":"About us"},{"href":"/news","label":"News"}]}'::jsonb, 'published')
on conflict (key) do nothing;

create or replace function public.set_cms_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.record_cms_revision()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  old_data jsonb;
  new_data jsonb;
  revision_record_id text;
begin
  old_data := case when tg_op in ('UPDATE', 'DELETE') then to_jsonb(old) else null end;
  new_data := case when tg_op in ('INSERT', 'UPDATE') then to_jsonb(new) else null end;
  revision_record_id := coalesce(new_data ->> 'id', old_data ->> 'id', new_data ->> 'key', old_data ->> 'key');

  insert into public.content_revisions(table_name, record_id, operation, changed_by, before_data, after_data)
  values (tg_table_name, revision_record_id, tg_op, auth.uid(), old_data, new_data);

  if tg_op = 'DELETE' then
    return old;
  end if;
  return new;
end;
$$;

do $$
declare
  table_name text;
begin
  foreach table_name in array array['notebooks', 'workshops', 'webinars', 'people', 'news', 'pages', 'site_settings', 'media']
  loop
    execute format('drop trigger if exists %I on public.%I', 'cms_updated_at_' || table_name, table_name);
    execute format('create trigger %I before update on public.%I for each row execute function public.set_cms_updated_at()', 'cms_updated_at_' || table_name, table_name);
    execute format('drop trigger if exists %I on public.%I', 'cms_revision_' || table_name, table_name);
    execute format('create trigger %I after insert or update or delete on public.%I for each row execute function public.record_cms_revision()', 'cms_revision_' || table_name, table_name);
  end loop;
end $$;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'cybertraining-media',
  'cybertraining-media',
  true,
  52428800,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'application/pdf', 'text/html', 'text/plain', 'application/zip']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

do $$
declare
  cms_table text;
  policy_name text;
begin
  foreach cms_table in array array['notebooks', 'workshops', 'webinars', 'people', 'news', 'pages', 'site_settings', 'media', 'content_revisions']
  loop
    execute format('alter table public.%I enable row level security', cms_table);
    for policy_name in select polname from pg_policy where polrelid = format('public.%I', cms_table)::regclass
    loop
      execute format('drop policy if exists %I on public.%I', policy_name, cms_table);
    end loop;
  end loop;
end $$;

alter table public.admin_profiles enable row level security;

drop policy if exists "admins read own profile" on public.admin_profiles;
drop policy if exists "owners manage admin profiles" on public.admin_profiles;

create policy "admins read own profile"
on public.admin_profiles for select
to authenticated
using (user_id = auth.uid() or public.is_cybertraining_admin());

create policy "owners manage admin profiles"
on public.admin_profiles for all
to authenticated
using (public.is_cybertraining_owner())
with check (public.is_cybertraining_owner());

create policy "public reads published notebooks" on public.notebooks for select to anon, authenticated using (status = 'published' or public.is_cybertraining_admin());
create policy "admins manage notebooks" on public.notebooks for all to authenticated using (public.is_cybertraining_admin()) with check (public.is_cybertraining_admin());
create policy "public reads published workshops" on public.workshops for select to anon, authenticated using (status = 'published' or public.is_cybertraining_admin());
create policy "admins manage workshops" on public.workshops for all to authenticated using (public.is_cybertraining_admin()) with check (public.is_cybertraining_admin());
create policy "public reads published webinars" on public.webinars for select to anon, authenticated using (status = 'published' or public.is_cybertraining_admin());
create policy "admins manage webinars" on public.webinars for all to authenticated using (public.is_cybertraining_admin()) with check (public.is_cybertraining_admin());
create policy "public reads published people" on public.people for select to anon, authenticated using (status = 'published' or public.is_cybertraining_admin());
create policy "admins manage people" on public.people for all to authenticated using (public.is_cybertraining_admin()) with check (public.is_cybertraining_admin());
create policy "public reads published news" on public.news for select to anon, authenticated using (status = 'published' or public.is_cybertraining_admin());
create policy "admins manage news" on public.news for all to authenticated using (public.is_cybertraining_admin()) with check (public.is_cybertraining_admin());
create policy "public reads published pages" on public.pages for select to anon, authenticated using (status = 'published' or public.is_cybertraining_admin());
create policy "admins manage pages" on public.pages for all to authenticated using (public.is_cybertraining_admin()) with check (public.is_cybertraining_admin());
create policy "public reads published site settings" on public.site_settings for select to anon, authenticated using (status = 'published' or public.is_cybertraining_admin());
create policy "admins manage site settings" on public.site_settings for all to authenticated using (public.is_cybertraining_admin()) with check (public.is_cybertraining_admin());
create policy "admins manage media metadata" on public.media for all to authenticated using (public.is_cybertraining_admin()) with check (public.is_cybertraining_admin());
create policy "admins read revisions" on public.content_revisions for select to authenticated using (public.is_cybertraining_admin());

drop policy if exists "public reads cybertraining media" on storage.objects;
drop policy if exists "admins upload cybertraining media" on storage.objects;
drop policy if exists "admins update cybertraining media" on storage.objects;
drop policy if exists "admins delete cybertraining media" on storage.objects;

create policy "public reads cybertraining media"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'cybertraining-media');

create policy "admins upload cybertraining media"
on storage.objects for insert
to authenticated
with check (bucket_id = 'cybertraining-media' and public.is_cybertraining_admin());

create policy "admins update cybertraining media"
on storage.objects for update
to authenticated
using (bucket_id = 'cybertraining-media' and public.is_cybertraining_admin())
with check (bucket_id = 'cybertraining-media' and public.is_cybertraining_admin());

create policy "admins delete cybertraining media"
on storage.objects for delete
to authenticated
using (bucket_id = 'cybertraining-media' and public.is_cybertraining_admin());

revoke all on public.media from anon;
grant select on public.notebooks, public.workshops, public.webinars, public.people, public.news, public.pages, public.site_settings to anon;
grant select, insert, update, delete on public.notebooks, public.workshops, public.webinars, public.people, public.news, public.pages, public.site_settings, public.media to authenticated;
grant select on public.content_revisions, public.admin_profiles to authenticated;
grant insert, update, delete on public.admin_profiles to authenticated;
grant usage, select on sequence public.content_revisions_id_seq to authenticated;
