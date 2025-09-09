import { newItemType } from "@/core/api/codegen";
import { Button } from "@/core/components/Button";
import { Input } from "@/core/components/Input";
import { Label } from "@/core/components/Label";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/core/components/ark-ui/Dialog";
import { cn } from "@/lib/tailwind";
import { getRouteApi, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Route = getRouteApi("/$categoryNameId/");

function NewItemTypeForm(props: { onSuccess?: () => void }) {
	const { categoryNameId } = Route.useParams();

	const form = useForm<{
		itemTypeName: string;
		quantity: number;
	}>();

	const createItemType = form.handleSubmit(async (formData) => {
		await newItemType({
			body: {
				category_name_id: categoryNameId,
				item_type_name: formData.itemTypeName,
				item_ct: formData.quantity,
			},
		});

		props.onSuccess?.();
	});

	return (
		<form onSubmit={createItemType}>
			<fieldset disabled={form.formState.isSubmitting} className="space-y-6">
				<div className="space-y-3">
					<Label className="grid gap-1">
						<span className="font-semibold">Item Type Name</span>
						<Input
							{...form.register("itemTypeName", { required: true, min: 1 })}
						/>
					</Label>

					<Label className="grid gap-1">
						<span className="font-semibold">Quantity</span>
						<Input
							{...form.register("quantity", {
								valueAsNumber: true,
								required: true,
								min: 1,
							})}
							type="number"
							min={1}
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

export function NewItemTypeModal(props: {
	className?: string;
}) {
	const router = useRouter();
	const [open, setIsOpen] = useState(false);

	function closeModal() {
		setIsOpen(false);
	}

	function handleFormSuccess() {
		closeModal();
		router.invalidate();
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
					New Item Type
				</Button>
			</DialogTrigger>

			<DialogContent className="space-y-6">
				<DialogHeader>
					<DialogTitle>New Item Type</DialogTitle>
					<DialogDescription>Create new items</DialogDescription>
				</DialogHeader>

				<NewItemTypeForm onSuccess={handleFormSuccess} />
			</DialogContent>
		</Dialog>
	);
}
