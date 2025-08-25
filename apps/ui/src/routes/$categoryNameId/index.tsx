import {
	type PublicCategory,
	type PublicCategoryItem,
	type PublicCategoryItemType,
	getCategories,
} from "@/core/api/codegen";
import { Card } from "@/core/components/Card";
import { Screen } from "@/core/components/Screen";
import { cn } from "@/lib/tailwind";
import { createFileRoute, notFound } from "@tanstack/react-router";

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

		const result = await getCategories({
			query: {
				"include[items]": true,
				"filter[name_id]": categoryNameId,
			},
		});
		if (result.error) {
			throw notFound();
		}

		const categories = result.data.data;
		if (categories.length !== 1) {
			throw notFound();
		}

		const category = categories[0];
		if (category === undefined) {
			throw notFound();
		}

		const itemTypeItems = groupItemTypeItems(category);

		return { category, itemTypeItems };
	},
	component: CategoryScreen,
});

function CategoryScreen() {
	const { category } = Route.useLoaderData();

	return (
		<Screen title={category.name}>
			<ItemTypeList />
		</Screen>
	);
}

function ItemTypeList() {
	const { itemTypeItems } = Route.useLoaderData();

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
				<h2 className="text-2xl font-semibold">{itemType.name}</h2>
			</header>

			<footer
				className={cn(
					"text-sm dark:text-stone-400",
					"flex items-center justify-between gap-3",
				)}
			>
				<p>
					Qty: <span className="font-bold">{itemCt}</span>
				</p>
			</footer>
		</Card>
	);
}
