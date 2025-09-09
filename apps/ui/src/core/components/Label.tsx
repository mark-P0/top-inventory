import { cn } from "@/lib/tailwind";
import type { ComponentProps } from "react";

export function Label(props: ComponentProps<"label">) {
	return (
		// biome-ignore lint/a11y/noLabelWithoutControl: abstraction, control is user-provided
		<label {...props} className={cn("select-none", props.className)}>
			{props.children}
		</label>
	);
}
