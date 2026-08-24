# Static site at www.twisted-tongues.com

## Instructions for editing

For small changes (typos, text updates, etc), you can simply edit on github,
make a pull request, and once it's merged to `main` it will be deployed
automatically.

If you are doing more meaningful edits, you might want to set up a dev
environment. This should be a pretty standard vite environment, using NVM to
pin the node version.

This is approximately the command line workflow I use:

- Check out this repository to wherever you want it.
  `git clone git@github.com:twisted-tongues-team/www.twisted-tongues.com.git $DESTINATION_DIRECTORY`
- [Install nvm](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)
- enter the directory `cd $DESTINATION_DIRECTORY`
- Ensure you are using the correct version of node: `nvm use` (this uses the node version we pin in .nvmrc)
- Install dependencies: `npm ci`
- Run dev server `npm run dev` (should print a URL you can open in your browser to see a preview)
- If you are proposing changes, prefer to do them in a branch `git checkout -b my_new_update`
- Edit whatever src file you want, it'll live update in the browser.
- When you are done `git add` / `git commit` whatever changes you have done and
  push them to github `git push origin my_new_update`. Make a pull request,
  send out for review or merge. The website is automatically deployed once a
  change is merged to `main` using github actions.

## Build: pages are prerendered

`npm run build` runs three steps: Vite's client build, a second Vite build of
`src/entry-server.jsx` for node, and `scripts/prerender.mjs`, which renders
every page to HTML and bakes it into the shipped files. The result is still
static files — nothing runs per request — but a visitor (or a crawler that
does not execute JavaScript, which is most of the ones that feed language
models) gets the finished page instead of an empty `<div id="root">`. React
then hydrates that markup rather than replacing it.

The same script writes `dist/sitemap.xml` and stamps each page with a
`<link rel="canonical">` under `https://www.twisted-tongues.com` (the apex
domain 301s there). `public/robots.txt` points at the sitemap and welcomes
search and assistant crawlers alike.

**Adding a page** means adding it in three places: an `.html` file, an entry
in `vite.config.js`, and an entry in `src/entry-server.jsx`. Forget the last
and the build fails naming the page, rather than shipping it blank and
missing from the sitemap.

## The `/dev` pages (`/schemas`, `/tt-export`)

The Manual is for people using the app; `/dev` is for people writing code
against it. Its landing page (`src/dev.md`) is deliberately thin — it says
what is and is not possible today — and each topic under it is a page of its
own: `dev/export-format.html` is the first, and an API, tokens, or service
accounts would be siblings.

Pages under `dev/` are one directory deep, so links between pages, and to the
downloads below, are written site-absolute (`/manual`, `/dev/export-format`,
`/schemas/...`). Vite still emits bundled assets relative to each page, so
that part takes care of itself.

The site publishes the description of the file format behind the app's "Save
to Computer…": a JSON Schema at `/schemas/tt-export-v2.json` — the URL the
schema's own `$id` names — plus a dependency-free Python reader and
TypeScript types under `/tt-export/`. The export format page renders that
schema directly, so it describes whatever the file actually says. (The schema
is vendored twice — `public/` for download, `src/tt-export/` for the import
that renders it — from one upstream source, with both copies hashed.)

**Those three files are not edited here.** They belong to the app repo
(`twisted-tongues-v2`, in `docs/tt_export/`), where they are tested against
the same fixtures as the app's own export code. This repo only vendors
copies of them:

- The app's prerelease workflow pushes fresh copies here as part of cutting a
  release, so the site follows the app without anyone remembering to do it.
- `npm run tt-export:sync` does the same by hand, from a checkout of the app
  repo sitting next to this one (or `--repo <path>`, or `$TT_V2_REPO`).
- `npm run tt-export:check` verifies the copies still match the hashes
  recorded in `scripts/tt-export-sync.json` and — when it can see a checkout
  of the app repo — that they match it too. The deploy runs it, so editing a
  vendored file here fails the build rather than quietly shipping a copy that
  disagrees with the app.

Adding a field to the schema therefore needs no change on this side. Prose
that explains the format to people, rather than to parsers, lives in
`src/export-format.md` and `src/export-format-rules.md`.
