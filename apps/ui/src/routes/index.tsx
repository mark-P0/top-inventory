import { type PublicCategory, getCategories } from "@/core/api/codegen";
import { Card } from "@/core/components/Card";
import { Loading } from "@/core/components/Loading";
import { Screen } from "@/core/components/screen/Screen";
import { cn } from "@/lib/tailwind";
import { iife } from "@/lib/utils";
import { Link, createFileRoute } from "@tanstack/react-router";
import { type PropsWithChildren, Suspense, use } from "react";
import { NewCategoryModal } from "./-components/NewCategoryModal";

function getCategoryItemTypeCt(category: PublicCategory) {
	const itemTypeUuids = new Set<string>();
	for (const item of category.items) {
		itemTypeUuids.add(item.item_type.uuid);
	}

	const itemTypeCt = itemTypeUuids.size;

	return itemTypeCt;
}

export const Route = createFileRoute("/")({
	loader: async () => {
		const categoryRecordPromise = iife(async () => {
			const result = await getCategories({
				query: {
					"include[items]": true,
				},
			});
			if (result.error) {
				throw result.error;
			}

			const categories = result.data.data;
			const categoryRecord = categories.map((category) => ({
				category,
				itemTypeCt: getCategoryItemTypeCt(category),
			}));

			return categoryRecord;
		});

		return {
			categoryRecordPromise,
		};
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
	return (
		<ol className="grid lg:grid-cols-5 gap-3">
			<li className="size-full">
				<NewCategoryModal className="w-full aspect-[4/3]" />
			</li>

			<Suspense fallback={<Loading label="Finding categories..." />}>
				<CategoryListItems />
			</Suspense>
		</ol>
	);
}

function CategoryListItems() {
	const { categoryRecordPromise } = Route.useLoaderData();

	const categoryRecord = use(categoryRecordPromise);

	return categoryRecord.map(({ category, itemTypeCt }) => (
		<li key={category.name_id}>
			<CategoryLink category={category}>
				<CategoryCard category={category} itemTypeCt={itemTypeCt} />
			</CategoryLink>
		</li>
	));
}

function CategoryLink(props: PropsWithChildren<{ category: PublicCategory }>) {
	const { category } = props;

	return (
		<Link to="/$categoryNameId" params={{ categoryNameId: category.name_id }}>
			{props.children}
		</Link>
	);
}

function CategoryCard(props: { category: PublicCategory; itemTypeCt: number }) {
	const { category, itemTypeCt } = props;

	const totalItemCt = category.items.length;

	return (
		<Card className="aspect-[4/3]">
			<header>
				<h2>{category.name}</h2>
			</header>

			<footer
				className={cn(
					"flex items-center justify-between gap-3",
					"text-sm",
					"text-muted-2-reverse",
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
