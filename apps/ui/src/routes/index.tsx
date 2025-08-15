import { cn } from "@/lib/tailwind";
import { createFileRoute } from "@tanstack/react-router";
import { ThemeButton } from "./-components/ThemeButton";

const SAMPLE_DATA = (() => {
	type Category = {
		id: string;
		name: string;
		slug: string;
		item_type_ct: number;
		total_item_ct: number;
	};

	function randomInteger() {
		const array = crypto.getRandomValues(new Uint8Array(1));
		return array[0];
	}

	const categories = Array.from({ length: 8 }, (_, idx) => {
		const category: Category = {
			id: crypto.randomUUID(),
			name: `Category ${idx}`,
			slug: `category-${idx}`,
			item_type_ct: randomInteger(),
			total_item_ct: randomInteger(),
		};

		return category;
	});

	return { categories };
})();

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	const { categories } = SAMPLE_DATA;

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
