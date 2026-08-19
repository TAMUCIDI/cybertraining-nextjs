# Cloudflare Pages deployment runbook

This repository deploys the Next.js application to the Cloudflare Pages project
`cybertraining-nextjs` through Cloudflare's GitHub integration.

- Production branch: `deploy`
- Production Pages URL: <https://cybertraining-nextjs.pages.dev/>
- Production custom domain: <https://dev.ctdm.org/>
- Other pushed branches: Cloudflare preview deployments

Pushing a branch starts a Cloudflare build automatically. Wrangler login and
`pnpm deploy` are not required for the normal Git-based workflow.
Do not commit new credentials or paste Cloudflare tokens, API keys, or passwords
into issues, pull requests, or chat.

## Required configuration

Keep `wrangler.toml` tracked in Git. It is the source of truth for the Pages
runtime configuration:

```toml
name = "cybertraining-nextjs"
compatibility_date = "2024-11-24"
compatibility_flags = ["nodejs_compat"]
pages_build_output_dir = ".vercel/output/static"
```

Do not remove `nodejs_compat`. Without it, the deployed Worker returns HTTP 503
for pages and static assets. Review changes to `wrangler.toml` in a preview
deployment before merging them to `deploy`.

Cloudflare documents the Git workflow in its
[Pages Git integration guide](https://developers.cloudflare.com/pages/configuration/git-integration/)
and the configuration fields in its
[Pages Wrangler configuration guide](https://developers.cloudflare.com/pages/functions/wrangler-configuration/).

## 1. Start from the production branch

Create application branches from the latest `deploy` branch so they can be
fast-forwarded after preview verification:

```bash
git fetch origin
git switch deploy
git pull --ff-only origin deploy
git switch -c feature/update-homepage
```

Do not develop Cloudflare changes from `deploy-cluster`; that branch contains
the separate container/K3s deployment.

## 2. Develop and verify locally

The repository uses pnpm 9.13.2 and Node.js 18.18 or newer.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Before pushing, stop the development server and run the production build:

```bash
pnpm build
```

Existing image optimization and accessibility warnings do not currently fail
the build. Any compilation, type-checking, or build error must be fixed before
deployment.

## 3. Deploy and verify a preview

Commit the application change and push the feature branch:

```bash
git push -u origin HEAD
```

Wait for the `Cloudflare Pages` check on the GitHub commit. It provides a unique
preview URL and a branch preview URL. A green check only confirms that
Cloudflare accepted the deployment; verify the running application as well.

Set the URL reported by Cloudflare and probe representative routes:

```bash
PREVIEW_URL="https://YOUR_DEPLOYMENT_ID.cybertraining-nextjs.pages.dev"

curl -fsS -o /dev/null -w "root %{http_code}\n" "$PREVIEW_URL/"
curl -fsS -o /dev/null -w "asset %{http_code}\n" "$PREVIEW_URL/images/TAMU_Logo.png"
curl -fsS -o /dev/null -w "dynamic %{http_code}\n" "$PREVIEW_URL/notebooks"
```

All three requests should return `200`. Also inspect the changed page in a
browser before releasing it.

## 4. Release to production

The recommended release path is a reviewed pull request from the feature branch
into `deploy`. For a small, already reviewed branch that was created directly
from `deploy`, a maintainer can fast-forward it locally:

```bash
git switch deploy
git pull --ff-only origin deploy
git merge --ff-only feature/update-homepage
pnpm install --frozen-lockfile
pnpm build
git push origin deploy
```

If the fast-forward merge fails, do not force-push. Update the feature branch or
use a pull request to resolve the divergence.

The push to `deploy` triggers the production Cloudflare build. The previous
deployment continues serving traffic until the new deployment is ready.

## 5. Verify production

Do not treat the GitHub status alone as proof that the release works. Confirm
the custom domain, Pages domain, an asset, and a dynamic route:

```bash
curl -fsS -o /dev/null -w "custom root %{http_code}\n" https://dev.ctdm.org/
curl -fsS -o /dev/null -w "custom asset %{http_code}\n" https://dev.ctdm.org/images/TAMU_Logo.png
curl -fsS -o /dev/null -w "custom dynamic %{http_code}\n" https://dev.ctdm.org/notebooks
curl -fsS -o /dev/null -w "pages root %{http_code}\n" https://cybertraining-nextjs.pages.dev/
```

Expect `200` from every request, then inspect the changed page in a browser.

## Roll back a bad release

Prefer a Git revert so the repository and Cloudflare deployment history remain
consistent:

```bash
git switch deploy
git pull --ff-only origin deploy
BAD_COMMIT=0123456
git revert --no-edit "$BAD_COMMIT"
pnpm build
git push origin deploy
```

Replace the example commit with the commit being reverted. For a merge commit,
use `git revert --no-edit -m 1 MERGE_COMMIT_SHA`. Never force-push or rewrite
the `deploy` branch. Verify production again after the revert deploys.

## Troubleshooting

### Preview or production returns HTTP 503

Read the response body. If it reports a Node.js compatibility error, confirm
that the deployed commit contains the tracked `wrangler.toml` above and that
`nodejs_compat` has not been removed.

### Cloudflare check remains `in progress`

The GitHub status can lag after the deployment starts serving traffic. Check the
unique deployment URL and the target domain directly, but do not merge a preview
that has not passed the HTTP and browser checks.

### Local `pnpm pages:build` reports `/favicon.ico` is not Edge runtime

As of 2026-08-19, the repository's legacy `@cloudflare/next-on-pages` packaging
command can report this error locally even when the Git-integrated Cloudflare
build deploys successfully. Use `pnpm build` as the required local check and the
Cloudflare preview as the deployment acceptance check. Treat changes to the
adapter or favicon routing as a separate maintenance task.
