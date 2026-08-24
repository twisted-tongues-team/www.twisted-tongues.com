// The build-time renderer: every page's component, addressed by the html file
// it belongs to. scripts/prerender.mjs imports this from the --ssr build and
// bakes the output into dist/.
//
// This module is never loaded in a browser, so the hot-reload rule about
// exporting non-components alongside components does not apply to it.
/* eslint-disable react-refresh/only-export-components */
import { renderToString } from "react-dom/server";
import {
  Main,
  About,
  Manual,
  ManualFr,
  Releases,
  Dev,
  ExportFormat,
} from "./App.jsx";

const PAGES = {
  "index.html": Main,
  "about.html": About,
  "manual.html": Manual,
  "manual-fr.html": ManualFr,
  "releases.html": Releases,
  "dev/index.html": Dev,
  "dev/export-format.html": ExportFormat,
};

export function render(page) {
  const Page = PAGES[page];
  return renderToString(<Page />);
}
export const pages = Object.keys(PAGES);
