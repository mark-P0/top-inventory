import { getCategoryBySlug } from "@/core/api/categories";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$categorySlug/")({
	loader: async ({ params }) => {
		const { categorySlug } = params;

		const category = await getCategoryBySlug(categorySlug);

		return { category };
	},
	component: CategoryScreen,
});

function CategoryScreen() {
	const { category } = Route.useLoaderData();

	return <pre>{JSON.stringify(category, null, 2)}</pre>;
}
