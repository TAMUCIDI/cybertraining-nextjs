"use client";

import { useEffect, useState } from "react";

import { createBrowserClient } from "@/utils/supabase/client";

import { checkAdminSchema } from "../_lib/schema";
import PageHeading from "./PageHeading";
import SchemaNotice from "./SchemaNotice";

type Revision = {
  id: number;
  created_at: string;
  table_name: string;
  record_id: string;
  operation: "INSERT" | "UPDATE" | "DELETE";
  changed_by: string | null;
  before_data: Record<string, unknown> | null;
  after_data: Record<string, unknown> | null;
};

export default function RevisionHistory() {
  const [schemaReady, setSchemaReady] = useState<boolean | null>(null);
  const [rows, setRows] = useState<Revision[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      const ready = await checkAdminSchema();
      setSchemaReady(ready);
      if (!ready) {
        setLoading(false);
        return;
      }

      const supabase = createBrowserClient();
      const { data, error: loadError } = await supabase
        .from("content_revisions")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);
      if (loadError) setError(loadError.message);
      setRows((data as Revision[]) || []);
      setLoading(false);
    };
    void load();
  }, []);

  return (
    <>
      <PageHeading
        eyebrow="Audit trail"
        title="Revision history"
        description="Review the last 100 inserts, updates, and deletions made through Supabase. Each snapshot records the authenticated user ID."
      />

      {schemaReady === false ? (
        <SchemaNotice />
      ) : (
        <section className="border border-slate-200 bg-white shadow-sm">
          {error && <div role="alert" className="m-5 border-l-4 border-red-700 bg-red-50 p-4 text-sm text-red-900">{error}</div>}
          {loading ? (
            <div className="grid min-h-64 place-items-center text-sm font-semibold text-slate-500">Loading revisions…</div>
          ) : rows.length === 0 ? (
            <div className="grid min-h-64 place-items-center p-8 text-center text-sm text-slate-500">Revisions will appear after the first content change.</div>
          ) : (
            <div className="divide-y divide-slate-100">
              {rows.map((row) => (
                <details key={row.id} className="group p-5 open:bg-slate-50">
                  <summary className="flex cursor-pointer list-none flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex min-w-16 justify-center px-2 py-1 text-[0.65rem] font-black ${
                        row.operation === "INSERT"
                          ? "bg-emerald-50 text-emerald-800"
                          : row.operation === "DELETE"
                            ? "bg-red-50 text-red-800"
                            : "bg-blue-50 text-blue-800"
                      }`}>
                        {row.operation}
                      </span>
                      <div>
                        <p className="text-sm font-black text-slate-900">{row.table_name} · {row.record_id}</p>
                        <p className="mt-1 text-xs text-slate-500">{new Date(row.created_at).toLocaleString()}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-500 group-open:text-red-900">View snapshot</span>
                  </summary>
                  <div className="mt-5 grid gap-4 xl:grid-cols-2">
                    <div>
                      <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Before</p>
                      <pre className="max-h-96 overflow-auto bg-slate-950 p-4 text-xs leading-5 text-slate-200">{JSON.stringify(row.before_data, null, 2) || "null"}</pre>
                    </div>
                    <div>
                      <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">After</p>
                      <pre className="max-h-96 overflow-auto bg-slate-950 p-4 text-xs leading-5 text-slate-200">{JSON.stringify(row.after_data, null, 2) || "null"}</pre>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          )}
        </section>
      )}
    </>
  );
}
