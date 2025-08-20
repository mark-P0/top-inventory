import { type PublicCategory, getCategories } from "@/core/api/codegen";
import { Card } from "@/core/components/Card";
import { Screen } from "@/core/components/Screen";
import { cn } from "@/lib/tailwind";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import type { PropsWithChildren } from "react";

export const Route = createFileRoute("/")({
	loader: async () => {
		const result = await getCategories({
			query: {
				"include[item_types]": true,
				"include[items]": true,
			},
		});
		if (result.error) {
			throw notFound();
		}

		const categories = result.data.data;

		return { categories };
	},
	component: CategoriesScreen,
});

function CategoriesScreen() {
	return (
		<Screen title="Categories">
			<CategoryList />
		</Screen>
	);
}

function CategoryList() {
	const { categories } = Route.useLoaderData();

	return (
		<ol className="grid lg:grid-cols-5 gap-3">
			{categories.map((category) => (
				<li key={category.name_id}>
					<CategoryLink category={category}>
						<CategoryCard category={category} />
					</CategoryLink>
				</li>
			))}
		</ol>
	);
}

function CategoryLink(props: PropsWithChildren<{ category: PublicCategory }>) {
	const { category } = props;

	return (
		<Link to="/$categoryNameId" params={{ categoryNameId: category.name_id }}>
			{props.children}
		</Link>
	);
}

function CategoryCard(props: { category: PublicCategory }) {
	const { category } = props;

	const itemTypeCt = category.item_types.length;
	const totalItemCt = category.items.length;

	return (
		<Card>
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
					Item Types: <span className="font-bold">{itemTypeCt}</span>
				</p>

				<p>
					Total Items: <span className="font-bold">{totalItemCt}</span>
				</p>
			</footer>
		</Card>
	);
}
