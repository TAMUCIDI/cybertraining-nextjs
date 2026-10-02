function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function isSafeLinkUrl(value: unknown): value is string {
  if (!isNonEmptyString(value)) return false;
  if (value.startsWith("#")) return true;
  if (value.startsWith("/") && !value.startsWith("//")) return true;

  try {
    return ["http:", "https:"].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}

const approvedImageHosts = new Set([
  "pub-b3352b111e3a40faa530a61f15708ed2.r2.dev",
  "static.wixstatic.com",
]);

export function isSafeImageUrl(value: unknown): value is string {
  if (!isNonEmptyString(value)) return false;
  if (value.startsWith("/") && !value.startsWith("//") && value !== "/") return true;

  try {
    const url = new URL(value);
    return url.protocol === "https:"
      && url.port === ""
      && (approvedImageHosts.has(url.hostname) || url.hostname.endsWith(".supabase.co"));
  } catch {
    return false;
  }
}
