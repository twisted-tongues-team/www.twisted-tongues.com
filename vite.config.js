import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import markdownItAttrs from "markdown-it-attrs";

const md = markdownIt({
  html: true,
})
  .use(markdownItAttrs, {})
  .use(markdownItAnchor, {});

// A heading like "2.3 Saving a project" carries its section number in the
// text. Split the two apart: the number becomes <span class="secno"> so the
// stylesheet can hang it in the margin, and the outline of every numbered
// heading is exported alongside the HTML so a page can build its own table
// of contents instead of hand-maintaining one in the markdown.
const SECTION_NUMBER = /^(\d+(?:\.\d+)*)\s+(.+)$/;

function renderMarkdown(code) {
  const env = {};
  const tokens = md.parse(code, env);
  const headings = [];
  for (let i = 0; i < tokens.length; i++) {
    const open = tokens[i];
    if (open.type !== "heading_open") continue;
    const inline = tokens[i + 1];
    const first = inline.children?.find((t) => t.type === "text");
    const m = first && first.content.match(SECTION_NUMBER);
    if (!m) continue;
    const [, number, rest] = m;
    first.content = rest;
    const span = new inline.constructor("html_inline", "", 0);
    span.content = `<span class="secno">${number}</span>`;
    inline.children.unshift(span);
    headings.push({
      level: Number(open.tag.slice(1)),
      id: open.attrGet("id"),
      number,
      title: inline.children
        .filter((t) => t.type === "text" || t.type === "code_inline")
        .map((t) => t.content)
        .join(""),
    });
  }
  const html = md.renderer.render(tokens, md.options, env);
  return (
    `export default ${JSON.stringify(html)};\n` +
    `export const headings = ${JSON.stringify(headings)};\n`
  );
}

// https://vitejs.dev/config/
export default defineConfig({
  base: "",
  plugins: [
    react(),
    {
      name: "markdown-loader",
      enforce: "pre",
      transform(code, id) {
        if (/\.md$/.test(id)) {
          return renderMarkdown(code);
        }
        return null;
      },
    },
    {
      name: "ndjson-loader",
      enforce: "pre",
      transform(code, id) {
        if (/\.ndjson$/.test(id)) {
          return (
            "export default [\n" +
            code
              .split("\n")
              .map((x) => "  " + x.trim())
              .filter((x) => x.length > 0)
              .join(",\n") +
            "\n];"
          );
        }
        return null;
      },
    },
  ],
  build: {
    sourcemapExclude: [/\.md$/, /\.ndjson$/], // exclude Markdown and NDJSON files from sourcemaps
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "about.html"),
        manual: resolve(__dirname, "manual.html"),
        manualFr: resolve(__dirname, "manual-fr.html"),
        dev: resolve(__dirname, "dev/index.html"),
        exportFormat: resolve(__dirname, "dev/export-format.html"),
        releases: resolve(__dirname, "releases.html"),
      },
    },
  },
});
