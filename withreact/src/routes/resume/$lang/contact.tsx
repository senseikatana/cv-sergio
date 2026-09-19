import { createFileRoute } from "@tanstack/react-router";
import {
	Github,
	Linkedin,
	Mail,
	MapPin,
	MessageCircle,
	Phone,
	Send,
} from "lucide-react";
import { meta, ui } from "../../../data/resume";
import { normalizeLang, useLangSafe } from "../../../lib/lang";
import { resumeHead } from "../../../lib/seo";

export const Route = createFileRoute("/resume/$lang/contact")({
	head: ({ params }) => {
		const lang = normalizeLang(params.lang);
		return resumeHead(lang, "contact/", ui[lang].contactTitle);
	},
	component: ContactPage,
});

const itemClass =
	"flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 text-sm transition-all hover:translate-x-1 hover:border-line-strong";

function ContactPage() {
	const { t } = useLangSafe();

	const whatsappUrl = `https://wa.me/${meta.whatsapp}?text=${encodeURIComponent(t.whatsappPrefill)}`;

	return (
		<section className="py-16 lg:py-20">
			<div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
				<p className="mb-5 inline-flex items-center gap-2 font-mono text-xs text-info">
					<span className="size-2 rounded-full bg-success ring-4 ring-success/20" />
					{t.contactSubtitle}
				</p>
				<h1 className="mb-3 text-[clamp(1.9rem,4vw,2.6rem)] font-bold tracking-tight text-fg-strong">
					{t.contactTitle}
				</h1>
				<p className="max-w-2xl text-fg-muted">{t.contactIntro}</p>

				<div className="mt-10 grid gap-10 md:grid-cols-2 md:items-start">
					<div className="reveal grid gap-3">
						<a href={`mailto:${meta.email}`} className={itemClass}>
							<Mail className="size-4 text-secondary" />
							{meta.email}
						</a>
						<a
							href={`tel:${meta.phone.replace(/\s/g, "")}`}
							className={itemClass}
						>
							<Phone className="size-4 text-secondary" />
							{meta.phone}
						</a>
						<span className={itemClass}>
							<MapPin className="size-4 text-secondary" />
							{meta.location}
						</span>
						<a
							href={meta.linkedin}
							target="_blank"
							rel="noopener"
							className={itemClass}
						>
							<Linkedin className="size-4 text-secondary" />
							LinkedIn
						</a>
						<a
							href={meta.github}
							target="_blank"
							rel="noopener"
							className={itemClass}
						>
							<Github className="size-4 text-secondary" />
							GitHub
						</a>
						<a
							href={whatsappUrl}
							target="_blank"
							rel="noopener"
							className={itemClass}
						>
							<MessageCircle className="size-4 text-secondary" />
							{t.whatsappCta} · {t.whatsappSub}
						</a>
					</div>

					<form
						className="reveal flex flex-col gap-3"
						action={`mailto:${meta.email}`}
						method="POST"
						encType="text/plain"
					>
						<p className="text-fg-muted">{t.orWrite}</p>
						<input
							name="nombre"
							placeholder={t.formName}
							required
							className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-fg placeholder:text-fg-subtle focus:outline-none focus:ring-2 focus:ring-info/60"
						/>
						<input
							name="email"
							type="email"
							placeholder={t.formEmail}
							required
							className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-fg placeholder:text-fg-subtle focus:outline-none focus:ring-2 focus:ring-info/60"
						/>
						<textarea
							name="mensaje"
							placeholder={t.formMsg}
							rows={5}
							required
							className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-fg placeholder:text-fg-subtle focus:outline-none focus:ring-2 focus:ring-info/60"
						/>
						<button
							type="submit"
							className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-hover"
						>
							<Send className="size-4" />
							{t.send}
						</button>
					</form>
				</div>
			</div>
		</section>
	);
}
