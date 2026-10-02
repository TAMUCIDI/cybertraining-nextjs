"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { createBrowserClient } from "@/utils/supabase/client";

import { formatFieldLabel, getCollection } from "../_lib/content";
import { checkAdminSchema } from "../_lib/schema";
import { AdminIcon } from "./AdminIcon";
import PageHeading from "./PageHeading";
import SchemaNotice from "./SchemaNotice";

type Row = Record<string, unknown>;

function displayValue(value: unknown, field: string) {
  if (value === null || value === undefined || value === "") return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (field.endsWith("_at")) {
    const date = new Date(String(value));
    return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleDateString();
  }
  return String(value);
}

export default function CollectionList({ collectionKey }: { collectionKey: string }) {
  const collection = getCollection(collectionKey)!;
  const [rows, setRows] = useState<Row[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [schemaReady, setSchemaReady] = useState<boolean | null>(null);
  const [reordering, setReordering] = useState(false);
  const supportsOrdering = collection.fields.some((field) => field.key === "display_order");

  const loadRows = async () => {
    setLoading(true);
    setError("");
    const supabase = createBrowserClient();
    const ready = await checkAdminSchema();
    setSchemaReady(ready);

    if (!ready) {
      setRows([]);
      setLoading(false);
      return;
    }

    let request = supabase.from(collection.table).select("*");
    request = supportsOrdering
      ? request.order("display_order", { ascending: true }).order("updated_at", { ascending: false })
      : request.order("updated_at", { ascending: false });
    const { data, error: loadError } = await request;

    if (loadError) setError(loadError.message);
    setRows((data as Row[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    void loadRows();
    // The collection object is static configuration selected by the route.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection.key]);

  const filteredRows = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return rows;
    return rows.filter((row) =>
      Object.values(row).some((value) =>
        typeof value === "string" ? value.toLowerCase().includes(normalized) : false,
      ),
    );
  }, [query, rows]);

  const deleteRow = async (row: Row) => {
    const label = String(row[collection.titleField] || collection.singular);
    if (!window.confirm(`Delete “${label}”? This action will be recorded in revision history.`)) return;

    const supabase = createBrowserClient();
    const { error: deleteError } = await supabase.from(collection.table).delete().eq("id", row.id);
    if (deleteError) {
      setError(deleteError.message);
      return;
    }
    setRows((current) => current.filter((item) => item.id !== row.id));
  };

  const moveRow = async (row: Row, direction: -1 | 1) => {
    if (!supportsOrdering || reordering || query.trim()) return;
    const currentIndex = rows.findIndex((item) => item.id === row.id);
    const nextIndex = currentIndex + direction;
    if (currentIndex < 0 || nextIndex < 0 || nextIndex >= rows.length) return;

    const previousRows = rows;
    const reorderedRows = [...rows];
    const [movedRow] = reorderedRows.splice(currentIndex, 1);
    reorderedRows.splice(nextIndex, 0, movedRow);
    const normalizedRows: Row[] = reorderedRows.map((item, index) => ({
      ...item,
      display_order: index,
    }));

    setError("");
    setReordering(true);
    setRows(normalizedRows);

    const supabase = createBrowserClient();
    const { error: reorderError } = await supabase.rpc("reorder_cybertraining_content", {
      target_table: collection.table,
      ordered_ids: normalizedRows.map((item) => String(item.id)),
    });

    if (reorderError) {
      setRows(previousRows);
      setError(reorderError.message);
    }
    setReordering(false);
  };

  const migrationBlocksCollection = schemaReady === false;

  return (
    <>
      <PageHeading
        eyebrow="Content library"
        title={collection.plural}
        description={collection.description}
        action={migrationBlocksCollection ? undefined : { href: `/admin/content/${collection.key}/new`, label: `Add ${collection.singular}` }}
      />

      {schemaReady === false && <div className="mb-6"><SchemaNotice compact /></div>}

      {!migrationBlocksCollection && (
        <section className="border border-slate-200 bg-white shadow-sm" aria-label={`${collection.plural} table`}>
          <div className="flex flex-col gap-4 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div className="relative w-full max-w-md">
              <label htmlFor={`search-${collection.key}`} className="sr-only">
                Search {collection.plural.toLowerCase()}
              </label>
              <AdminIcon name="search" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                id={`search-${collection.key}`}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={`Search ${collection.plural.toLowerCase()}…`}
                className="min-h-11 w-full border border-slate-300 bg-white pl-10 pr-4 text-sm outline-none focus:border-red-800 focus:ring-2 focus:ring-red-800/15"
              />
            </div>
            <p className="text-sm font-semibold tabular-nums text-slate-500">
              {filteredRows.length} {filteredRows.length === 1 ? collection.singular : collection.plural.toLowerCase()}
            </p>
          </div>

          {error && (
            <div role="alert" className="m-5 border-l-4 border-red-700 bg-red-50 p-4 text-sm text-red-900">
              {error}
            </div>
          )}

          {supportsOrdering && (
            <div className="border-b border-slate-200 bg-slate-50 px-5 py-3 text-xs leading-5 text-slate-600">
              Use the arrow buttons to change the public display order. Changes are saved immediately.
              {query.trim() && <span className="ml-1 font-bold text-amber-800">Clear the search field to reorder items.</span>}
            </div>
          )}

          {loading ? (
            <div className="grid min-h-64 place-items-center text-sm font-semibold text-slate-500">Loading content…</div>
          ) : filteredRows.length === 0 ? (
            <div className="grid min-h-64 place-items-center p-8 text-center">
              <div>
                <p className="text-lg font-black text-slate-900">No matching content</p>
                <p className="mt-2 text-sm text-slate-500">Add the first record or clear the search field.</p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[780px] border-collapse text-left text-sm">
                <thead className="bg-slate-50 text-xs font-bold uppercase tracking-[0.1em] text-slate-500">
                  <tr>
                    {collection.listFields.map((field) => (
                      <th key={field} scope="col" className="border-b border-slate-200 px-5 py-3.5">{formatFieldLabel(field)}</th>
                    ))}
                    <th scope="col" className="border-b border-slate-200 px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRows.map((row, rowIndex) => (
                    <tr key={String(row.id)} className="hover:bg-slate-50/80">
                      {collection.listFields.map((field, index) => (
                        <td key={field} className={`max-w-xs px-5 py-4 ${index === 0 ? "font-bold text-slate-900" : "text-slate-600"}`}>
                          {field === "status" ? (
                            <span className={`inline-flex px-2.5 py-1 text-xs font-bold capitalize ${
                              row.status === "published"
                                ? "bg-emerald-50 text-emerald-800"
                                : row.status === "archived"
                                  ? "bg-slate-100 text-slate-600"
                                  : "bg-amber-50 text-amber-900"
                            }`}>
                              {displayValue(row[field], field)}
                            </span>
                          ) : (
                            <span className="line-clamp-2">{displayValue(row[field], field)}</span>
                          )}
                        </td>
                      ))}
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          {supportsOrdering && (
                            <div className="flex" aria-label={`Change order for ${String(row[collection.titleField] || collection.singular)}`}>
                              <button
                                type="button"
                                aria-label={`Move ${String(row[collection.titleField] || collection.singular)} up`}
                                title="Move up"
                                disabled={reordering || Boolean(query.trim()) || rowIndex === 0}
                                onClick={() => moveRow(row, -1)}
                                className="inline-flex h-9 w-9 items-center justify-center border border-slate-300 text-base font-black text-slate-600 hover:border-red-800 hover:text-red-900 disabled:cursor-not-allowed disabled:opacity-35"
                              >
                                ↑
                              </button>
                              <button
                                type="button"
                                aria-label={`Move ${String(row[collection.titleField] || collection.singular)} down`}
                                title="Move down"
                                disabled={reordering || Boolean(query.trim()) || rowIndex === filteredRows.length - 1}
                                onClick={() => moveRow(row, 1)}
                                className="-ml-px inline-flex h-9 w-9 items-center justify-center border border-slate-300 text-base font-black text-slate-600 hover:z-10 hover:border-red-800 hover:text-red-900 disabled:cursor-not-allowed disabled:opacity-35"
                              >
                                ↓
                              </button>
                            </div>
                          )}
                          <Link
                            href={`/admin/content/${collection.key}/${String(row.id)}`}
                            aria-label={`Edit ${String(row[collection.titleField] || collection.singular)}`}
                            className="inline-flex min-h-9 items-center border border-slate-300 px-3 text-xs font-bold text-slate-700 hover:border-red-800 hover:text-red-900"
                          >
                            Edit
                          </Link>
                          <button
                            type="button"
                            aria-label={`Delete ${String(row[collection.titleField] || collection.singular)}`}
                            onClick={() => deleteRow(row)}
                            className="inline-flex min-h-9 items-center border border-slate-300 px-3 text-xs font-bold text-slate-500 hover:border-red-700 hover:bg-red-50 hover:text-red-800"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}
    </>
  );
}
