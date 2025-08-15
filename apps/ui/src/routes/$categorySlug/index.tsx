import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$categorySlug/")({
	component: RouteComponent,
});

function RouteComponent() {
	const params = Route.useParams();

	return <pre>{JSON.stringify(params, null, 2)}</pre>;
}
