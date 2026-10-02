"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";

import { createBrowserClient } from "@/utils/supabase/client";
import { isSafeImageUrl, isSafeLinkUrl } from "@/utils/content/urls";
import { validateWorkshopJsonField } from "@/utils/content/workshopJson";

import type { ContentField } from "../_lib/content";
import { checkAdminSchema } from "../_lib/schema";
import { getCollection, slugify } from "../_lib/content";
import { AdminIcon } from "./AdminIcon";
import SchemaNotice from "./SchemaNotice";

type FormValue = string | boolean;
type FormState = Record<string, FormValue>;
type Row = Record<string, unknown>;

function valueForInput(field: ContentField, value: unknown): FormValue {
  if (field.kind === "boolean") return Boolean(value);
  if (value === null || value === undefined) return "";
  if (field.kind === "json") return JSON.stringify(value, null, 2);
  if (field.kind === "datetime") {
    const date = new Date(String(value));
    if (Number.isNaN(date.getTime())) return "";
    const timezoneOffset = date.getTimezoneOffset() * 60_000;
    return new Date(date.getTime() - timezoneOffset).toISOString().slice(0, 16);
  }
  return String(value);
}

function initialState(fields: ContentField[]) {
  return Object.fromEntries(
    fields.map((field) => [
      field.key,
      field.defaultValue === undefined ? (field.kind === "boolean" ? false : "") : field.defaultValue,
    ]),
  ) as FormState;
}

function stateFromRow(fields: ContentField[], row: Row) {
  return Object.fromEntries(
    fields.map((field) => [field.key, valueForInput(field, row[field.key])]),
  ) as FormState;
}

function parseField(field: ContentField, value: FormValue) {
  if (field.kind === "boolean") return Boolean(value);
  const stringValue = String(value).trim();
  if (!stringValue) return null;
  if (field.kind === "number") {
    const number = Number(stringValue);
    if (!Number.isFinite(number)) throw new Error(`${field.label} must be a number.`);
    return number;
  }
  if (field.kind === "json") {
    let parsed: unknown;
    try {
      parsed = JSON.parse(stringValue) as unknown;
    } catch {
      throw new Error(`${field.label} contains invalid JSON.`);
    }
    const validationError = validateWorkshopJsonField(field.key, parsed);
    if (validationError) throw new Error(`${field.label} ${validationError}`);
    return parsed;
  }
  if (field.kind === "url") {
    const isValid = field.urlUsage === "image"
      ? isSafeImageUrl(stringValue)
      : isSafeLinkUrl(stringValue);
    if (isValid) return stringValue;
    throw new Error(
      field.urlUsage === "image"
        ? `${field.label} must use a local image path or an approved R2, Wix, or Supabase image host.`
        : `${field.label} must be an http(s) or root-relative URL.`,
    );
  }
  if (field.kind === "datetime") {
    const date = new Date(stringValue);
    if (Number.isNaN(date.getTime())) throw new Error(`${field.label} is not a valid date and time.`);
    return date.toISOString();
  }
  return stringValue;
}

