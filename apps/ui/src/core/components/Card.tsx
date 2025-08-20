import { cn } from "@/lib/tailwind";
import type { ComponentProps } from "react";

export function Card(props: ComponentProps<"article">) {
	return (
		<article
			{...props}
			className={cn(
				"aspect-[4/3] bg-stone-300 dark:bg-stone-600 flex flex-col justify-between gap-3 p-3",
				props.className,
			)}
		/>
	);
}
