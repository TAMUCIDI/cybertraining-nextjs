"use client";

import { useState } from "react";

import { AdminIcon } from "./AdminIcon";

type ImportResult = {
  ok: boolean;
  message?: string;
  counts?: Record<string, number>;
};

export default function RepositoryImport() {
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);

  const runImport = async () => {
    if (!window.confirm("Import the repository's local notebooks, workshops, people, and featured news into Supabase? Existing matching slugs will be updated.")) return;
    setRunning(true);
    setResult(null);
    try {
      const response = await fetch("/api/admin/import-local-content", { method: "POST" });
      const payload = await response.json() as ImportResult;
      setResult(payload);
    } catch (error) {
      setResult({ ok: false, message: error instanceof Error ? error.message : "The import request failed." });
    } finally {
      setRunning(false);
    }
  };

  return (
    <section className="mb-8 border border-slate-200 bg-white p-5 shadow-sm sm:flex sm:items-center sm:justify-between sm:gap-6" aria-labelledby="repository-import">
      <div className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-red-800">One-time migration tool</p>
        <h2 id="repository-import" className="mt-2 text-xl font-black text-slate-950">Bring local repository content into the dashboard</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Idempotently upsert the current local modules, workshops, advisory profiles, and featured news by slug so future edits happen in Supabase.
        </p>
        {result && (
          <p role="status" className={`mt-3 text-sm font-semibold ${result.ok ? "text-emerald-700" : "text-red-800"}`}>
            {result.ok
              ? `Imported ${Object.entries(result.counts || {}).map(([key, value]) => `${value} ${key}`).join(", ")}.`
              : result.message || "Import failed."}
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={runImport}
        disabled={running}
        className="mt-5 inline-flex min-h-11 shrink-0 items-center justify-center gap-2 border border-red-900 px-4 text-sm font-bold text-red-900 hover:bg-red-50 disabled:opacity-60 sm:mt-0"
      >
        <AdminIcon name="upload" className="h-4 w-4" />
        {running ? "Importing…" : "Import repository content"}
      </button>
    </section>
  );
}
