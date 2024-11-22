import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { Button, Icon, Container, Header, Menu } from "semantic-ui-react";
import { TwistedTonguesLogo } from "./svgs";
import AboutRenderedHTML from "./about.md"
import ManualRenderedHTML from "./manual.md"
import ReleasesJSON from "./releases.ndjson"

function MenuOnPage(page) {
  const items = [
    { key: "main", name: "Home", href: "." },
    { key: "about", name: "About", href: "about" },
    { key: "manual", name: "Manual", href: "manual" },
    { key: "releases", name: "Releases", href: "releases" },
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
       <Header as="h4" textAlign="center">An online database management tool for linguistic fieldworkers </Header>
      <Container textAlign="center">
				<Button icon labelPosition="right" as="a" href="https://app.twisted-tongues.com/">
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
        <div dangerouslySetInnerHTML={{ __html: AboutRenderedHTML }} />
      </Container>
    </>
  );
}

export function Manual() {
  return (
    <>
      {MenuOnPage("manual")}
      <Header as="h1" textAlign="center">
        Manual
      </Header>
      <Container text>
        <div dangerouslySetInnerHTML={{ __html: ManualRenderedHTML }} />
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
        Upcoming
      </Header>
      <Container text>
        Working on a rewrite of TIPA Rendering.
        
        Specific improvements:
        <ul>
          <li>Improved cases with multiple diacritics (e.g. nasalization + tone markings)</li>
          <li>Expanded support for almost everything in tipaman</li>
          <li>Bufixes around certain replacements with <code>g</code>/<code>!</code>/<code>|</code></li>
        </ul>
      </Container>
      <Header as="h1" textAlign="center">
        Past Releases
      </Header>
      <Container text>
            {
              releases.map((r, i) => {
                return <div key={i} id={r.tag} className="release">
                  <h3>{r.tag}</h3>
                  Date: {r.date}
                  <br />
                  {r.description}
                </div>;
              })
            }
      </Container>
    </>
  );
}
