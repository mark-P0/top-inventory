import { cn } from "@/lib/tailwind";
import { Menu as ArkMenu } from "@ark-ui/react";
import type { ComponentProps } from "react";

export const Menu = ArkMenu.Root;

export function MenuTrigger(props: ComponentProps<typeof ArkMenu.Trigger>) {
	return (
		<ArkMenu.Trigger
			{...props}
			className={cn("enabled:hover:cursor-pointer", props.className)}
		/>
	);
}

export function MenuContent(props: ComponentProps<typeof ArkMenu.Content>) {
	return (
		<ArkMenu.Positioner>
			<ArkMenu.Content
				{...props}
				className={cn(
					"min-w-32 bg-muted-0-reverse text-muted-0 p-1",
					props.className,
				)}
			/>
		</ArkMenu.Positioner>
	);
}

export function MenuItem(props: ComponentProps<typeof ArkMenu.Item>) {
	return (
		<ArkMenu.Item
			{...props}
			className={cn(
				"select-none",
				"not-data-[disabled]:hover:bg-muted-1-reverse not-data-[disabled]:hover:cursor-pointer",
				"data-[disabled]:text-muted-2-reverse",
				"px-3 py-1",
				props.className,
			)}
		/>
	);
}
