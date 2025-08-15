import { randomInteger } from "./utils";

type Category = {
	id: string;
	name: string;
	slug: string;
	item_type_ct: number;
	total_item_ct: number;
};

export const categories = Array.from({ length: 8 }, (_, idx) => {
	const category: Category = {
		id: crypto.randomUUID(),
		name: `Category ${idx}`,
		slug: `category-${idx}`,
		item_type_ct: randomInteger(),
		total_item_ct: randomInteger(),
	};

	return category;
});
