"use client";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

import { createBrowserClient } from "@/utils/supabase/client";

import { checkAdminSchema } from "../_lib/schema";
import { AdminIcon } from "./AdminIcon";
import PageHeading from "./PageHeading";
import SchemaNotice from "./SchemaNotice";

type MediaRow = {
  id: string;
  title: string;
  alt_text: string | null;
  bucket: string;
  storage_path: string;
  public_url: string;
  mime_type: string | null;
  size_bytes: number | null;
  created_at: string;
};

const bucket = "cybertraining-media";
const maxFileSize = 50 * 1024 * 1024;
const allowedTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "application/pdf",
  "text/html",
  "text/plain",
  "application/zip",
]);

function safeFileName(name: string) {
  const extensionIndex = name.lastIndexOf(".");
  const extension = extensionIndex >= 0 ? name.slice(extensionIndex).toLowerCase() : "";
  const stem = (extensionIndex >= 0 ? name.slice(0, extensionIndex) : name)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  return `${stem || "file"}${extension}`;
}

function formatBytes(value: number | null) {
  if (!value) return "—";
  if (value < 1024) return `${value} B`;
  if (value < 1024 * 1024) return `${(value / 1024).toFixed(1)} KB`;
  return `${(value / (1024 * 1024)).toFixed(1)} MB`;
}

