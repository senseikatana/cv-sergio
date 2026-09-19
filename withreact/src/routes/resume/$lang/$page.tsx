import {
	createFileRoute,
	Link,
	notFound,
	redirect,
} from "@tanstack/react-router";
import {
	ArrowLeft,
	ArrowRight,
	Briefcase,
	Check,
	Download,
	Github,
	Linkedin,
	Mail,
	MapPin,
	MessageCircle,
	Phone,
	Send,
	Sparkles,
	User,
} from "lucide-react";
import {
	meta,
	type ProfileId,
	profileIds,
	profiles,
	services,
	ui,
} from "../../../data/resume";
import { normalizeLang, resumePath, useLang } from "../../../lib/lang";
import { resumeHead } from "../../../lib/seo";

const redirectPages = ["about", "shop"];
const staticPages = ["services", "contact"];
const validPages = [...staticPages, ...profileIds, ...redirectPages];

function isProfileId(value: string): value is ProfileId {
	return (profileIds as string[]).includes(value);
}

export const Route = createFileRoute("/resume/$lang/$page")({
	beforeLoad: ({ params }) => {
		if (!validPages.includes(params.page)) {
			throw notFound();
		}
		if (redirectPages.includes(params.page)) {
			throw redirect({
				to: "/resume/$lang",
				params: { lang: params.lang },
				statusCode: 301,
			});
		}
	},
	head: ({ params }) => {
		const lang = normalizeLang(params.lang);
		const t = ui[lang];
		const title = isProfileId(params.page)
			? profiles[params.page][lang].title
			: params.page === "services"
				? t.servicesTitle
				: t.contactTitle;
		return resumeHead(lang, `${params.page}/`, title);
	},
	component: Page,
});

function Page() {
	const { page } = Route.useParams();

	if (isProfileId(page)) return <ProfilePage profileId={page} />;
	if (page === "services") return <ServicesPage />;
	return <ContactPage />;
}

const itemClass =
	"flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 text-sm transition-all hover:translate-x-1 hover:border-line-strong";

function ServicesPage() {
	const { lang, t } = useLang();

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

function ContactPage() {
	const { t } = useLang();

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

function ProfilePage({ profileId }: { profileId: ProfileId }) {
	const { lang, t } = useLang();
	const profile = profiles[profileId][lang];

	return (
		<section className="py-16 lg:py-20">
			<div className="mx-auto w-full max-w-3xl px-5 sm:px-8">
				<p className="mb-5 inline-flex items-center gap-2 font-mono text-xs text-info">
					<span className="size-2 rounded-full bg-success ring-4 ring-success/20" />
					{meta.name} · {meta.location}
				</p>
				<h1 className="mb-2 text-[clamp(1.9rem,4vw,2.6rem)] font-bold tracking-tight text-fg-strong">
					{profile.title}
				</h1>
				<p className="mb-4 text-lg font-medium text-info">{profile.role}</p>
				<p className="text-fg-muted">{profile.description}</p>

				<h2 className="reveal mt-12 mb-4 flex items-center gap-3 text-2xl font-bold tracking-tight text-fg-strong">
					<User className="size-6 text-primary" />
					{t.sectionProfile}
				</h2>
				<p className="reveal leading-relaxed text-fg">{profile.about}</p>

				<h2 className="reveal mt-12 mb-4 flex items-center gap-3 text-2xl font-bold tracking-tight text-fg-strong">
					<Sparkles className="size-6 text-primary" />
					{t.profileSkills}
				</h2>
				<div className="reveal flex flex-wrap gap-2">
					{profile.skills.map((skill) => (
						<span
							key={skill}
							className="rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-xs text-fg"
						>
							{skill}
						</span>
					))}
				</div>

				<h2 className="reveal mt-12 mb-6 flex items-center gap-3 text-2xl font-bold tracking-tight text-fg-strong">
					<Briefcase className="size-6 text-primary" />
					{t.profileExperience}
				</h2>
				<div className="space-y-9">
					{profile.experience.map((exp) => (
						<article
							key={`${exp.company}-${exp.period}`}
							className="reveal relative border-l-2 border-secondary/45 pl-6"
						>
							<span className="absolute -left-[0.47rem] top-1.5 size-3 rounded-full bg-secondary ring-4 ring-secondary/15" />
							<div className="rounded-xl border border-transparent p-4 transition-colors hover:border-line hover:bg-surface">
								<div className="mb-1 flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
									<h3 className="text-lg font-semibold text-fg-strong">
										{exp.role}
									</h3>
									<span className="font-mono text-xs text-fg-subtle">
										{exp.period}
									</span>
								</div>
								<p className="mb-2.5 text-sm text-info">{exp.company}</p>
								<ul className="space-y-2">
									{exp.highlights.map((item) => (
										<li
											key={item}
											className="flex gap-2 text-sm leading-relaxed text-fg"
										>
											<Check className="mt-0.5 size-4 shrink-0 text-secondary" />
											<span>{item}</span>
										</li>
									))}
								</ul>
							</div>
						</article>
					))}
				</div>

				<div className="reveal mt-12 flex flex-wrap gap-3">
					<Link
						to={resumePath(lang)}
						className="inline-flex items-center gap-2 rounded-xl border border-line-strong bg-chip px-5 py-2.5 text-sm font-semibold text-fg transition-colors hover:border-primary hover:text-fg-strong"
					>
						<ArrowLeft className="size-4" />
						{t.backToCv}
					</Link>
					<a
						href={`mailto:${meta.email}`}
						className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-hover"
					>
						<Mail className="size-4" />
						{t.profileContact}
					</a>
					<a
						href={meta.pdfUrl}
						download="CV_sergio-jurado.pdf"
						className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-info transition-colors hover:text-fg-strong"
					>
						<Download className="size-4" />
						{t.downloadPdf}
					</a>
				</div>
			</div>
		</section>
	);
}
