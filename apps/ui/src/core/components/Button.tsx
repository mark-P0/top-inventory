import { cn } from "@/lib/tailwind";
import type { ComponentProps } from "react";

export function Button(
	props: ComponentProps<"button"> & {
		variant?: "base" | "text" | "ghost" | "link" | "icon";
		intent?: "success" | "danger" | "warning" | "info";
	},
) {
	const { variant = "text", intent, ...buttonProps } = props;

	return (
		<button
			{...buttonProps}
			type={buttonProps.type ?? "button"}
			className={cn(
				"select-none",
				"transition",
				"enabled:cursor-pointer disabled:cursor-not-allowed",
				"disabled:bg-transparent disabled:text-current/50",

				variant === "text" && [
					"disabled:bg-mono-0-reverse/50 disabled:text-mono-0/50",
					"enabled:hover:bg-mono-0-reverse/90",
					"bg-mono-0-reverse text-mono-0",
					"font-semibold",
					"px-3 py-2",
				],
				variant === "ghost" && [
					"enabled:hover:bg-current/10",
					"font-semibold",
					"px-3 py-2",
				],
				variant === "link" && [
					"enabled:hover:decoration-mono-reverse enabled:hover:text-mono-reverse",
					"underline underline-offset-4 decoration-transparent",
					"text-mono-reverse/75",
				],
				variant === "icon" && [
					"enabled:hover:bg-current/10",
					"aspect-square",
					"p-1",
				],

				intent === "danger" && [
					"disabled:bg-danger-0/50 disabled:text-mono-0-reverse/50",
					"enabled:hover:bg-danger-0/90",
					"bg-danger-0 text-mono-0-reverse",
				],

				buttonProps.className,
			)}
		/>
	);
}
