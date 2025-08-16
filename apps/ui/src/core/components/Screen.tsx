import { cn } from "@/lib/tailwind";
import type { PropsWithChildren, ReactNode } from "react";
import { ThemeButton } from "../theme/ThemeButton";

export function Screen(
	props: PropsWithChildren<{
		title: ReactNode;
	}>,
) {
	const { title } = props;

	return (
		<main
			className={cn(
				"min-h-screen",
				"bg-stone-200 text-stone-700",
				"dark:bg-stone-700 dark:text-stone-200",
				"p-6 space-y-6",
			)}
		>
			<header className="flex items-center justify-between gap-3">
				<div className="space-y-1">
					<h1 className="text-3xl font-bold">{title}</h1>
					<p
						className={cn(
							"text-stone-500 dark:text-stone-400",
							"text-xs uppercase tracking-wide",
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