export default function MediaLibrary() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [schemaReady, setSchemaReady] = useState<boolean | null>(null);
  const [rows, setRows] = useState<MediaRow[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [altText, setAltText] = useState("");
  const [folder, setFolder] = useState("images");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadRows = async () => {
    const ready = await checkAdminSchema();
    setSchemaReady(ready);
    if (!ready) {
      setLoading(false);
      return;
    }

    const supabase = createBrowserClient();
    const { data, error: loadError } = await supabase
      .from("media")
      .select("*")
      .order("created_at", { ascending: false });
    if (loadError) setError(loadError.message);
    setRows((data as MediaRow[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    void loadRows();
  }, []);

  const chooseFile = (event: ChangeEvent<HTMLInputElement>) => {
    setError("");
    const selected = event.target.files?.[0] || null;
    if (!selected) {
      setFile(null);
      return;
    }
    if (!allowedTypes.has(selected.type)) {
      setError("Choose an image, PDF, HTML, text, or ZIP file.");
      event.target.value = "";
      return;
    }
    if (selected.size > maxFileSize) {
      setError("Files must be 50 MB or smaller.");
      event.target.value = "";
      return;
    }
    setFile(selected);
    if (!title) setTitle(selected.name.replace(/\.[^.]+$/, ""));
  };

  const upload = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      setError("Choose a file to upload.");
      return;
    }

    setUploading(true);
    setError("");
    setNotice("");
    const supabase = createBrowserClient();
    const { data: userData } = await supabase.auth.getUser();
    const storagePath = `${folder}/${crypto.randomUUID()}-${safeFileName(file.name)}`;
    const { error: uploadError } = await supabase.storage.from(bucket).upload(storagePath, file, {
      cacheControl: "3600",
      contentType: file.type,
      upsert: false,
    });

    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(storagePath);
    const { data: inserted, error: metadataError } = await supabase
      .from("media")
      .insert({
        title: title.trim() || file.name,
        alt_text: altText.trim() || null,
        bucket,
        storage_path: storagePath,
        public_url: urlData.publicUrl,
        mime_type: file.type,
        size_bytes: file.size,
        uploaded_by: userData.user?.id || null,
      })
      .select("*")
      .single();

    if (metadataError) {
      await supabase.storage.from(bucket).remove([storagePath]);
      setError(metadataError.message);
      setUploading(false);
      return;
    }

    setRows((current) => [inserted as MediaRow, ...current]);
    setFile(null);
    setTitle("");
    setAltText("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    setNotice("Upload complete. The public URL is ready to use in content forms.");
    setUploading(false);
  };

  const copyUrl = async (url: string) => {
    await navigator.clipboard.writeText(url);
    setNotice("Public URL copied to the clipboard.");
  };

  const deleteMedia = async (row: MediaRow) => {
    if (!window.confirm(`Delete “${row.title}” from storage and the media library?`)) return;
    setError("");
    const supabase = createBrowserClient();
    const { error: storageError } = await supabase.storage.from(row.bucket).remove([row.storage_path]);
    if (storageError) {
      setError(storageError.message);
      return;
    }
    const { error: metadataError } = await supabase.from("media").delete().eq("id", row.id);
    if (metadataError) {
      setError(metadataError.message);
      return;
    }
    setRows((current) => current.filter((item) => item.id !== row.id));
  };

  return (
    <>
      <PageHeading
        eyebrow="Assets"
        title="Media library"
        description="Upload images, workshop documents, and notebook files to Supabase Storage, then reuse their public URLs across the site."
      />

      {schemaReady === false ? (
        <SchemaNotice />
      ) : (
        <div className="grid gap-6 xl:grid-cols-[23rem_minmax(0,1fr)] xl:items-start">
          <form onSubmit={upload} className="border border-slate-200 bg-white p-5 shadow-sm sm:p-6 xl:sticky xl:top-[6.25rem]">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-red-800">New asset</p>
            <h2 className="mt-2 text-xl font-black text-slate-950">Upload media</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">Images, PDF, HTML, text, and ZIP files up to 50 MB.</p>

            <label className="mt-5 block">
              <span className="mb-2 block text-sm font-bold text-slate-800">File *</span>
              <input
                ref={fileInputRef}
                type="file"
                required
                accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml,application/pdf,text/html,text/plain,application/zip"
                onChange={chooseFile}
                className="block w-full border border-dashed border-slate-300 bg-slate-50 p-4 text-xs file:mr-3 file:border-0 file:bg-red-900 file:px-3 file:py-2 file:font-bold file:text-white"
              />
            </label>
            <label className="mt-4 block">
              <span className="mb-2 block text-sm font-bold text-slate-800">Title *</span>
              <input
                value={title}
                required
                onChange={(event) => setTitle(event.target.value)}
                className="min-h-11 w-full border border-slate-300 px-3 text-sm outline-none focus:border-red-800 focus:ring-2 focus:ring-red-800/15"
              />
            </label>
            <label className="mt-4 block">
              <span className="mb-2 block text-sm font-bold text-slate-800">Alternative text</span>
              <textarea
                value={altText}
                rows={3}
                onChange={(event) => setAltText(event.target.value)}
                className="w-full border border-slate-300 px-3 py-2 text-sm outline-none focus:border-red-800 focus:ring-2 focus:ring-red-800/15"
              />
            </label>
            <label className="mt-4 block">
              <span className="mb-2 block text-sm font-bold text-slate-800">Folder</span>
              <select
                value={folder}
                onChange={(event) => setFolder(event.target.value)}
                className="min-h-11 w-full border border-slate-300 bg-white px-3 text-sm outline-none focus:border-red-800 focus:ring-2 focus:ring-red-800/15"
              >
                <option value="images">Images</option>
                <option value="notebooks">Modules</option>
                <option value="workshops">Workshops</option>
                <option value="documents">Documents</option>
              </select>
            </label>
            <button
              type="submit"
              disabled={uploading}
              className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 bg-red-900 px-4 text-sm font-bold text-white hover:bg-red-800 disabled:opacity-60"
            >
              <AdminIcon name="upload" className="h-4 w-4" />
              {uploading ? "Uploading…" : "Upload file"}
            </button>
          </form>

          <section className="border border-slate-200 bg-white shadow-sm" aria-labelledby="uploaded-media">
            <div className="border-b border-slate-200 p-5">
              <h2 id="uploaded-media" className="text-xl font-black text-slate-950">Uploaded media</h2>
              <p className="mt-1 text-sm text-slate-500">{rows.length} catalogued assets</p>
            </div>

            {error && <div role="alert" className="m-5 border-l-4 border-red-700 bg-red-50 p-4 text-sm text-red-900">{error}</div>}
            {notice && <div role="status" className="m-5 border-l-4 border-emerald-600 bg-emerald-50 p-4 text-sm text-emerald-900">{notice}</div>}

            {loading ? (
              <div className="grid min-h-64 place-items-center text-sm font-semibold text-slate-500">Loading media…</div>
            ) : rows.length === 0 ? (
              <div className="grid min-h-64 place-items-center p-8 text-center text-sm text-slate-500">Upload the first asset to create the media catalog.</div>
            ) : (
              <div className="divide-y divide-slate-100">
                {rows.map((row) => (
                  <article key={row.id} className="grid gap-4 p-5 sm:grid-cols-[4.5rem_minmax(0,1fr)_auto] sm:items-center">
                    <div className="grid h-[4.5rem] w-[4.5rem] place-items-center overflow-hidden bg-slate-100 text-slate-400">
                      {row.mime_type?.startsWith("image/") ? (
                        // The source is a user-managed Supabase Storage URL and is intentionally rendered without next/image optimization.
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={row.public_url} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <AdminIcon name="page" className="h-7 w-7" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-black text-slate-900">{row.title}</h3>
                      <p className="mt-1 truncate text-xs text-slate-500">{row.storage_path}</p>
                      <p className="mt-1 text-xs font-semibold text-slate-400">{row.mime_type || "Unknown type"} · {formatBytes(row.size_bytes)}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 sm:justify-end">
                      <button type="button" onClick={() => copyUrl(row.public_url)} className="min-h-9 border border-slate-300 px-3 text-xs font-bold text-slate-700 hover:border-red-800 hover:text-red-900">Copy URL</button>
                      <a href={row.public_url} target="_blank" rel="noreferrer" className="inline-flex min-h-9 items-center border border-slate-300 px-3 text-xs font-bold text-slate-700 hover:border-red-800 hover:text-red-900">Open</a>
                      <button type="button" onClick={() => deleteMedia(row)} className="min-h-9 border border-red-200 px-3 text-xs font-bold text-red-800 hover:border-red-700 hover:bg-red-50">Delete</button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      )}
    </>
  );
}
