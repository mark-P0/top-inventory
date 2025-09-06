import { cn } from "@/lib/tailwind";
import type { ComponentProps } from "react";

export function Input(props: ComponentProps<"input">) {
	return (
		<input
			{...props}
			className={cn(
				"disabled:cursor-not-allowed",
				"disabled:bg-mono-0-reverse/50 disabled:text-mono-0/50",
				"bg-mono-0-reverse text-mono-0",
				"px-3 py-2",
				props.className,
			)}
		/>
	);
}
