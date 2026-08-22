#!/usr/bin/env node
//
// Renders every page to HTML at build time and bakes it into the shipped
// files, so what a visitor -- or a crawler that does not run JavaScript --
// receives is the finished page rather than an empty <div id="root">.
//
// The site has no per-request anything: all its content (markdown, the
// releases list, the export schema) is already resolved at build time by the
// Vite config, which is what makes this a prerender rather than a server.
// The output is still static files.
//
// It runs as the last step of `npm run build`:
//   vite build                      -> dist/, the client bundle and html
//   vite build --ssr entry-server   -> dist-ssr/, the same components for node
//   node scripts/prerender.mjs      -> injects one into the other
//
// The client uses hydrateRoot, so React adopts this markup instead of
// throwing it away and re-rendering.
//
// It also writes sitemap.xml and stamps each page with a canonical URL, from
// the same list of pages -- so a page cannot be prerendered but left out of
// the sitemap, or vice versa.

import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SITE = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(SITE, "dist");
const PLACEHOLDER = '<div id="root"></div>';

// The apex domain 301s here, so this is the address to be indexed under.
const ORIGIN = "https://www.twisted-tongues.com";

// GitHub Pages serves foo.html at /foo and dir/index.html at /dir/, which is
// what the site's own links use, so those are the URLs to publish.
function urlPath(page) {
  if (page === "index.html") return "/";
  if (page.endsWith("/index.html")) return `/${page.slice(0, -"index.html".length)}`;
  return `/${page.replace(/\.html$/, "")}`;
}

const { render, pages } = await import(join(SITE, "dist-ssr", "entry-server.js"));

let injected = 0;
for (const page of pages) {
  const file = join(DIST, page);
  if (!existsSync(file)) {
    console.error(`prerender: ${page} is not in dist/ -- is it missing from vite's inputs?`);
    process.exit(1);
  }
  const html = readFileSync(file, "utf8");
  if (!html.includes(PLACEHOLDER)) {
    const already = html.includes('<div id="root">');
    console.error(
      already
        ? `prerender: ${page} is already prerendered -- run a fresh \`vite build\` first`
        : `prerender: ${page} has no ${PLACEHOLDER} to fill`,
    );
    process.exit(1);
  }
  const rendered = render(page);
  const canonical = `${ORIGIN}${urlPath(page)}`;
  let out = html.replace(PLACEHOLDER, `<div id="root">${rendered}</div>`);
  // One address per page, so the apex domain and the .html form do not read
  // as duplicates of the www pretty-URL form.
  out = out.replace("</head>", `  <link rel="canonical" href="${canonical}" />\n  </head>`);
  writeFileSync(file, out);
  console.log(`${String(rendered.length).padStart(7)} bytes  ${page}  ->  ${urlPath(page)}`);
  injected++;
}

// A page added to vite's inputs but not to entry-server.jsx would otherwise
// ship as an empty div and never reach the sitemap, with nothing to say so.
const shipped = [];
const walk = (dir, prefix = "") => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) walk(join(dir, entry.name), `${prefix}${entry.name}/`);
    else if (entry.name.endsWith(".html")) shipped.push(`${prefix}${entry.name}`);
  }
};
walk(DIST);
const missed = shipped.filter((page) => !pages.includes(page));
if (missed.length) {
  console.error(
    `\nprerender: these pages are in dist/ but not in entry-server.jsx, so they ` +
      `ship empty and unlisted:\n${missed.map((m) => `  - ${m}`).join("\n")}`,
  );
  process.exit(1);
}

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...pages.map((page) => `  <url><loc>${ORIGIN}${urlPath(page)}</loc></url>`),
  "</urlset>",
  "",
].join("\n");
writeFileSync(join(DIST, "sitemap.xml"), sitemap);

console.log(`\nprerendered ${injected} pages, and listed them in sitemap.xml`);
