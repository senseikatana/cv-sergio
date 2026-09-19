import { createFileRoute, Link } from "@tanstack/react-router";
import {
	Briefcase,
	Check,
	CircleCheck,
	Download,
	Github,
	GraduationCap,
	Heart,
	Info,
	Languages,
	Linkedin,
	Mail,
	MapPin,
	MessageCircle,
	Phone,
	Sparkles,
	User,
	Wrench,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
	meta,
	profileIds,
	profiles,
	resume,
	sections,
} from "../../../data/resume";
import { useLang } from "../../../lib/lang";
import { useRevealObserver } from "../../../lib/reveal";
import { resumeHead } from "../../../lib/seo";

export const Route = createFileRoute("/resume/$lang/")({
	head: ({ params }) => {
		const lang =
			params.lang === "ca" || params.lang === "en" ? params.lang : "es";
		return resumeHead(lang, "", resume[lang].title);
	},
	component: ResumePage,
});

function ResumePage() {
	const { lang, t, r } = useLang();
	const tabs = sections[lang];
	const [active, setActive] = useState("perfil");

	useRevealObserver();

	useEffect(() => {
		const ids = tabs.map((section) => section.id);
		const elements = ids
			.map((id) => document.getElementById(id))
			.filter((el): el is HTMLElement => Boolean(el));

		if (!("IntersectionObserver" in window) || !elements.length) return;

		const visible = new Map<string, boolean>();
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) =>
					visible.set(entry.target.id, entry.isIntersecting),
				);
				const current = ids.filter((id) => visible.get(id)).pop();
				if (current) setActive(current);
			},
			{ rootMargin: "-30% 0px -60% 0px", threshold: 0 },
		);

		elements.forEach((el) => observer.observe(el));
		return () => observer.disconnect();
	}, [tabs]);

	const whatsappUrl = `https://wa.me/${meta.whatsapp}?text=${encodeURIComponent(t.whatsappPrefill)}`;
	const tabIcons = {
		user: User,
		briefcase: Briefcase,
		"graduation-cap": GraduationCap,
		sparkles: Sparkles,
		info: Info,
	} as const;

	return (
		<div>
			{/* Hero */}
			<section className="relative overflow-hidden py-16 lg:py-24">
				<div className="absolute inset-0 bg-gradient-to-br from-bg to-bg-alt" />
				<div className="hero-glow absolute inset-0 opacity-40" />

				<div className="relative mx-auto flex w-full max-w-6xl flex-col-reverse gap-10 px-5 sm:px-8 lg:flex-row lg:items-center lg:gap-16">
					<div className="flex-1">
						<p className="mb-5 inline-flex items-center gap-2 font-mono text-xs text-info">
							<span className="size-2 rounded-full bg-success ring-4 ring-success/20" />
							senseikatana.com/resume/{lang}
						</p>

						<h1 className="mb-3 text-[clamp(2.1rem,5vw,3.4rem)] font-bold leading-[1.08] tracking-tight text-fg-strong">
							{t.heroGreeting}{" "}
							<em className="not-italic text-primary">{r.name}</em>
						</h1>

						<p className="mb-4 text-lg font-medium text-info md:text-xl">
							{r.title}
						</p>
						<p className="mb-7 max-w-2xl text-fg-muted">{t.heroIntro}</p>

						<div className="mb-6 flex flex-wrap gap-2">
							<span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-chip px-2.5 py-1 text-xs text-fg-muted">
								<MapPin className="size-3.5 text-secondary" />
								{r.location}
							</span>
							<a
								href={`tel:${meta.phone.replace(/\s/g, "")}`}
								className="inline-flex items-center gap-1.5 rounded-full border border-line bg-chip px-2.5 py-1 text-xs text-fg-muted transition-colors hover:border-line-strong hover:text-fg-strong"
							>
								<Phone className="size-3.5 text-secondary" />
								{meta.phone}
							</a>
							<a
								href={`mailto:${meta.email}`}
								className="inline-flex items-center gap-1.5 rounded-full border border-line bg-chip px-2.5 py-1 text-xs text-fg-muted transition-colors hover:border-line-strong hover:text-fg-strong"
							>
								<Mail className="size-3.5 text-secondary" />
								{meta.email}
							</a>
							<a
								href={meta.linkedin}
								target="_blank"
								rel="noopener"
								className="inline-flex items-center gap-1.5 rounded-full border border-line bg-chip px-2.5 py-1 text-xs text-fg-muted transition-colors hover:border-line-strong hover:text-fg-strong"
							>
								<Linkedin className="size-3.5 text-secondary" />
								LinkedIn
							</a>
							<a
								href={meta.github}
								target="_blank"
								rel="noopener"
								className="inline-flex items-center gap-1.5 rounded-full border border-line bg-chip px-2.5 py-1 text-xs text-fg-muted transition-colors hover:border-line-strong hover:text-fg-strong"
							>
								<Github className="size-3.5 text-secondary" />
								GitHub
							</a>
						</div>

						{r.note ? (
							<p className="mb-7 flex items-center gap-1.5 text-xs text-fg-subtle">
								<Info className="size-3.5 text-info" />
								{r.note}
							</p>
						) : null}

						<div className="flex flex-wrap gap-3">
							<a
								href={meta.pdfUrl}
								download="CV_sergio-jurado.pdf"
								className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-hover"
							>
								<Download className="size-4" />
								{t.downloadPdf}
							</a>
							<a
								href="#perfiles"
								className="inline-flex items-center gap-2 rounded-xl border border-line-strong bg-chip px-5 py-2.5 text-sm font-semibold text-fg transition-colors hover:border-primary hover:text-fg-strong"
							>
								{t.viewProfiles}
							</a>
						</div>
					</div>

					<div className="shrink-0 self-start">
						<img
							src="/resume/cv/sergio-jurado.jpg"
							alt={`Retrato de ${r.name}`}
							width="1154"
							height="1732"
							className="h-60 w-46 rounded-[1.25rem] border border-line-strong object-cover shadow-2xl transition-transform hover:-translate-y-1 hover:-rotate-1 md:h-72 md:w-56"
						/>
					</div>
				</div>
			</section>

			{/* Tabs */}
			<nav
				className="sticky top-16 z-40 border-y border-line bg-bg-alt/90 py-2.5 backdrop-blur-md"
				aria-label={t.nav.cv}
			>
				<div className="scrollbar-thin mx-auto flex w-full max-w-6xl gap-2 overflow-x-auto px-5 pb-0.5 sm:px-8">
					{tabs.map((section) => {
						const Icon =
							tabIcons[section.icon as keyof typeof tabIcons] ?? Info;
						return (
							<a
								key={section.id}
								href={`#${section.id}`}
								className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-sm transition-colors ${
									active === section.id
										? "border-primary bg-primary/10 text-fg-strong"
										: "border-line bg-chip text-fg-muted hover:border-line-strong hover:text-fg-strong"
								}`}
								aria-current={active === section.id ? "true" : undefined}
							>
								<span className="font-mono text-[0.7rem] text-primary">
									{section.label}
								</span>
								<Icon className="size-4 text-info" />
								{section.title}
							</a>
						);
					})}
				</div>
			</nav>

			{/* Perfil */}
			<section id="perfil" className="scroll-mt-36 bg-bg-alt py-16">
				<div className="reveal mx-auto w-full max-w-3xl px-5 sm:px-8">
					<h2 className="mb-5 flex items-center gap-3 text-2xl font-bold tracking-tight text-fg-strong md:text-3xl">
						<User className="size-6 text-primary" />
						{t.sectionProfile}
					</h2>
					<p className="text-lg leading-relaxed text-fg">{r.summary}</p>
				</div>
			</section>

			{/* Experiencia */}
			<section id="experiencia" className="scroll-mt-36 bg-bg py-16">
				<div className="mx-auto w-full max-w-3xl px-5 sm:px-8">
					<h2 className="reveal mb-2 flex items-center gap-3 text-2xl font-bold tracking-tight text-fg-strong md:text-3xl">
						<Briefcase className="size-6 text-primary" />
						{t.sectionExperience}
					</h2>
					<p className="reveal mb-9 text-fg-muted">{t.experienceSubtitle}</p>

					<div className="space-y-9">
						{r.experience.map((exp) => (
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
									<p className="mb-1.5 text-sm text-info">{exp.company}</p>
									<p className="mb-2.5 text-sm text-fg-muted">
										{exp.description}
									</p>
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
				</div>
			</section>

			{/* Formación */}
			<section id="formacion" className="scroll-mt-36 bg-bg-alt py-16">
				<div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
					<h2 className="reveal mb-6 flex items-center gap-3 text-2xl font-bold tracking-tight text-fg-strong md:text-3xl">
						<GraduationCap className="size-6 text-primary" />
						{t.sectionEducation}
					</h2>

					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{r.education.map((edu) => (
							<div
								key={`${edu.degree}-${edu.period}`}
								className="reveal rounded-xl border border-line bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-line-strong"
							>
								<div className="mb-1 flex items-baseline justify-between gap-3">
									<h3 className="font-semibold text-fg-strong">{edu.degree}</h3>
									<span className="shrink-0 font-mono text-xs text-fg-subtle">
										{edu.period}
									</span>
								</div>
								<p className="text-sm text-info">{edu.institution}</p>
								{edu.note ? (
									<p className="mt-1 text-sm text-fg-subtle">{edu.note}</p>
								) : null}
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Skills */}
			<section id="skills" className="scroll-mt-36 bg-bg py-16">
				<div className="mx-auto w-full max-w-3xl px-5 sm:px-8">
					<h2 className="reveal mb-6 flex items-center gap-3 text-2xl font-bold tracking-tight text-fg-strong md:text-3xl">
						<Sparkles className="size-6 text-primary" />
						{t.sectionSkills}
					</h2>

					<div className="mb-10 grid gap-10 md:grid-cols-2">
						<div className="reveal">
							<h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-fg-strong">
								<Heart className="size-4 text-primary" />
								{t.softSkills}
							</h3>
							<ul className="space-y-3">
								{r.softSkills.map((skill) => (
									<li key={skill} className="flex gap-2 text-sm text-fg">
										<Heart className="mt-0.5 size-4 shrink-0 text-primary" />
										<span>{skill}</span>
									</li>
								))}
							</ul>
						</div>
						<div className="reveal">
							<h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-fg-strong">
								<Wrench className="size-4 text-info" />
								{t.hardSkills}
							</h3>
							<ul className="space-y-3">
								{r.hardSkills.map((skill) => (
									<li key={skill} className="flex gap-2 text-sm text-fg">
										<Wrench className="mt-0.5 size-4 shrink-0 text-info" />
										<span>{skill}</span>
									</li>
								))}
							</ul>
						</div>
					</div>

					<h3 className="reveal mb-4 flex items-center gap-2 text-lg font-semibold text-fg-strong">
						<Languages className="size-4 text-info" />
						{t.languages}
					</h3>
					<div className="reveal flex flex-wrap gap-3">
						{r.languages.map((language) => (
							<div
								key={language.name}
								className="rounded-xl border border-line bg-surface px-4 py-2 text-sm"
							>
								<span className="font-medium text-fg-strong">
									{language.name}
								</span>
								<span className="text-fg-subtle"> · {language.level}</span>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Disponibilidad */}
			<section id="extra" className="scroll-mt-36 bg-bg-alt py-16">
				<div className="mx-auto w-full max-w-3xl px-5 sm:px-8">
					<h2 className="reveal mb-6 flex items-center gap-3 text-2xl font-bold tracking-tight text-fg-strong md:text-3xl">
						<Info className="size-6 text-primary" />
						{t.sectionAvailability}
					</h2>
					<ul className="reveal space-y-4">
						{r.additional.map((item) => (
							<li key={item} className="flex gap-3 leading-relaxed text-fg">
								<CircleCheck className="mt-1 size-5 shrink-0 text-success" />
								<span>{item}</span>
							</li>
						))}
					</ul>
				</div>
			</section>

			{/* Perfiles + CTA */}
			<section id="perfiles" className="scroll-mt-36 bg-bg py-16">
				<div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
					<h2 className="reveal mb-2 flex items-center gap-3 text-2xl font-bold tracking-tight text-fg-strong md:text-3xl">
						<Briefcase className="size-6 text-primary" />
						{t.profilesTitle}
					</h2>
					<p className="reveal mb-8 text-fg-muted">{t.profilesSubtitle}</p>

					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{profileIds.map((id) => (
							<Link
								key={id}
								to="/resume/$lang/$profile"
								params={{ lang, profile: id }}
								className="reveal group flex flex-col rounded-xl border border-line bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-line-strong"
							>
								<h3 className="font-semibold text-fg-strong">
									{profiles[id][lang].title}
								</h3>
								<p className="mt-1 text-sm text-fg-muted">
									{profiles[id][lang].description}
								</p>
								<span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-primary transition-all group-hover:gap-2.5">
									{t.viewProfile}
									<span aria-hidden="true">→</span>
								</span>
							</Link>
						))}
					</div>

					<div className="reveal relative mt-12 overflow-hidden rounded-2xl border border-line bg-surface p-8 text-center">
						<div className="cta-glow pointer-events-none absolute inset-0 opacity-25" />
						<div className="relative">
							<p className="mb-6 text-fg-muted">{t.ctaText}</p>
							<div className="flex flex-wrap justify-center gap-3">
								<a
									href={meta.pdfUrl}
									download="CV_sergio-jurado.pdf"
									className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-hover"
								>
									<Download className="size-4" />
									{t.downloadPdf}
								</a>
								<a
									href={`mailto:${meta.email}`}
									className="inline-flex items-center gap-2 rounded-xl border border-line-strong bg-chip px-5 py-2.5 text-sm font-semibold text-fg transition-colors hover:border-primary hover:text-fg-strong"
								>
									<Mail className="size-4" />
									{t.sendEmail}
								</a>
								<a
									href={whatsappUrl}
									target="_blank"
									rel="noopener"
									className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-info transition-colors hover:text-fg-strong"
								>
									<MessageCircle className="size-4" />
									{t.whatsappCta}
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
