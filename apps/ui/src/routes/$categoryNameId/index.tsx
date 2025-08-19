import { getCategories } from "@/core/api/codegen";
import { Screen } from "@/core/components/Screen";
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/$categoryNameId/")({
	loader: async ({ params }) => {
		const { categoryNameId } = params;

		const result = await getCategories({
			query: {
				"include[item_type_ct]": true,
				"include[total_item_ct]": true,
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

		return { category };
	},
	component: CategoryScreen,
});

function CategoryScreen() {
	const { category } = Route.useLoaderData();

	return (
		<Screen title={category.name}>
			<pre>{JSON.stringify(category, null, 2)}</pre>
		</Screen>
	);
}
