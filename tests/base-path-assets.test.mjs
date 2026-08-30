import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("the production build emits public media beneath the deployment base path", async () => {
  const html = await readFile(".next/server/app/index.html", "utf8");
  const mediaUrls = [...html.matchAll(/\b(?:src|poster)="([^"]+)"/g)].map(
    ([, url]) => url,
  );

  assert.ok(mediaUrls.includes("/cyber-dart/images/HeroBackground.webp"));
  assert.ok(mediaUrls.includes("/cyber-dart/videos/landing-flood.mp4"));
  assert.deepEqual(
    mediaUrls.filter((url) => /^\/(?:images|videos)\//.test(url)),
    [],
  );
});
