import { type PublicCategory, removeCategory } from "@/core/api/codegen";
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
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDeleteCategoryModalStore } from "./useDeleteCategoryModalStore";

function RemoveCategoryForm(props: {
	category: PublicCategory;
	onSuccess?: () => void;
}) {
	const { category } = props;

	const form = useForm<{
		mutationToken: string;
	}>({
		defaultValues: {
			mutationToken: "",
		},
	});

	const deleteCategory = form.handleSubmit(async (formData) => {
		const result = await removeCategory({
			headers: {
				authorization: `Bearer ${formData.mutationToken}`,
			},
			path: {
				uuid: category.uuid,
			},
		});
		if (result.error) {
			form.setError("root", {
				message: "Failed removing category",
			});

			return;
		}

		props.onSuccess?.();
	});

	return (
		<form onSubmit={deleteCategory}>
			<fieldset disabled={form.formState.isSubmitting} className="space-y-6">
				<div className="space-y-3">
					<Label className="grid gap-1">
						<span className="font-semibold">Token</span>
						<Input
							{...form.register("mutationToken", { required: true, min: 1 })}
							type="password"
						/>
					</Label>
				</div>

				<footer className="flex flex-row-reverse">
					<Button type="submit" intent="danger">
						Remove
					</Button>
				</footer>
			</fieldset>
		</form>
	);
}

export function RemoveCategoryModal() {
	const router = useRouter();

	const store = useDeleteCategoryModalStore();
	const { isOpen, setIsOpen } = store;
	const { category } = store;
	const { reset, closeModal } = store;

	useEffect(() => {
		return () => {
			reset();
		};
	}, [reset]);

	function handleFormSuccess() {
		router.invalidate();
		closeModal();
	}

	if (category === null) {
		return null;
	}

	return (
		<Dialog open={isOpen} onOpenChange={({ open }) => setIsOpen(open)}>
			<DialogContent className="space-y-6">
				<DialogHeader className="grid gap-3">
					<DialogTitle>Remove Category</DialogTitle>
					<DialogDescription className="grid">
						<span>
							Are you sure you want to remove{" "}
							<span className="font-bold">{category.name}</span>?
						</span>
						<span className="text-danger">This action cannot be undone!</span>
					</DialogDescription>
				</DialogHeader>

				<RemoveCategoryForm category={category} onSuccess={handleFormSuccess} />
			</DialogContent>
		</Dialog>
	);
}
