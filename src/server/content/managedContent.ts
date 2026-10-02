import { createClient } from "@/utils/supabase/server";

export type ManagedPage = {
  page_key: string;
  title: string;
  eyebrow: string | null;
  heading: string | null;
  summary: string | null;
  body: string | null;
  image_url: string | null;
  image_alt: string | null;
  cta_label: string | null;
  cta_url: string | null;
};

export async function getManagedPage(pageKey: string): Promise<ManagedPage | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("pages")
      .select("page_key,title,eyebrow,heading,summary,body,image_url,image_alt,cta_label,cta_url")
      .eq("page_key", pageKey)
      .eq("status", "published")
      .maybeSingle();

    if (error || !data) return null;
    return data as ManagedPage;
  } catch {
    return null;
  }
}

export async function getSiteSetting<T>(key: string): Promise<T | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("value_json")
      .eq("key", key)
      .eq("status", "published")
      .maybeSingle();

    if (error || !data) return null;
    return data.value_json as T;
  } catch {
    return null;
  }
}

export async function hasImportedRepositoryContent() {
  const setting = await getSiteSetting<{ completed?: unknown }>("repository_content_import");
  return setting?.completed === true;
}

export function splitParagraphs(value: string | null | undefined, fallback: string[]) {
  if (!value?.trim()) return fallback;
  return value
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export function looksLikeUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}
