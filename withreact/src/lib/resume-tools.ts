import { toolDefinition } from "@tanstack/ai";
import { z } from "zod";
import { resume } from "../data/resume";

const cv = resume.es;

const jobSchema = z.object({
	role: z.string(),
	company: z.string(),
	period: z.string(),
	description: z.string(),
	highlights: z.array(z.string()),
});

const educationSchema = z.object({
	degree: z.string(),
	institution: z.string(),
	period: z.string(),
	note: z.string().optional(),
});

const searchable = (job: (typeof cv.experience)[number]) =>
	[job.role, job.company, job.description, ...job.highlights]
		.join(" ")
		.toLowerCase();

export const getJobsBySkillToolDef = toolDefinition({
	name: "getJobsBySkill",
	description:
		"Find every role where the candidate used a specific skill, technology or task. Use it to check real experience with a particular requirement.",
	inputSchema: z.object({
		skill: z
			.string()
			.describe(
				'The skill or keyword to search for (e.g. "picking", "forklift", "customer service")',
			),
	}),
	outputSchema: z.array(jobSchema),
});

export const getJobsBySkill = getJobsBySkillToolDef.server(({ skill }) => {
	const query = skill.toLowerCase();
	return cv.experience.filter((job) => searchable(job).includes(query));
});

export const getAllJobsToolDef = toolDefinition({
	name: "getAllJobs",
	description:
		"Get the candidate's complete work history with roles, companies, dates and highlights.",
	inputSchema: z.object({}),
	outputSchema: z.array(jobSchema),
});

export const getAllJobs = getAllJobsToolDef.server(() => cv.experience);

export const getAllEducationToolDef = toolDefinition({
	name: "getAllEducation",
	description: "Get the candidate's full education and training history.",
	inputSchema: z.object({}),
	outputSchema: z.array(educationSchema),
});

export const getAllEducation = getAllEducationToolDef.server(
	() => cv.education,
);

export const searchExperienceToolDef = toolDefinition({
	name: "searchExperience",
	description:
		"Search roles by keyword across title, company, description and highlights. Use it for role types or sectors.",
	inputSchema: z.object({
		query: z
			.string()
			.describe(
				'The search query (e.g. "logistics", "warehouse", "reception")',
			),
	}),
	outputSchema: z.array(
		jobSchema.extend({
			matchedIn: z
				.array(z.string())
				.describe("Which fields matched the search"),
		}),
	),
});

export const searchExperience = searchExperienceToolDef.server(({ query }) => {
	const value = query.toLowerCase();

	return cv.experience
		.map((job) => {
			const matchedIn: string[] = [];
			if (job.role.toLowerCase().includes(value)) matchedIn.push("role");
			if (job.company.toLowerCase().includes(value)) matchedIn.push("company");
			if (job.description.toLowerCase().includes(value))
				matchedIn.push("description");
			if (job.highlights.some((item) => item.toLowerCase().includes(value))) {
				matchedIn.push("highlights");
			}
			return { ...job, matchedIn };
		})
		.filter((job) => job.matchedIn.length > 0);
});
