import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import markdownIt from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';
import markdownItAttrs from 'markdown-it-attrs';

const md = markdownIt({
    html: true,
  }).use(markdownItAttrs, {}).use(markdownItAnchor, {});

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  plugins: [
    react(),
    {
       name: 'markdown-loader',
       enforce: 'pre',
       transform(code, id) {
         if (/\.md$/.test(id)) {
           return `export default \`${md.render(code)}\`;`;
         }
         return null;
       },
     },
  ],
  build: {
    sourcemapExclude: [/\.md$/], // exclude Markdown files from sourcemaps
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "about.html"),
        manual: resolve(__dirname, "manual.html"),
      },
      transform(code, id) {
         if (/\.md$/.test(id)) {
           return md.render(code);
         }
         return code;
      },
    },
  },
});
