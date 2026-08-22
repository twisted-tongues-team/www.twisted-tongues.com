import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { Button, Icon, Container, Header, Menu } from "semantic-ui-react";
import { TwistedTonguesLogo } from "./svgs";
import AboutRenderedHTML from "./about.md";
import ManualRenderedHTML from "./manual.md";
import ManualFrRenderedHTML from "./manual.fr.md";
import ReleasesJSON from "./releases.ndjson";
import ExportFormatRenderedHTML from "./export-format.md";
import ExportFormatRulesRenderedHTML from "./export-format-rules.md";
import DevRenderedHTML from "./dev.md";
import { MarkdownWithLightbox } from "./figure-lightbox";
import { SchemaExplorer } from "./schema-explorer";

function MenuOnPage(page, extraItems = []) {
  const items = [
    { key: "main", name: "Home", href: "/" },
    { key: "about", name: "About", href: "/about" },
    { key: "manual", name: "Manual", href: "/manual" },
    // "Developers" names the audience rather than one document: the Manual is
    // for people using the app, this is for people writing code against it.
    // /dev is the index; everything under it is a page of its own.
    { key: "dev", name: "Developers", href: "/dev/" },
    { key: "releases", name: "Releases", href: "/releases" },
    ...extraItems,
  ];

  return (
    <Menu
      items={items.map((x) => (x.key == page ? { active: true, ...x } : x))}
    />
  );
}

export function Main() {
  return (
    <>
      {MenuOnPage("main")}
      <Header as="h1" textAlign="center">
        <TwistedTonguesLogo width="96px" />
        <br />
        Twisted Tongues
      </Header>
      <Header as="h4" textAlign="center">
        An online database management tool for linguistic fieldworkers{" "}
      </Header>
      <Container textAlign="center">
        <Button
          icon
          labelPosition="right"
          as="a"
          href="https://app.twisted-tongues.com/"
        >
          Open
          <Icon name="right arrow" />
        </Button>
      </Container>
    </>
  );
}

export function About() {
  return (
    <>
      {MenuOnPage("about")}
      <Header as="h1" textAlign="center">
        About
      </Header>
      <Container text>
        <MarkdownWithLightbox html={AboutRenderedHTML} />
      </Container>
    </>
  );
}

export function Manual() {
  return (
    <>
      {MenuOnPage("manual", [
        { key: "fr", name: "Français", href: "manual-fr", position: "right" },
      ])}
      <Header as="h1" textAlign="center">
        Manual
      </Header>
      <Container text>
        <MarkdownWithLightbox html={ManualRenderedHTML} />
      </Container>
    </>
  );
}

export function ManualFr() {
  return (
    <>
      {MenuOnPage("manual", [
        { key: "en", name: "English", href: "manual", position: "right" },
      ])}
      <Header as="h1" textAlign="center">
        Manuel
      </Header>
      <Container text>
        <MarkdownWithLightbox html={ManualFrRenderedHTML} />
      </Container>
    </>
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
    <>
      {MenuOnPage("dev")}
      <Header as="h1" textAlign="center">
        Developers
      </Header>
      <Container text>
        <MarkdownWithLightbox html={DevRenderedHTML} />
      </Container>
    </>
  );
}

export function ExportFormat() {
  return (
    <>
      {MenuOnPage("dev")}
      <Header as="h1" textAlign="center">
        The export format
      </Header>
      <Container text>
        <MarkdownWithLightbox html={ExportFormatRenderedHTML} />
        <Toolkit />
        <MarkdownWithLightbox html={ExportFormatRulesRenderedHTML} />
        <SchemaExplorer />
      </Container>
    </>
  );
}

export function Releases() {
  const releases = Array.from(ReleasesJSON);
  releases.reverse();
  return (
    <>
      {MenuOnPage("releases")}
      <Header as="h1" textAlign="center">
        Past Releases
      </Header>
      <Container text>
        {releases.map((r, i) => {
          return (
            <div key={i} id={r.tag} className="release">
              <h3>{r.tag}</h3>
              Date: {r.date}
              <br />
              {r.description}
            </div>
          );
        })}
      </Container>
    </>
  );
}
