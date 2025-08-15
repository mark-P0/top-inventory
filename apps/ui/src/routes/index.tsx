import { categories } from "@/lib/fetchers";
import { cn } from "@/lib/tailwind";
import { createFileRoute } from "@tanstack/react-router";
import { ThemeButton } from "./-components/ThemeButton";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
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
				<div>
					<h1>Categories</h1>
					<p>Inventory App</p>
				</div>

				<div>
					<ThemeButton />
				</div>
			</header>

			<ol className="grid grid-cols-3 gap-3">
				{categories.map((category) => (
					<li key={category.id}>
						<article className="bg-stone-300 dark:bg-stone-600">
							<pre className="overflow-hidden">
								{JSON.stringify(category, null, 2)}
							</pre>
						</article>
					</li>
				))}
			</ol>
		</main>
	);
}