function FieldControl({
  field,
  value,
  onChange,
  controlId,
  describedBy,
}: {
  field: ContentField;
  value: FormValue;
  onChange: (value: FormValue) => void;
  controlId: string;
  describedBy?: string;
}) {
  const baseClass =
    "min-h-11 w-full border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-red-800 focus:ring-2 focus:ring-red-800/15";

  if (field.kind === "boolean") {
    return (
      <label htmlFor={controlId} className="flex min-h-11 cursor-pointer items-center gap-3 border border-slate-300 bg-slate-50 px-4">
        <input
          id={controlId}
          type="checkbox"
          checked={Boolean(value)}
          aria-describedby={describedBy}
          onChange={(event) => onChange(event.target.checked)}
          className="h-4 w-4 accent-red-900"
        />
        <span className="text-sm font-semibold text-slate-700">Enabled</span>
      </label>
    );
  }

  if (field.kind === "select") {
    return (
      <select
        id={controlId}
        value={String(value)}
        required={field.required}
        aria-describedby={describedBy}
        onChange={(event) => onChange(event.target.value)}
        className={baseClass}
      >
        {!field.required && <option value="">Not set</option>}
        {field.options?.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    );
  }

  if (field.kind === "textarea" || field.kind === "json") {
    return (
      <textarea
        id={controlId}
        value={String(value)}
        required={field.required}
        aria-describedby={describedBy}
        rows={field.kind === "json" ? 10 : 7}
        placeholder={field.placeholder}
        spellCheck={field.kind !== "json"}
        onChange={(event) => onChange(event.target.value)}
        className={`${baseClass} resize-y leading-6 ${field.kind === "json" ? "font-mono text-xs" : ""}`}
      />
    );
  }

  const type =
    field.kind === "date"
        ? "date"
        : field.kind === "datetime"
          ? "datetime-local"
          : field.kind === "number"
            ? "number"
            : "text";

  return (
    <input
      id={controlId}
      type={type}
      inputMode={field.kind === "url" ? "url" : undefined}
      value={String(value)}
      required={field.required}
      aria-describedby={describedBy}
      placeholder={field.placeholder}
      onChange={(event) => onChange(event.target.value)}
      className={baseClass}
    />
  );
}

export default function ContentEditor({
  collectionKey,
  recordId,
}: {
  collectionKey: string;
  recordId?: string;
}) {
  const collection = getCollection(collectionKey)!;
  const router = useRouter();
  const isNew = !recordId;
  const [schemaReady, setSchemaReady] = useState<boolean | null>(null);
  const [form, setForm] = useState<FormState>(() => initialState(collection.fields));
  const [row, setRow] = useState<Row>({});
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const visibleFields = useMemo(
    () => collection.fields.filter((field) =>
      (schemaReady !== false || !field.requiresMigration)
      && (!field.pageKeys || field.pageKeys.includes(String(form.page_key || ""))),
    ),
    [collection.fields, form.page_key, schemaReady],
  );

  useEffect(() => {
    let active = true;
    const supabase = createBrowserClient();

    const load = async () => {
      const ready = await checkAdminSchema();
      if (!active) return;
      setSchemaReady(ready);

      if (!ready) {
        setLoading(false);
        return;
      }

      if (!recordId) {
        setForm(initialState(collection.fields));
        setLoading(false);
        return;
      }

      const { data, error: loadError } = await supabase
        .from(collection.table)
        .select("*")
        .eq("id", recordId)
        .single();

      if (!active) return;
      if (loadError) {
        setError(loadError.message);
        setLoading(false);
        return;
      }

      const loadedRow = (data || {}) as Row;
      setRow(loadedRow);
      setForm(stateFromRow(collection.fields, loadedRow));
      setLoading(false);
    };

    void load();
    return () => {
      active = false;
    };
  }, [collection, recordId]);

  const updateField = (field: ContentField, value: FormValue) => {
    setSaved(false);
    setForm((current) => {
      const next = { ...current, [field.key]: value };
      if (
        isNew &&
        field.key === collection.titleField &&
        collection.fields.some((item) => item.key === "slug") &&
        !String(current.slug || "").trim()
      ) {
        next.slug = slugify(String(value));
      }
      return next;
    });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSaved(false);
    setSaving(true);

    try {
      const payload = Object.fromEntries(
        visibleFields.map((field) => [field.key, parseField(field, form[field.key] ?? "")]),
      ) as Record<string, unknown>;
      if (payload.status === "published" && "published_at" in payload && !payload.published_at) {
        payload.published_at = new Date().toISOString();
      }
      const supabase = createBrowserClient();

      if (recordId) {
        const { data, error: updateError } = await supabase
          .from(collection.table)
          .update(payload)
          .eq("id", recordId)
          .select("*")
          .single();
        if (updateError) throw updateError;
        const updatedRow = (data || {}) as Row;
        setRow(updatedRow);
        setForm(stateFromRow(collection.fields, updatedRow));
        setSaved(true);
      } else {
        const { data, error: insertError } = await supabase
          .from(collection.table)
          .insert(payload)
          .select("id")
          .single();
        if (insertError) throw insertError;
        router.replace(`/admin/content/${collection.key}/${String(data.id)}`);
        router.refresh();
      }
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "The content could not be saved.");
    } finally {
      setSaving(false);
    }
  };

  const deleteRecord = async () => {
    if (!recordId) return;
    const title = String(row[collection.titleField] || collection.singular);
    if (!window.confirm(`Delete “${title}”? This action will be recorded in revision history.`)) return;

    setError("");
    const supabase = createBrowserClient();
    const { error: deleteError } = await supabase.from(collection.table).delete().eq("id", recordId);
    if (deleteError) {
      setError(deleteError.message);
      return;
    }
    router.replace(`/admin/content/${collection.key}`);
    router.refresh();
  };

  const previewRow = { ...row, ...form } as Row;
  const previewPath = collection.previewPath?.(previewRow) || null;
  const migrationBlocksCollection = schemaReady === false;

  return (
    <>
      <div className="mb-7 border-b border-slate-200 pb-7">
        <Link
          href={`/admin/content/${collection.key}`}
          className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-red-900"
        >
          ← Back to {collection.plural.toLowerCase()}
        </Link>
        <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-800">{isNew ? "New content" : "Edit content"}</p>
            <h1 className="mt-2 text-3xl font-black tracking-[-0.03em] text-slate-950 sm:text-4xl">
              {isNew ? `Add ${collection.singular}` : String(row[collection.titleField] || `Edit ${collection.singular}`)}
            </h1>
          </div>
          {previewPath && !isNew && (
            <Link
              href={previewPath}
              target="_blank"
              className="inline-flex min-h-11 items-center justify-center gap-2 border border-slate-300 bg-white px-4 text-sm font-bold text-slate-700 hover:border-red-800 hover:text-red-900"
            >
              Preview public page
              <AdminIcon name="external" className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>

      {schemaReady === false && <div className="mb-6"><SchemaNotice compact /></div>}

      {migrationBlocksCollection ? null : schemaReady === null || loading ? (
        <div className="grid min-h-80 place-items-center border border-slate-200 bg-white text-sm font-semibold text-slate-500">
          Loading editor…
        </div>
      ) : (
        <form onSubmit={onSubmit} className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_19rem]">
          <section className="border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
              <h2 className="text-lg font-black text-slate-950">Content details</h2>
              <p className="mt-1 text-sm text-slate-500">Fields marked with an asterisk are required.</p>
            </div>
            <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
              {visibleFields.map((field) => {
                const controlId = `field-${field.key}`;
                const helpId = field.help ? `${controlId}-help` : undefined;
                return (
                  <div key={field.key} className={field.fullWidth ? "sm:col-span-2" : ""}>
                    <label htmlFor={controlId} className="mb-2 block text-sm font-bold text-slate-800">
                      {field.label}{field.required ? " *" : ""}
                    </label>
                    <FieldControl
                      field={field}
                      value={form[field.key] ?? ""}
                      controlId={controlId}
                      describedBy={helpId}
                      onChange={(value) => updateField(field, value)}
                    />
                    {field.help && <p id={helpId} className="mt-2 text-xs leading-5 text-slate-500">{field.help}</p>}
                  </div>
                );
              })}
            </div>
          </section>

          <aside className="space-y-4">
            <div className="sticky top-[6.25rem] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Save changes</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Drafts stay hidden from anonymous visitors after the CMS migration is applied.
              </p>

              {error && (
                <div role="alert" className="mt-4 border-l-4 border-red-700 bg-red-50 p-3 text-sm leading-5 text-red-900">
                  {error}
                </div>
              )}
              {saved && (
                <div role="status" className="mt-4 border-l-4 border-emerald-600 bg-emerald-50 p-3 text-sm font-semibold text-emerald-900">
                  Changes saved.
                </div>
              )}

              <button
                type="submit"
                disabled={saving}
                className="mt-5 inline-flex min-h-11 w-full items-center justify-center bg-red-900 px-4 text-sm font-bold text-white hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? "Saving…" : isNew ? `Create ${collection.singular}` : "Save changes"}
              </button>
              <Link
                href={`/admin/content/${collection.key}`}
                className="mt-2 inline-flex min-h-11 w-full items-center justify-center border border-slate-300 px-4 text-sm font-bold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </Link>

              {!isNew && (
                <button
                  type="button"
                  onClick={deleteRecord}
                  className="mt-5 inline-flex min-h-10 w-full items-center justify-center border border-red-200 px-4 text-xs font-bold text-red-800 hover:border-red-700 hover:bg-red-50"
                >
                  Delete {collection.singular}
                </button>
              )}
            </div>
          </aside>
        </form>
      )}
    </>
  );
}
