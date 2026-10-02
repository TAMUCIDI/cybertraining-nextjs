-- Save a complete content order atomically while preserving RLS and revision
-- triggers on each managed table.
create or replace function public.reorder_cybertraining_content(
  target_table text,
  ordered_ids uuid[]
)
returns void
language plpgsql
security invoker
set search_path = public
as $$
begin
  if not public.is_cybertraining_admin() then
    raise exception 'Cyber-DART editor access is required.' using errcode = '42501';
  end if;

  if target_table not in ('notebooks', 'workshops', 'webinars', 'people', 'news') then
    raise exception 'This content collection cannot be reordered.' using errcode = '22023';
  end if;

  execute format(
    'update public.%I as item
     set display_order = (ordering.position - 1)::integer
     from unnest($1::uuid[]) with ordinality as ordering(id, position)
     where item.id = ordering.id
       and item.display_order is distinct from (ordering.position - 1)::integer',
    target_table
  ) using ordered_ids;
end;
$$;

revoke all on function public.reorder_cybertraining_content(text, uuid[]) from public;
grant execute on function public.reorder_cybertraining_content(text, uuid[]) to authenticated;

notify pgrst, 'reload schema';
