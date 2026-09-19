import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Mail } from "lucide-react";
import { services, ui } from "../../../data/resume";
import { normalizeLang, resumePath, useLangSafe } from "../../../lib/lang";
import { resumeHead } from "../../../lib/seo";

export const Route = createFileRoute("/resume/$lang/services")({
	head: ({ params }) => {
		const lang = normalizeLang(params.lang);
		return resumeHead(lang, "services/", ui[lang].servicesTitle);
	},
	component: ServicesPage,
});

function ServicesPage() {
	const { lang, t } = useLangSafe();

	return (
		<section className="py-16 lg:py-20">
			<div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
				<p className="mb-5 inline-flex items-center gap-2 font-mono text-xs text-info">
					<span className="size-2 rounded-full bg-success ring-4 ring-success/20" />
					{t.servicesSubtitle}
				</p>
				<h1 className="mb-3 text-[clamp(1.9rem,4vw,2.6rem)] font-bold tracking-tight text-fg-strong">
					{t.servicesTitle}
				</h1>
				<p className="max-w-2xl text-fg-muted">{t.servicesIntro}</p>

				<div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{services[lang].map((service) => (
						<article
							key={service.title}
							className="reveal rounded-xl border border-line bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-line-strong"
						>
							<h2 className="font-semibold text-fg-strong">{service.title}</h2>
							<p className="mt-2 text-sm text-fg-muted">
								{service.description}
							</p>
						</article>
					))}
				</div>

				<div className="reveal relative mt-12 overflow-hidden rounded-2xl border border-line bg-surface p-8 text-center">
					<div className="cta-glow pointer-events-none absolute inset-0 opacity-25" />
					<div className="relative">
						<p className="mb-6 text-fg-muted">{t.contactSubtitle}</p>
						<div className="flex flex-wrap justify-center gap-3">
							<Link
								to={resumePath(lang, "contact")}
								className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-hover"
							>
								<Mail className="size-4" />
								{t.nav.contact}
							</Link>
							<Link
								to={resumePath(lang)}
								className="inline-flex items-center gap-2 rounded-xl border border-line-strong bg-chip px-5 py-2.5 text-sm font-semibold text-fg transition-colors hover:border-primary hover:text-fg-strong"
							>
								<ArrowRight className="size-4" />
								{t.nav.cv}
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
