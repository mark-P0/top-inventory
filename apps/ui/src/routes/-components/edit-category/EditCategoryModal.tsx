import { type PublicCategory, editCategory } from "@/core/api/codegen";
import { Button } from "@/core/components/Button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/core/components/ark-ui/Dialog";
import { cn } from "@/lib/tailwind";
import { useRouter } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useEditCategoryModalStore } from "./useEditCategoryModalStore";

function EditCategoryForm(props: {
	category: PublicCategory;
	onSuccess?: () => void;
}) {
	const { category } = props;

	const router = useRouter();

	const form = useForm<{
		categoryName: string;
	}>({
		defaultValues: {
			categoryName: category.name,
		},
	});

	const updateCategory = form.handleSubmit(async (formData) => {
		const result = await editCategory({
			path: {
				uuid: category.uuid,
			},
			body: {
				category_name: formData.categoryName,
			},
		});
		if (result.error) {
			form.setError("root", {
				message: "Failed updating category",
			});

			return;
		}

		await router.invalidate();
		props.onSuccess?.();
	});

	return (
		<form onSubmit={updateCategory}>
			<fieldset disabled={form.formState.isSubmitting} className="space-y-6">
				<label className="grid gap-1">
					<span className="font-semibold">Category Name</span>
					<input
						{...form.register("categoryName", { required: true, min: 1 })}
						className={cn("bg-muted-0", "px-3 py-2")}
					/>
				</label>

				<footer className="flex flex-row-reverse">
					<Button type="submit">Save</Button>
				</footer>
			</fieldset>
		</form>
	);
}

export function EditCategoryModal() {
	const store = useEditCategoryModalStore();
	const { isOpen, setIsOpen } = store;
	const { category } = store;

	function closeModal() {
		setIsOpen(false);
	}

	if (category === null) {
		return null;
	}

	return (
		<Dialog open={isOpen} onOpenChange={({ open }) => setIsOpen(open)}>
			<DialogContent className="space-y-6">
				<DialogHeader>
					<DialogTitle>
						Edit <span className="font-bold">{category.name}</span>
					</DialogTitle>
					<DialogDescription className="sr-only">
						Edit a category
					</DialogDescription>
				</DialogHeader>

				<EditCategoryForm category={category} onSuccess={closeModal} />
			</DialogContent>
		</Dialog>
	);
}
