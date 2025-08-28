import { newCategory } from "@/core/api/codegen";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/core/components/ark-ui/Dialog";
import { cn } from "@/lib/tailwind";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";

function NewCategoryForm(props: { onSuccess?: () => void }) {
	const router = useRouter();

	const form = useForm<{
		categoryName: string;
	}>();

	const createCategory = form.handleSubmit(async (formData) => {
		const result = await newCategory({
			body: {
				category_name: formData.categoryName,
			},
		});
		if (result.error) {
			form.setError("root", {
				message: "Failed creating category",
			});

			return;
		}

		await router.invalidate();
		props.onSuccess?.();
	});

	return (
		<form onSubmit={createCategory}>
			<fieldset disabled={form.formState.isSubmitting} className="space-y-6">
				<label className="grid gap-1">
					<span className="font-semibold">Category Name</span>
					<input
						{...form.register("categoryName", { required: true, min: 1 })}
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
			</fieldset>
		</form>
	);
}

export function NewCategoryModal(props: { className?: string }) {
	const [open, setIsOpen] = useState(false);

	function closeModal() {
		setIsOpen(false);
	}

	return (
		<Dialog open={open} onOpenChange={({ open }) => setIsOpen(open)}>
			<DialogTrigger
				className={cn(
					"hover:bg-muted-1",
					"font-semibold",
					"border-2 border-dashed border-muted-2-reverse",
					"text-muted-2-reverse",
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

				<NewCategoryForm onSuccess={closeModal} />
			</DialogContent>
		</Dialog>
	);
}
