import { removeCategory } from "@/core/api/codegen";
import { Button } from "@/core/components/Button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/core/components/ark-ui/Dialog";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { useDeleteCategoryModalStore } from "./useDeleteCategoryModalStore";

export function RemoveCategoryModal() {
	const router = useRouter();

	const store = useDeleteCategoryModalStore();
	const { isOpen, setIsOpen } = store;
	const { category } = store;
	const { reset, closeModal } = store;

	const removeCategoryMutation = useMutation({
		mutationKey: ["category", category?.uuid],
		async mutationFn() {
			if (category === null) {
				throw new Error("Category not available?");
			}

			await removeCategory({
				path: {
					uuid: category.uuid,
				},
			});

			await router.invalidate();
			closeModal();
		},
	});

	useEffect(() => {
		return () => {
			reset();
		};
	}, [reset]);

	function deleteCategory() {
		removeCategoryMutation.mutate();
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
						<span className="text-red-600">This action cannot be undone!</span>
					</DialogDescription>
				</DialogHeader>

				<footer className="flex flex-row-reverse">
					<Button intent="danger" onClick={deleteCategory}>
						Remove
					</Button>
				</footer>
			</DialogContent>
		</Dialog>
	);
}
