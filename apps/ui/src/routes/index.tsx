import { type Category, categories } from "@/core/api/categories";
import { ThemeButton } from "@/core/theme/ThemeButton";
import { cn } from "@/lib/tailwind";
import { createFileRoute } from "@tanstack/react-router";

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
				<div className="space-y-1">
					<h1 className="text-3xl font-bold">Categories</h1>
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

			<ol className="grid lg:grid-cols-5 gap-3">
				{categories.map((category) => (
					<li key={category.id}>
						<CategoryCard category={category} />
					</li>
				))}
			</ol>
		</main>
	);
}

function CategoryCard(props: { category: Category }) {
	const { category } = props;

	return (
		<article className="aspect-[4/3] bg-stone-300 dark:bg-stone-600 flex flex-col justify-between gap-3 p-3">
			<header>
				<h2 className="text-2xl font-semibold">{category.name}</h2>
			</header>

			<footer
				className={cn(
					"text-sm dark:text-stone-400",
					"flex items-center justify-between gap-3",
				)}
			>
				<p>
					Item Types: <span className="font-bold">{category.item_type_ct}</span>
				</p>
				<p>
					Total Items:{" "}
					<span className="font-bold">{category.total_item_ct}</span>
				</p>
			</footer>
		</article>
	);
}
