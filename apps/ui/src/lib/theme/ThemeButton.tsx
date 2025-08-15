import { useTheme } from "./useTheme";

export function ThemeButton() {
	const { theme, cycleTheme } = useTheme();

	return (
		<button type="button" onClick={cycleTheme}>
			{theme}
		</button>
	);
}
