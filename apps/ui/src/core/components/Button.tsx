import { cn } from "@/lib/tailwind";
import type { ComponentProps } from "react";

export function Button(
	props: ComponentProps<"button"> & {
		variant?: "base" | "text" | "link" | "icon";
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

				variant === "text" && [
					"enabled:hover:bg-muted-1-reverse",
					"disabled:text-muted-2-reverse",
					"bg-muted-0-reverse text-muted-0",
					"font-semibold",
					"px-3 py-2",
				],
				variant === "link" && [
					"enabled:hover:decoration-current",
					"enabled:hover:text-muted-0-reverse",
					"underline underline-offset-4 decoration-transparent",
					"text-muted-2-reverse",
				],
				variant === "icon" && [
					"enabled:hover:bg-current/10",
					"aspect-square",
					"p-1",
				],

				intent === "danger" && [
					"enabled:hover:bg-red-500",
					"bg-red-600 text-white",
				],

				buttonProps.className,
			)}
		/>
	);
}
