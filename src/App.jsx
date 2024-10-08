import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { Button, Icon, Container, Header, Menu } from "semantic-ui-react";
import { TwistedTonguesLogo } from "./svgs";
import AboutRenderedHTML from "./about.md"
import ManualRenderedHTML from "./manual.md"

function MenuOnPage(page) {
  const items = [
    { key: "main", name: "Home", href: "." },
    { key: "about", name: "About", href: "about" },
    { key: "manual", name: "Manual", href: "manual" },
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
