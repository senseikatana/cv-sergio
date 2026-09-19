import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/resume/")({
	beforeLoad: () => {
		throw redirect({
			to: "/resume/$lang",
			params: { lang: "es" },
			statusCode: 301,
		});
	},
});
