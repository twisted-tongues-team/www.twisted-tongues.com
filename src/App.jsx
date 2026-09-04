import "@fontsource/lato/400.css";
import "@fontsource/lato/400-italic.css";
import "@fontsource/lato/700.css";
import "./App.css";
import { TwistedTonguesLogo } from "./svgs";
import AboutRenderedHTML from "./about.md";
import ManualRenderedHTML, { headings as manualHeadings } from "./manual.md";
import ManualFrRenderedHTML, {
  headings as manualFrHeadings,
} from "./manual.fr.md";
import ReleasesJSON from "./releases.ndjson";
import ExportFormatRenderedHTML from "./export-format.md";
import ExportFormatRulesRenderedHTML from "./export-format-rules.md";
import DevRenderedHTML from "./dev.md";
import { MarkdownWithLightbox } from "./figure-lightbox";
import { ManualToc } from "./manual-toc";
import { SchemaExplorer } from "./schema-explorer";

const APP_URL = "https://app.twisted-tongues.com/";

const NAV = [
  { key: "about", name: "About", href: "/about" },
  { key: "manual", name: "Manual", href: "/manual" },
  // "Developers" names the audience rather than one document: the Manual is
  // for people using the app, this is for people writing code against it.
  // /dev is the index; everything under it is a page of its own.
  { key: "dev", name: "Developers", href: "/dev/" },
  { key: "releases", name: "Releases", href: "/releases" },
];

function SiteNav({ page, extra }) {
  return (
    <header className="site-nav">
      <a
        className="site-brand"
        href="/"
        aria-current={page === "main" ? "page" : undefined}
      >
        <TwistedTonguesLogo width="28px" />
        <span>Twisted Tongues</span>
      </a>
      <nav className="site-links" aria-label="Site">
        {NAV.map((x) => (
          <a
            key={x.key}
            href={x.href}
            aria-current={x.key === page ? "page" : undefined}
          >
            {x.name}
          </a>
        ))}
      </nav>
      <div className="site-nav-end">
        {extra}
        <a className="button button-small" href={APP_URL}>
          Open the app
        </a>
      </div>
    </header>
  );
}

function Page({ page, title, extra, children }) {
  return (
    <>
      <SiteNav page={page} extra={extra} />
      <main className="page">
        <h1 className="page-title">{title}</h1>
        {children}
      </main>
    </>
  );
}

export function Main() {
  return (
    <>
      <SiteNav page="main" />
      <main className="home">
        <TwistedTonguesLogo width="128px" />
        <h1 className="home-title">Twisted Tongues</h1>
        <p className="home-tagline">
          An online database management tool for linguistic fieldworkers
        </p>
        <a className="button button-large" href={APP_URL}>
          Open Twisted Tongues
          <span aria-hidden="true">→</span>
        </a>
        <p className="home-links">
          <a href="/manual">Read the manual</a>
          <a href="/about">About the project</a>
        </p>
      </main>
    </>
  );
}

export function About() {
  return (
    <Page page="about" title="About">
      <MarkdownWithLightbox html={AboutRenderedHTML} className="prose" />
    </Page>
  );
}

// The manual in either language: the same layout, with the text column and
// the table of contents built from that text's own headings.
function ManualPage({ title, html, headings, tocLabel, otherLanguage }) {
  return (
    <>
      <SiteNav page="manual" extra={otherLanguage} />
      <main className="manual">
        <h1 className="page-title manual-title">{title}</h1>
        <ManualToc headings={headings} label={tocLabel} />
        <MarkdownWithLightbox html={html} className="prose manual-body" />
      </main>
    </>
  );
}

export function Manual() {
  return (
    <ManualPage
      title="Manual"
      html={ManualRenderedHTML}
      headings={manualHeadings}
      tocLabel="Contents"
      otherLanguage={
        <a className="site-lang" href="/manual-fr" hrefLang="fr" lang="fr">
          Français
        </a>
      }
    />
  );
}

export function ManualFr() {
  return (
    <ManualPage
      title="Manuel"
      html={ManualFrRenderedHTML}
      headings={manualFrHeadings}
      tocLabel="Table des matières"
      otherLanguage={
        <a className="site-lang" href="/manual" hrefLang="en" lang="en">
          English
        </a>
      }
    />
  );
}

// The three files a reader of the format might actually want to take away.
// They are served straight out of public/ -- the same bytes the app repo
// tests against, vendored by scripts/sync-tt-export.mjs -- so what someone
// downloads here is the file itself, not a transcription of it.
const TOOLKIT = [
  {
    href: "/schemas/tt-export-v2.json",
    name: "tt-export.schema.json",
    title: "JSON Schema",
    blurb:
      "The authoritative description of every line and every field. Point a validator at it, or read it as the reference.",
  },
  {
    href: "/tt-export/tt_export.py",
    name: "tt_export.py",
    title: "Python reader",
    blurb:
      "Standard library only, one file to copy next to your script. Gives you passages, sentences, and the links between them.",
  },
  {
    href: "/tt-export/tt-export.d.ts",
    name: "tt-export.d.ts",
    title: "TypeScript types",
    blurb:
      "Types for every shape in the format, for editors and type-checkers. No runtime code.",
  },
];

function Toolkit() {
  return (
    <div className="toolkit">
      {TOOLKIT.map((tool) => (
        <a className="toolkit-card" href={tool.href} key={tool.href} download>
          <div className="toolkit-title">{tool.title}</div>
          <code className="toolkit-name">{tool.name}</code>
          <p className="toolkit-blurb">{tool.blurb}</p>
          <span className="toolkit-download">Download</span>
        </a>
      ))}
    </div>
  );
}

export function Dev() {
  return (
    <Page page="dev" title="Developers">
      <MarkdownWithLightbox html={DevRenderedHTML} className="prose" />
    </Page>
  );
}

export function ExportFormat() {
  return (
    <Page page="dev" title="The export format">
      <div className="prose">
        <MarkdownWithLightbox html={ExportFormatRenderedHTML} />
        <Toolkit />
        <MarkdownWithLightbox html={ExportFormatRulesRenderedHTML} />
        <SchemaExplorer />
      </div>
    </Page>
  );
}

export function Releases() {
  const releases = Array.from(ReleasesJSON);
  releases.reverse();
  return (
    <Page page="releases" title="Past releases">
      <ol className="releases">
        {releases.map((r) => (
          <li key={r.tag} id={r.tag} className="release">
            <time className="release-date" dateTime={r.date}>
              {r.date}
            </time>
            <div>
              <h2 className="release-tag">{r.tag}</h2>
              <p className="release-description">{r.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </Page>
  );
}
