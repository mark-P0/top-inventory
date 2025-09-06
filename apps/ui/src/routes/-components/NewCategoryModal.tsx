import { newCategory } from "@/core/api/codegen";
import { Button } from "@/core/components/Button";
import { Input } from "@/core/components/Input";
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
					<Input
						{...form.register("categoryName", { required: true, min: 1 })}
					/>
				</label>

				<footer className="flex flex-row-reverse">
					<Button type="submit">Save</Button>
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
			<DialogTrigger asChild>
				<Button
					variant="base"
					className={cn(
						"enabled:hover:bg-current/10",
						"border-2 border-dashed border-current",
						"text-mono-reverse",
						"font-semibold",
						props.className,
					)}
				>
					New Category
				</Button>
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
