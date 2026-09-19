import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import type { ReactNode } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { meta } from "../data/resume";
import { useLangSafe } from "../lib/lang";
import { useRevealObserver } from "../lib/reveal";
import appCss from "../styles.css?url";

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('cv-theme');var mode=stored==='light'?'light':'dark';var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(mode);root.style.colorScheme=mode;}catch(e){document.documentElement.classList.add('dark');}})();`;

const PERSON_LD = JSON.stringify({
	"@context": "https://schema.org",
	"@type": "Person",
	name: meta.name,
	email: meta.email,
	telephone: meta.phone,
	url: `${meta.siteUrl}/resume/es/`,
	image: `${meta.siteUrl}/resume/cv/sergio-jurado.jpg`,
	sameAs: [meta.linkedin, meta.github],
	address: {
		"@type": "PostalAddress",
		addressLocality: "Cambrils",
		addressRegion: "Tarragona",
		addressCountry: "ES",
	},
});

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: "Sergio Jurado Casado — CV" },
			{ name: "theme-color", content: "#11151c" },
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{ rel: "icon", type: "image/svg+xml", href: "/resume/favicon.svg" },
		],
		scripts: [{ type: "application/ld+json", children: PERSON_LD }],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
	const { htmlLang, t } = useLangSafe();

	useRevealObserver();

	return (
		<html lang={htmlLang} className="dark" suppressHydrationWarning>
			<head>
				<script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
				<HeadContent />
			</head>
			<body className="font-sans antialiased">
				<a href="#main" className="skip-link">
					{t.skipToContent}
				</a>
				<Header />
				<main id="main">{children}</main>
				<Footer />
				<Scripts />
			</body>
		</html>
	);
}
