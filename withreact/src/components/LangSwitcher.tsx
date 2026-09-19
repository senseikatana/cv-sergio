import { Link, useRouterState } from "@tanstack/react-router";
import { langs } from "../data/resume";
import { useLangSafe } from "../lib/lang";

export default function LangSwitcher() {
	const { lang } = useLangSafe();
	const pathname = useRouterState({
		select: (state) => state.location.pathname,
	});

	const linkFor = (code: string) => {
		const segments = pathname.split("/").filter(Boolean);
		if (segments.length > 1) {
			segments[1] = code;
		}
		return `/${segments.join("/")}/`;
	};

	return (
		<nav
			className="flex gap-0.5 rounded-full border border-line bg-chip p-0.5"
			aria-label="Idioma"
		>
			{langs.map((l) => (
				<Link
					key={l.code}
					to={linkFor(l.code)}
					hreflang={l.code}
					className={`rounded-full px-2 py-0.5 font-mono text-[0.7rem] font-semibold transition-colors ${
						l.code === lang
							? "bg-primary text-on-primary"
							: "text-fg-subtle hover:text-fg-strong"
					}`}
				>
					{l.label}
				</Link>
			))}
		</nav>
	);
}
