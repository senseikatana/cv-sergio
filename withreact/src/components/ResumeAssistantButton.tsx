import { Briefcase } from "lucide-react";
import { showResumeAssistant } from "./ResumeAssistant";

export default function ResumeAssistantButton() {
	return (
		<button
			type="button"
			onClick={() => showResumeAssistant.setState(true)}
			aria-label="Open resume assistant"
			title="Resume Assistant"
			className="inline-flex size-9 items-center justify-center rounded-full border border-line bg-chip text-fg-muted transition-colors hover:border-line-strong hover:text-primary"
		>
			<Briefcase className="size-4" />
		</button>
	);
}
