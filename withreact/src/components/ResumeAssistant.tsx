import { Store } from "@tanstack/store";
import { Briefcase, Send, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Streamdown } from "streamdown";
import type { ResumeChatMessages } from "#/lib/resume-ai-hook";
import { useResumeChat } from "#/lib/resume-ai-hook";

function Messages({ messages }: { messages: ResumeChatMessages }) {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (containerRef.current) {
			containerRef.current.scrollTop = containerRef.current.scrollHeight;
		}
	}, [messages]);

	if (!messages.length) {
		return (
			<div className="flex flex-1 flex-col items-center justify-center px-6 py-8 text-sm text-fg-subtle">
				<div className="relative mb-4">
					<Briefcase className="size-12 text-info/40" />
					<Sparkles className="absolute -bottom-1 -right-1 size-5 text-primary/70" />
				</div>
				<p className="text-center font-medium text-fg">Welcome, recruiter</p>
				<p className="mt-2 max-w-[220px] text-center text-xs text-fg-muted">
					Ask about skills, experience or availability.
				</p>
			</div>
		);
	}

	return (
		<div ref={containerRef} className="flex-1 overflow-y-auto">
			{messages.map(({ id, role, parts }) => (
				<div
					key={id}
					className={role === "assistant" ? "bg-surface py-3" : "py-3"}
				>
					{parts.map((part, index) => {
						if (part.type === "text" && part.content) {
							return (
								<div
									key={`${id}-${index}`}
									className="flex items-start gap-3 px-4"
								>
									{role === "assistant" ? (
										<div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary">
											<Briefcase className="size-3.5" />
										</div>
									) : (
										<div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium text-on-primary">
											You
										</div>
									)}
									<div className="prose prose-sm dark:prose-invert min-w-0 flex-1 max-w-none">
										<Streamdown>{part.content}</Streamdown>
									</div>
								</div>
							);
						}
						return null;
					})}
				</div>
			))}
		</div>
	);
}

export const showResumeAssistant = new Store(false);

export default function ResumeAssistant() {
	const [isOpen, setIsOpen] = useState(false);
	const { messages, sendMessage, isLoading } = useResumeChat();
	const [input, setInput] = useState("");

	useEffect(() => {
		return showResumeAssistant.subscribe(() => {
			setIsOpen(showResumeAssistant.state);
		});
	}, []);

	const handleToggle = () => {
		const next = !isOpen;
		setIsOpen(next);
		showResumeAssistant.setState(() => next);
	};

	const handleSend = () => {
		if (input.trim()) {
			sendMessage(input);
			setInput("");
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed right-4 top-20 z-100 flex h-[520px] w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-line-strong bg-bg shadow-2xl">
			<div className="flex items-center justify-between border-b border-line p-4">
				<div className="flex items-center gap-3">
					<div className="flex size-9 items-center justify-center rounded-xl bg-primary text-on-primary">
						<Briefcase className="size-4" />
					</div>
					<div>
						<h3 className="text-sm font-bold tracking-tight text-fg-strong">
							Resume Assistant
						</h3>
						<p className="text-xs text-fg-subtle">AI over the real CV data</p>
					</div>
				</div>
				<button
					type="button"
					onClick={handleToggle}
					aria-label="Close assistant"
					className="rounded-lg p-2 text-fg-subtle transition-colors hover:bg-chip hover:text-fg-strong"
				>
					<X className="size-4" />
				</button>
			</div>

			<Messages messages={messages} />

			{isLoading ? (
				<div className="border-t border-line px-4 py-3">
					<div className="flex items-center gap-2 text-xs text-info">
						<span className="size-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
						<span className="size-2 animate-bounce rounded-full bg-info [animation-delay:-0.15s]" />
						<span className="size-2 animate-bounce rounded-full bg-secondary" />
						<span className="font-medium">Analyzing experience…</span>
					</div>
				</div>
			) : null}

			<div className="border-t border-line bg-bg-alt/50 p-4">
				<form
					onSubmit={(event) => {
						event.preventDefault();
						handleSend();
					}}
				>
					<div className="relative">
						<textarea
							value={input}
							onChange={(event) => setInput(event.target.value)}
							placeholder="Ask about skills, experience or availability…"
							disabled={isLoading}
							rows={1}
							className="max-h-[100px] min-h-12 w-full resize-none overflow-hidden rounded-xl border border-line bg-surface py-3 pl-4 pr-12 text-sm text-fg placeholder:text-fg-subtle focus:outline-none focus:ring-2 focus:ring-info/50 disabled:opacity-50"
							onInput={(event) => {
								const target = event.target as HTMLTextAreaElement;
								target.style.height = "auto";
								target.style.height = `${Math.min(target.scrollHeight, 100)}px`;
							}}
							onKeyDown={(event) => {
								if (
									event.key === "Enter" &&
									!event.shiftKey &&
									input.trim() &&
									!isLoading
								) {
									event.preventDefault();
									handleSend();
								}
							}}
						/>
						<button
							type="submit"
							disabled={!input.trim() || isLoading}
							aria-label="Send message"
							className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg bg-primary p-2 text-on-primary transition-colors hover:bg-primary-hover disabled:opacity-30"
						>
							<Send className="size-4" />
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
