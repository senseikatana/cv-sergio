import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
	ArrowLeft,
	Briefcase,
	Check,
	Download,
	Mail,
	Sparkles,
	User,
} from "lucide-react";
import {
	meta,
	type ProfileId,
	profileIds,
	profiles,
	resume,
} from "../../../data/resume";
import { normalizeLang, resumePath, useLangSafe } from "../../../lib/lang";
import { resumeHead } from "../../../lib/seo";

function isProfileId(value: string): value is ProfileId {
	return (profileIds as string[]).includes(value);
}

export const Route = createFileRoute("/resume/$lang/$profile")({
	beforeLoad: ({ params }) => {
		if (!isProfileId(params.profile)) {
			throw notFound();
		}
	},
	head: ({ params }) => {
		const lang = normalizeLang(params.lang);
		const title = isProfileId(params.profile)
			? profiles[params.profile][lang].title
			: resume[lang].title;
		return resumeHead(lang, `${params.profile}/`, title);
	},
	component: ProfilePage,
});

function ProfilePage() {
	const { lang, t } = useLangSafe();
	const { profile: param } = Route.useParams();
	const profile = profiles[param as ProfileId][lang];

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
