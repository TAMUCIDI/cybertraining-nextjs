export default function SchemaNotice({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`border-l-4 border-amber-500 bg-amber-50 text-amber-950 ${compact ? "px-4 py-3" : "p-5"}`}>
      <p className="text-sm font-bold">Admin database migration required</p>
      <p className="mt-1 text-sm leading-6">
        Apply <code className="bg-amber-100 px-1 py-0.5">supabase/migrations/20261002000000_admin_cms.sql</code> to enable drafts,
        page text, media, revisions, and protected writes. Content editing stays disabled until it is applied. Setup instructions are in <code className="bg-amber-100 px-1 py-0.5">docs/admin-dashboard.md</code>.
      </p>
    </div>
  );
}
