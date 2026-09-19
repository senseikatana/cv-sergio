import { useParams } from "@tanstack/react-router";
import { type Lang, langs, resume, ui } from "../data/resume";

export function normalizeLang(value: unknown): Lang {
	return value === "ca" || value === "en" ? value : "es";
}

export function useLang() {
	const params = useParams({ strict: false }) as { lang?: string };
	const lang = normalizeLang(params.lang);

	return {
		lang,
		t: ui[lang],
		r: resume[lang],
		htmlLang: langs.find((l) => l.code === lang)?.htmlLang ?? "es-ES",
	};
}

export function resumePath(lang: string, path = "") {
	return `/resume/${lang}/${path}`;
}
