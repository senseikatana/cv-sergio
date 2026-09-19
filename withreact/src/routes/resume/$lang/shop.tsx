import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/resume/$lang/shop")({
	beforeLoad: ({ params }) => {
		throw redirect({
			to: "/resume/$lang",
			params: { lang: params.lang },
			statusCode: 301,
		});
	},
});
