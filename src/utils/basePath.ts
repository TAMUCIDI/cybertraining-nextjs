export function withBasePath(path: string) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return path.startsWith("/") &&
    !path.startsWith("//") &&
    !path.startsWith(`${basePath}/`)
    ? `${basePath}${path}`
    : path;
}
