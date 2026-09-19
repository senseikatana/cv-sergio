import { chat, maxIterations, toServerSentEventsResponse } from "@tanstack/ai";
import { anthropicText } from "@tanstack/ai-anthropic";
import { geminiText } from "@tanstack/ai-gemini";
import { ollamaText } from "@tanstack/ai-ollama";
import { openaiText } from "@tanstack/ai-openai";
import { createFileRoute } from "@tanstack/react-router";
import { meta } from "../../../data/resume";
import {
	getAllEducation,
	getAllJobs,
	getJobsBySkill,
	searchExperience,
} from "../../../lib/resume-tools";

export const Route = createFileRoute("/resume/api/resume-chat")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				const requestSignal = request.signal;

				if (requestSignal.aborted) {
					return new Response(null, { status: 499 });
				}

				const abortController = new AbortController();

				try {
					const body = await request.json();
					const { messages } = body;
					const data = body.data || {};

					const SYSTEM_PROMPT = `You are a helpful resume assistant for recruiters and hiring managers evaluating ${meta.name} (${meta.location}).

CAPABILITIES:
1. getJobsBySkill — find roles where the candidate used a specific skill or task
2. getAllJobs — the candidate's complete work history
3. getAllEducation — education and training background
4. searchExperience — search roles by keyword

INSTRUCTIONS:
- Ground every answer in the tool results. Never invent employers, dates or skills.
- Be professional, concise and honest: if the candidate lacks something, say so constructively.
- Include specific roles and periods when relevant.
- The CV is available in Spanish, Catalan and English at senseikatana.com/resume.`;

					let provider: "anthropic" | "openai" | "gemini" | "ollama" =
						data.provider || "ollama";
					let model: string = data.model || "mistral:7b";

					if (process.env.ANTHROPIC_API_KEY) {
						provider = "anthropic";
						model = "claude-haiku-4-5";
					} else if (process.env.OPENAI_API_KEY) {
						provider = "openai";
						model = "gpt-4o";
					} else if (process.env.GEMINI_API_KEY) {
						provider = "gemini";
						model = "gemini-2.0-flash-exp";
					}

					const adapterConfig = {
						anthropic: () => anthropicText(model as never),
						openai: () => openaiText(model as never),
						gemini: () => geminiText(model as never),
						ollama: () => ollamaText(model as never),
					};

					const adapter = adapterConfig[provider]();

					const stream = chat({
						adapter,
						tools: [
							getJobsBySkill,
							getAllJobs,
							getAllEducation,
							searchExperience,
						],
						systemPrompts: [SYSTEM_PROMPT],
						agentLoopStrategy: maxIterations(5),
						messages,
						abortController,
					});

					return toServerSentEventsResponse(stream, { abortController });
				} catch (error) {
					console.error("Resume chat error:", error);

					if (abortController.signal.aborted) {
						return new Response(null, { status: 499 });
					}

					const message =
						error instanceof Error ? error.message : "Unknown error";

					return new Response(
						JSON.stringify({
							error: "Failed to process chat request",
							message,
						}),
						{
							status: 500,
							headers: { "Content-Type": "application/json" },
						},
					);
				}
			},
		},
	},
});
