import { cn } from "@/lib/tailwind";
import { Dialog as ArkDialog, Portal } from "@ark-ui/react";
import { XIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { Button } from "../Button";

export const DialogTitle = ArkDialog.Title;
export const DialogDescription = ArkDialog.Description;

export function Dialog(props: ComponentProps<typeof ArkDialog.Root>) {
	return (
		<ArkDialog.Root
			{...props}
			lazyMount={props.lazyMount ?? true}
			unmountOnExit={props.unmountOnExit ?? true}
		/>
	);
}

export function DialogTrigger(props: ComponentProps<typeof ArkDialog.Trigger>) {
	return (
		<ArkDialog.Trigger
			{...props}
			className={cn("enabled:hover:cursor-pointer", props.className)}
		/>
	);
}

export function DialogCloseTrigger(
	props: ComponentProps<typeof ArkDialog.CloseTrigger>,
) {
	return (
		<ArkDialog.CloseTrigger
			{...props}
			className={cn("enabled:hover:cursor-pointer", props.className)}
		/>
	);
}

export function DialogContent(props: ComponentProps<typeof ArkDialog.Content>) {
	return (
		<Portal>
			<ArkDialog.Backdrop
				className={cn(
					"size-sv",
					"fixed top-0 left-0",
					"bg-black/25 backdrop-blur-xs",
				)}
			/>
			<ArkDialog.Positioner
				className={cn(
					"size-sv",
					"fixed top-0 left-0",
					"grid place-items-center",
				)}
			>
				<ArkDialog.Content
					{...props}
					className={cn(
						"bg-muted-1",
						"min-w-full lg:min-w-lg p-3",
						props.className,
					)}
				/>
			</ArkDialog.Positioner>
		</Portal>
	);
}

export function DialogHeader(
	props: ComponentProps<"div"> & { withoutClose?: boolean },
) {
	const { withoutClose = false, ...divProps } = props;

	return (
		<header className="flex items-start justify-between gap-3">
			<div {...divProps} />

			{!withoutClose && (
				<DialogCloseTrigger asChild>
					<Button variant="icon">
						<XIcon />
					</Button>
				</DialogCloseTrigger>
			)}
		</header>
	);
}
