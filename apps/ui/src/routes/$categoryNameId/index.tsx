import {
	type PublicCategory,
	type PublicCategoryItem,
	type PublicCategoryItemType,
	getCategories,
} from "@/core/api/codegen";
import { Card } from "@/core/components/Card";
import { Loading } from "@/core/components/Loading";
import { Screen } from "@/core/components/screen/Screen";
import { cn } from "@/lib/tailwind";
import { iife } from "@/lib/utils";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { Suspense, use } from "react";

function groupItemTypeItems(category: PublicCategory) {
	type GroupEntry = {
		itemType: PublicCategoryItemType;
		items: PublicCategoryItem[];
	};

	const entries: GroupEntry[] = [];
	for (const item of category.items) {
		let entry = entries.find(
			({ itemType }) => itemType.uuid === item.item_type.uuid,
		);
		if (entry === undefined) {
			entry = {
				itemType: item.item_type,
				items: [],
			};

			entries.push(entry);
		}

		entry.items.push(item);
	}

	return entries;
}

export const Route = createFileRoute("/$categoryNameId/")({
	loader: async ({ params }) => {
		const { categoryNameId } = params;

		const categoryPromise = iife(async () => {
			const result = await getCategories({
				query: {
					"include[items]": true,
					"filter[name_id]": categoryNameId,
				},
			});
			if (result.error) {
				throw result.error;
			}

			const categories = result.data.data;
			if (categories.length !== 1) {
				throw notFound();
			}

			const category = categories[0];
			if (category === undefined) {
				throw notFound();
			}

			return category;
		});

		const itemTypeItemsPromise = iife(async () => {
			const category = await categoryPromise;

			const itemTypeItems = groupItemTypeItems(category);

			return itemTypeItems;
		});

		return {
			categoryPromise,
			itemTypeItemsPromise,
		};
	},
	component: CategoryScreen,
});

function CategoryScreen() {
	return (
		<Screen
			title={
				<Suspense fallback={<Loading label="Finding category name..." />}>
					<CategoryScreenTitle />
				</Suspense>
			}
		>
			<Suspense fallback={<Loading label="Finding category items..." />}>
				<ItemTypeList />
			</Suspense>
		</Screen>
	);
}

function CategoryScreenTitle() {
	const { categoryPromise } = Route.useLoaderData();

	const category = use(categoryPromise);

	return category.name;
}

function ItemTypeList() {
	const { itemTypeItemsPromise } = Route.useLoaderData();

	const itemTypeItems = use(itemTypeItemsPromise);

	return (
		<ol className="grid lg:grid-cols-5 gap-3">
			{itemTypeItems.map(({ itemType, items }) => (
				<li key={itemType.uuid}>
					<ItemTypeCard itemType={itemType} items={items} />
				</li>
			))}
		</ol>
	);
}

function ItemTypeCard(props: {
	itemType: PublicCategoryItemType;
	items: PublicCategoryItem[];
}) {
	const { itemType, items } = props;

	const itemCt = items.length;

	return (
		<Card className="aspect-[4/3]">
			<header>
				<h2>{itemType.name}</h2>
			</header>

			<footer
				className={cn(
					"flex items-center justify-between gap-3",
					"text-sm",
					"text-muted-2-reverse",
				)}
			>
				<p>
					Qty: <span className="font-bold">{itemCt}</span>
				</p>
			</footer>
		</Card>
	);
}
