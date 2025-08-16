import { randomInteger } from "@/lib/utils";

export type Category = {
	name: string;
	name_id: string;
	item_type_ct: number;
	total_item_ct: number;
};

const sampleCategories = Array.from({ length: 8 }, (_, idx) => {
	const category: Category = {
		name: `Category ${idx}`,
		name_id: `category-${idx}`,
		item_type_ct: randomInteger(),
		total_item_ct: randomInteger(),
	};

	return category;
});

export async function getCategories() {
	return sampleCategories;
}

export async function getCategory(filter?: {
	nameId?: string;
}) {
	for (const category of sampleCategories) {
		const isMatchingFilter = [filter?.nameId === category.name_id].every(
			Boolean,
		);

		if (isMatchingFilter) {
			return category;
		}
	}

	return null;
}
