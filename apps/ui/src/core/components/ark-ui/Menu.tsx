import { cn } from "@/lib/tailwind";
import { Menu as ArkMenu } from "@ark-ui/react";
import type { ComponentProps } from "react";
import { Button } from "../Button";

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
					"min-w-32 bg-mono-0-reverse text-mono-0",
					props.className,
				)}
			/>
		</ArkMenu.Positioner>
	);
}

export function MenuItem(props: ComponentProps<typeof ArkMenu.Item>) {
	if (props.asChild) {
		return <ArkMenu.Item {...props} />;
	}

	return (
		<ArkMenu.Item {...props} asChild>
			<Button
				variant="ghost"
				disabled={props.disabled}
				className="w-full block text-left"
			>
				{props.children}
			</Button>
		</ArkMenu.Item>
	);
}
