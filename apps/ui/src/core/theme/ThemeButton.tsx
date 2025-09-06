import { MoonIcon, SunIcon, SunMoonIcon } from "lucide-react";
import { Button } from "../components/Button";
import { useTheme } from "./useTheme";

export function ThemeButton() {
	const { theme, cycleTheme } = useTheme();

	return (
		<Button variant="icon" onClick={cycleTheme}>
			{theme === "os" && <SunMoonIcon />}
			{theme === "light" && <SunIcon />}
			{theme === "dark" && <MoonIcon />}
		</Button>
	);
}
