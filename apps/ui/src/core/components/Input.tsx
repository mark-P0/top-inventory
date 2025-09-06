import { cn } from "@/lib/tailwind";
import type { ComponentProps } from "react";

export function Input(props: ComponentProps<"input">) {
	return (
		<input
			{...props}
			className={cn(
				"bg-muted-0-reverse text-muted-0",
				"px-3 py-2",
				props.className,
			)}
		/>
	);
}
