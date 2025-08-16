import { getCategory } from "@/core/api/categories";
import { Screen } from "@/core/components/Screen";
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/$categoryNameId/")({
	loader: async ({ params }) => {
		const { categoryNameId } = params;

		const category = await getCategory({ nameId: categoryNameId });
		if (category === null) {
			throw notFound();
		}

		return { category };
	},
	component: CategoryScreen,
});

function CategoryScreen() {
	const { category } = Route.useLoaderData();

	return <Screen title={category.name}>hello</Screen>;
}
