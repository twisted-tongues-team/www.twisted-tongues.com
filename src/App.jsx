import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { Button, Icon, Container, Header, Menu } from "semantic-ui-react";
import { TwistedTonguesLogo } from "./svgs";

function MenuOnPage(page) {
  const items = [
    { key: "main", name: "Home", href: "." },
    { key: "about", name: "About", href: "about" },
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
      <Container textAlign="center">
				<Button icon labelPosition="right" as="a" href="https://twisted-tongues-beta.appspot.com/">
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
        <Header as="h2"> What is it? </Header>
        Twisted Tongues is a web application for documenting and glossing texts
        in multiple languages. It provides various features:
        <ul>
          <li>Online data storage, convenient for collaborative data entry.</li>
          <li>Automatic construction of concordance from glosses.</li>
          <li>Easy export to latex (tipa) or tab separated tables.</li>
          <li>Mass find/replace across the project.</li>
        </ul>
        <Header as="h2"> Who has access to the data? </Header>
        The data of a given project is only accessible by other users you have
        explicitly added to the project (collaborators are added by e-mail).
        Database administrators will only access data during maintenance
        operations.
        <Header as="h2"> What technologies are used? </Header>
        <ul>
          <li>Google Oauth is used for authentication. (Login with Google)</li>
          <li>
            Cookies are used to store authentication information (sessions for
            authentication)
          </li>
          <li>Language data is stored in an IBM Cloudant instance</li>
          <li>
            The webapp is running in AppEngine, an offering that is part of
            Google cloud platform.
          </li>
          <li>
            Periodic backups are taken and placed in Google cloud storage or
            Amazon web services S3.
          </li>
          <li>
            As features are added, additional Amazon Web Services (AWS) and
            Google Cloud platform (GCP) products may be used.
          </li>
        </ul>
      </Container>
    </>
  );
}
