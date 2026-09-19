import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useLangSafe } from "../lib/lang";

type Theme = "dark" | "light";

function applyTheme(theme: Theme) {
	document.documentElement.classList.remove("light", "dark");
	document.documentElement.classList.add(theme);
	document.documentElement.style.colorScheme = theme;
}

export default function ThemeToggle() {
	const { t } = useLangSafe();
	const [theme, setTheme] = useState<Theme>("dark");

	useEffect(() => {
		const stored = window.localStorage.getItem("cv-theme");
		setTheme(stored === "light" ? "light" : "dark");
	}, []);

	const toggle = () => {
		const next: Theme = theme === "dark" ? "light" : "dark";
		setTheme(next);
		applyTheme(next);
		window.localStorage.setItem("cv-theme", next);
	};

	return (
		<button
			type="button"
			onClick={toggle}
			aria-label={t.themeToggle}
			className="inline-flex size-9 items-center justify-center rounded-full border border-line bg-chip text-fg-muted transition-colors hover:border-line-strong hover:text-fg-strong"
		>
			{theme === "dark" ? (
				<Sun className="size-4" />
			) : (
				<Moon className="size-4" />
			)}
		</button>
	);
}
