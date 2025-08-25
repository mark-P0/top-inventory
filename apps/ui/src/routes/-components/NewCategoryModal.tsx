import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/core/components/ark-ui/Dialog";
import { cn } from "@/lib/tailwind";
import type { ComponentProps } from "react";

export function NewCategoryModal(props: { className?: string }) {
	const createCategory: ComponentProps<"form">["onSubmit"] = (event) => {
		event.preventDefault();

		const formData = Object.fromEntries(new FormData(event.currentTarget));

		console.warn({ formData });

		throw new Error("TODO");
	};

	return (
		<Dialog>
			<DialogTrigger
				className={cn(
					"hover:bg-muted-1",
					"text-lg font-medium",
					props.className,
				)}
			>
				New Category
			</DialogTrigger>

			<DialogContent className="space-y-6">
				<DialogHeader>
					<DialogTitle>New Category</DialogTitle>
					<DialogDescription>Create a new category</DialogDescription>
				</DialogHeader>

				<form onSubmit={createCategory} className="space-y-6">
					<label className="grid gap-1">
						<span className="font-semibold">Category Name</span>
						<input
							type="text"
							name="name"
							className={cn("bg-muted-0", "px-3 py-2")}
						/>
					</label>

					<footer className="flex flex-row-reverse">
						<button
							type="submit"
							className={cn(
								"bg-muted-0-reverse text-muted-0",
								"enabled:hover:cursor-pointer",
								"px-3 py-2",
								"font-semibold",
							)}
						>
							Save
						</button>
					</footer>
				</form>
			</DialogContent>
		</Dialog>
	);
}
