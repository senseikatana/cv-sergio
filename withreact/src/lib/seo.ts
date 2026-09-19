import { type Lang, langs, meta, ui } from "../data/resume";

export function resumeHead(lang: Lang, path: string, title: string) {
	const description = ui[lang].seoDescription;
	const url = `${meta.siteUrl}/resume/${lang}/${path}`;

	return {
		meta: [
			{ title },
			{ name: "description", content: description },
			{ property: "og:type", content: "profile" },
			{ property: "og:site_name", content: "senseikatana.com" },
			{ property: "og:title", content: `${title} · ${meta.name}` },
			{ property: "og:description", content: description },
			{ property: "og:url", content: url },
			{
				property: "og:image",
				content: `${meta.siteUrl}/resume/cv/sergio-jurado.jpg`,
			},
			{ name: "twitter:card", content: "summary_large_image" },
		],
		links: [
			{ rel: "canonical", href: url },
			...langs.map((l) => ({
				rel: "alternate",
				hreflang: l.htmlLang,
				href: `${meta.siteUrl}/resume/${l.code}/${path}`,
			})),
			{
				rel: "alternate",
				hreflang: "x-default",
				href: `${meta.siteUrl}/resume/es/${path}`,
			},
		],
	};
}
