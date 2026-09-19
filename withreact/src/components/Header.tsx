import { Link, useRouterState } from "@tanstack/react-router";
import { Github } from "lucide-react";
import { meta } from "../data/resume";
import { resumePath, useLangSafe } from "../lib/lang";
import LangSwitcher from "./LangSwitcher";
import ResumeAssistantButton from "./ResumeAssistantButton";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
	const { lang, t } = useLangSafe();
	const pathname = useRouterState({
		select: (state) => state.location.pathname,
	});

	const navItems = [
		{ path: "", label: t.nav.cv },
		{ path: "services", label: t.nav.services },
		{ path: "contact", label: t.nav.contact },
	];

	const isActive = (path: string) => {
		const href = resumePath(lang, path);
		return path === "" ? pathname === href : pathname.startsWith(href);
	};

	return (
		<header className="sticky top-0 z-50 h-16 border-b border-line bg-header backdrop-blur-md">
			<div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-5 px-5 sm:px-8">
				<Link
					to={resumePath(lang)}
					className="inline-flex items-baseline gap-2 text-lg font-bold tracking-tight text-fg-strong"
				>
					SJ
					<span className="hidden font-mono text-[0.7rem] font-medium text-fg-subtle sm:inline">
						senseikatana/resume
					</span>
				</Link>

				<nav className="hidden flex-1 gap-1.5 md:flex" aria-label="Principal">
					{navItems.map((item) => (
						<Link
							key={item.path}
							to={resumePath(lang, item.path)}
							className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
								isActive(item.path)
									? "bg-chip text-fg-strong"
									: "text-fg-muted hover:bg-chip hover:text-fg-strong"
							}`}
							aria-current={isActive(item.path) ? "page" : undefined}
						>
							{item.label}
						</Link>
					))}
				</nav>

				<div className="ml-auto flex items-center gap-2">
					<LangSwitcher />
					<a
						href={meta.github}
						target="_blank"
						rel="noopener"
						aria-label="GitHub"
						className="hidden size-9 items-center justify-center rounded-full border border-line bg-chip text-fg-muted transition-colors hover:border-line-strong hover:text-fg-strong md:inline-flex"
					>
						<Github className="size-4" />
					</a>
					<ResumeAssistantButton />
					<ThemeToggle />
				</div>
			</div>
		</header>
	);
}
