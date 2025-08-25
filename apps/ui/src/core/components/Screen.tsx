import { cn } from "@/lib/tailwind";
import type { ComponentProps, PropsWithChildren, ReactNode } from "react";
import { ThemeButton } from "../theme/ThemeButton";

export function Screen(
	props: PropsWithChildren<{
		title: ReactNode;
		className?: ComponentProps<"main">["className"];
	}>,
) {
	const { title } = props;

	return (
		<main className={cn("min-h-screen", "p-6 space-y-6", props.className)}>
			<header className="flex items-center justify-between gap-3">
				<div className="space-y-1">
					<h1 className="text-3xl font-bold">{title}</h1>
					<p
						className={cn(
							"text-xs uppercase tracking-wide",
							"text-muted-2-reverse",
						)}
					>
						Inventory App
					</p>
				</div>

				<div>
					<ThemeButton />
				</div>
			</header>

			{props.children}
		</main>
	);
}
