import { NotFoundScreen } from "@/core/errors/not-found/NotFoundScreen";
import { CatchNotFound } from "@tanstack/react-router";
import type { ComponentProps } from "react";
import { BaseScreen } from "./BaseScreen";

export function Screen(props: ComponentProps<typeof BaseScreen>) {
	return (
		<CatchNotFound fallback={NotFoundScreen}>
			<BaseScreen {...props} />
		</CatchNotFound>
	);
}
