"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { createBrowserClient } from "@/utils/supabase/client";

import { collectionOrder, contentCollections } from "../_lib/content";
import { checkAdminSchema } from "../_lib/schema";
import { AdminIcon, type AdminIconName } from "./AdminIcon";
import RepositoryImport from "./RepositoryImport";
import SchemaNotice from "./SchemaNotice";

type CountState = Record<string, number | null>;

const cardIcons: Record<string, AdminIconName> = {
  notebooks: "notebook",
  workshops: "workshop",
  webinars: "webinar",
  people: "people",
};

export default function DashboardOverview() {
  const [counts, setCounts] = useState<CountState>({});
  const [loading, setLoading] = useState(true);
  const [schemaReady, setSchemaReady] = useState<boolean | null>(null);
  const [error, setError] = useState("");

  const coreCollections = useMemo(() => collectionOrder.slice(0, 4), []);

  useEffect(() => {
    let active = true;
    const supabase = createBrowserClient();

    const load = async () => {
      const ready = await checkAdminSchema();
      const results = await Promise.all(
        coreCollections.map(async (key) => {
          const collection = contentCollections[key];
          const { count, error: countError } = await supabase
            .from(collection.table)
            .select("*", { count: "exact", head: true });
          return { key, count, error: countError };
        }),
      );

      if (!active) return;
      setSchemaReady(ready);
      setCounts(Object.fromEntries(results.map((result) => [result.key, result.count])));
      const failed = results.find((result) => result.error);
      setError(failed?.error?.message || "");
      setLoading(false);
    };

    void load();
    return () => {
      active = false;
    };
  }, [coreCollections]);

  return (
    <>
      <div className="mb-8 grid gap-6 border-b border-slate-200 pb-8 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-800">Content operations</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-[-0.045em] text-slate-950 sm:text-5xl">
            Keep the public site accurate and ready to teach.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
            Manage learning modules, activities, speakers, people, editorial text, and uploaded media from one protected workspace.
          </p>
        </div>
        <div className="border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Publishing flow</p>
          <ol className="mt-4 grid grid-cols-3 gap-2 text-center text-xs font-bold text-slate-700">
            <li className="border border-slate-200 bg-slate-50 px-2 py-3">1. Edit</li>
            <li className="border border-amber-200 bg-amber-50 px-2 py-3">2. Review</li>
            <li className="border border-emerald-200 bg-emerald-50 px-2 py-3">3. Publish</li>
          </ol>
        </div>
      </div>

      {schemaReady === false && <div className="mb-7"><SchemaNotice /></div>}
      {schemaReady && <RepositoryImport />}

      {error && (
        <div role="alert" className="mb-7 border-l-4 border-red-700 bg-red-50 p-4 text-sm text-red-900">
          Could not load all content totals: {error}
        </div>
      )}

      <section aria-labelledby="content-totals">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Live Supabase inventory</p>
            <h2 id="content-totals" className="mt-1 text-xl font-black text-slate-950">Core content</h2>
          </div>
          <span className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-bold ${schemaReady ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-900"}`}>
            <span className={`h-2 w-2 rounded-full ${schemaReady ? "bg-emerald-500" : "bg-amber-500"}`} />
            {schemaReady === null ? "Checking schema" : schemaReady ? "CMS schema ready" : "Base schema detected"}
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {coreCollections.map((key) => {
            const collection = contentCollections[key];
            return (
              <Link
                key={key}
                href={`/admin/content/${key}`}
                className="group border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-red-900/35 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-900"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-red-50 text-red-900 group-hover:bg-red-900 group-hover:text-white">
                    <AdminIcon name={cardIcons[key]} className="h-5 w-5" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">Manage</span>
                </div>
                <p className="mt-6 text-3xl font-black tabular-nums text-slate-950">
                  {loading ? "—" : counts[key] ?? "—"}
                </p>
                <p className="mt-1 text-sm font-bold text-slate-700">{collection.plural}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="border border-slate-200 bg-white p-6 shadow-sm" aria-labelledby="quick-actions">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-red-800">Common tasks</p>
          <h2 id="quick-actions" className="mt-2 text-2xl font-black text-slate-950">Start an update</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              ["Add a learning module", "/admin/content/notebooks/new", "notebook"],
              ["Create a workshop", "/admin/content/workshops/new", "workshop"],
              ["Publish a news story", "/admin/content/news/new", "news"],
              ["Upload media", "/admin/media", "upload"],
            ].map(([label, href, icon]) => (
              <Link
                key={href}
                href={href}
                className="flex min-h-16 items-center gap-3 border border-slate-200 px-4 text-sm font-bold text-slate-800 hover:border-red-900 hover:bg-red-50 hover:text-red-900"
              >
                <AdminIcon name={icon as AdminIconName} className="h-5 w-5" />
                {label}
              </Link>
            ))}
          </div>
        </section>

        <section className="border border-slate-200 bg-[#111827] p-6 text-white shadow-sm" aria-labelledby="editor-checklist">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-300">Before publishing</p>
          <h2 id="editor-checklist" className="mt-2 text-2xl font-black">Editorial checklist</h2>
          <ul className="mt-5 space-y-4 text-sm leading-6 text-slate-300">
            <li className="flex gap-3"><span className="font-black text-amber-300">01</span> Confirm dates, names, links, and source attribution.</li>
            <li className="flex gap-3"><span className="font-black text-amber-300">02</span> Add useful alternative text for every public image.</li>
            <li className="flex gap-3"><span className="font-black text-amber-300">03</span> Preview the public route before changing status to published.</li>
          </ul>
        </section>
      </div>
    </>
  );
}
