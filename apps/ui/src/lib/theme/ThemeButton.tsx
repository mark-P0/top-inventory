import { MoonIcon, SunIcon, SunMoonIcon } from "lucide-react";
import { useTheme } from "./useTheme";

export function ThemeButton() {
	const { theme, cycleTheme } = useTheme();

	return (
		<button type="button" onClick={cycleTheme}>
			{theme === "os" && <SunMoonIcon />}
			{theme === "light" && <SunIcon />}
			{theme === "dark" && <MoonIcon />}
		</button>
	);
}
