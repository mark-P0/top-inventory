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

export async function getAllCategories() {
	return sampleCategories;
}

export async function getCategoryBySlug(slug: string) {
	for (const category of sampleCategories) {
		if (category.name_id === slug) {
			return category;
		}
	}

	return null;
}
