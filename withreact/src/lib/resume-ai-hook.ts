import type { InferChatMessages } from "@tanstack/ai-react";
import {
	createChatClientOptions,
	fetchServerSentEvents,
	useChat,
} from "@tanstack/ai-react";

const ENDPOINT = "/resume/api/resume-chat";

const defaultChatOptions = createChatClientOptions({
	connection: fetchServerSentEvents(ENDPOINT),
});

export type ResumeChatMessages = InferChatMessages<typeof defaultChatOptions>;

export const useResumeChat = () => {
	const chatOptions = createChatClientOptions({
		connection: fetchServerSentEvents(ENDPOINT),
	});

	return useChat(chatOptions);
};
