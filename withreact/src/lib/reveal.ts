import { useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";

export function useRevealObserver() {
	const pathname = useRouterState({
		select: (state) => state.location.pathname,
	});

	useEffect(() => {
		const elements = document.querySelectorAll(".reveal:not(.is-visible)");
		if (!elements.length) return;

		if (!("IntersectionObserver" in window)) {
			elements.forEach((el) => el.classList.add("is-visible"));
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("is-visible");
						observer.unobserve(entry.target);
					}
				});
			},
			{ rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
		);

		elements.forEach((el) => observer.observe(el));

		return () => observer.disconnect();
	}, [pathname]);
}
