-- New workshop pages render structured content stored in the workshop row.
-- Keep legacy MDX URLs when present, but do not require one for new records.
alter table public.workshops
  alter column mdx_url drop not null;
