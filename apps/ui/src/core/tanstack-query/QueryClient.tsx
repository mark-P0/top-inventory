import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";

const queryClient = new QueryClient();

export function DefaultQueryClientProvider(props: PropsWithChildren) {
	return <QueryClientProvider {...props} client={queryClient} />;
}
