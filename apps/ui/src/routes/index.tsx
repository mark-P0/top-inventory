import { type Category, categories } from "@/core/api/categories";
import { Screen } from "@/core/components/Screen";
import { cn } from "@/lib/tailwind";
import { Link, createFileRoute } from "@tanstack/react-router";
import type { PropsWithChildren } from "react";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	return (
		<Screen title="Categories">
			<ol className="grid lg:grid-cols-5 gap-3">
				{categories.map((category) => (
					<li key={category.id}>
						<CategoryLink category={category}>
							<CategoryCard category={category} />
						</CategoryLink>
					</li>
				))}
			</ol>
		</Screen>
	);
}

function CategoryLink(props: PropsWithChildren<{ category: Category }>) {
	const { category } = props;

	return (
		<Link to="/$categorySlug" params={{ categorySlug: category.slug }}>
			{props.children}
		</Link>
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
