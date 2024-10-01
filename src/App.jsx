import { useState } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Container, Header, Menu } from 'semantic-ui-react';

function MenuOnPage(page) {
	const items = [
		{ key: 'main', name: 'Home', href: '/' },
		{ key: 'about', name: 'About', href: '/about' },
	];

	return <Menu items={items.map(x => x.key == page ? {active: true, ...x}: x)} />;
}

export function Main() {
  return (
    <>
			{MenuOnPage('main')}
			<Header as="h1" textAlign="center"> Twisted Tongues </Header>
    </>
  )
}

export function About() {
  return (
    <>
			{MenuOnPage('about')}
			<Header as="h1" textAlign="center"> About </Header>
			<Container text>
				<Header as="h2"> What is it? </Header>
					Twisted Tongues is a web application for docuenting and glossing texts in multiple languages.


				<Header as="h2">  </Header>
			</Container>
    </>
  );
}
