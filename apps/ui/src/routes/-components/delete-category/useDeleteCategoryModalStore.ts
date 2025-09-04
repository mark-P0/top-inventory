import type { PublicCategory } from "@/core/api/codegen";
import { create } from "zustand";
import { combine } from "zustand/middleware";

type State = {
	isOpen: boolean;
	category: PublicCategory | null;
};

const INITIAL_STATE: State = {
	isOpen: false,
	category: null,
};

const storeCreator = combine(INITIAL_STATE, (set) => ({
	setIsOpen: (isOpen: State["isOpen"]) => set({ isOpen }),

	reset: () => set(INITIAL_STATE),
	closeModal: () => set({ isOpen: false }),
	openModalWithCategory: (category: PublicCategory) =>
		set({ isOpen: true, category }),
}));

export const useDeleteCategoryModalStore = create(storeCreator);
