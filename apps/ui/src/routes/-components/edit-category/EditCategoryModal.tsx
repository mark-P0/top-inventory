import { type PublicCategory, editCategory } from "@/core/api/codegen";
import { Button } from "@/core/components/Button";
import { Input } from "@/core/components/Input";
import { Label } from "@/core/components/Label";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/core/components/ark-ui/Dialog";
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
		mutationToken: string;
		categoryName: string;
	}>({
		defaultValues: {
			mutationToken: "",
			categoryName: category.name,
		},
	});

	const updateCategory = form.handleSubmit(async (formData) => {
		const result = await editCategory({
			path: {
				uuid: category.uuid,
			},
			headers: {
				authorization: `Bearer ${formData.mutationToken}`,
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
				<div className="space-y-3">
					<Label className="grid gap-1">
						<span className="font-semibold">Token</span>
						<Input
							{...form.register("mutationToken", { required: true, min: 1 })}
							type="password"
						/>
					</Label>

					<Label className="grid gap-1">
						<span className="font-semibold">Category Name</span>
						<Input
							{...form.register("categoryName", { required: true, min: 1 })}
						/>
					</Label>
				</div>

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
