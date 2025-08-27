import type { ComponentProps } from "react";
import { BaseScreen } from "./BaseScreen";

export function Screen(props: ComponentProps<typeof BaseScreen>) {
	return <BaseScreen {...props} />;
}
