import { meta } from "../data/resume";
import { useLangSafe } from "../lib/lang";

export default function Footer() {
	const { t } = useLangSafe();
	const year = new Date().getFullYear();

	return (
		<footer className="border-t border-line bg-bg-alt py-7">
			<div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-5 sm:px-8">
				<span className="text-sm text-fg-subtle">
					© {year} {meta.name} · {t.footerPartOf}
				</span>
				<div className="flex gap-4 text-sm">
					<a
						href={`mailto:${meta.email}`}
						className="text-fg-muted transition-colors hover:text-fg-strong"
					>
						Email
					</a>
					<a
						href={meta.linkedin}
						target="_blank"
						rel="noopener"
						className="text-fg-muted transition-colors hover:text-fg-strong"
					>
						LinkedIn
					</a>
					<a
						href={meta.github}
						target="_blank"
						rel="noopener"
						className="text-fg-muted transition-colors hover:text-fg-strong"
					>
						GitHub
					</a>
				</div>
			</div>
		</footer>
	);
}
