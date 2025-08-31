import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/core/components/ark-ui/Dialog";
import { useEditCategoryModalStore } from "./useEditCategoryModalStore";

export function EditCategoryModal() {
	const store = useEditCategoryModalStore();
	const { isOpen, setIsOpen } = store;
	const { category } = store;

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
			</DialogContent>
		</Dialog>
	);
}
