import { getCategoryBySlug } from "@/core/api/categories";
import { Screen } from "@/core/components/Screen";
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/$categorySlug/")({
	loader: async ({ params }) => {
		const { categorySlug } = params;

		const category = await getCategoryBySlug(categorySlug);
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
