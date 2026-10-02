-- The original notebooks schema restricted category values through a lookup
-- foreign key. The CMS stores category as an editable display label, and the
-- repository includes newer labels that are not present in that legacy lookup.
alter table public.notebooks
  drop constraint if exists notebooks_category_fkey;
