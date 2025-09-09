import type { PublicCategory } from "@/core/api/codegen";
import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { flow } from "es-toolkit";

type State = {
	isOpen: boolean;
	category: PublicCategory | null;
};
const _state: State = {
	isOpen: false,
	category: null,
};

const StateQueryOptions = queryOptions({
	queryKey: ["modal", "category", "edit"],
	async queryFn() {
		return { ..._state };
	},
});

export function useEditCategoryModalStore() {
	const queryClient = useQueryClient();

	const stateQuery = useQuery(StateQueryOptions);
	const invalidateStateQuery = () =>
		queryClient.invalidateQueries({
			queryKey: StateQueryOptions.queryKey,
		});

	const state = stateQuery.data ?? _state;

	const setIsOpen = flow((isOpen: State["isOpen"]) => {
		_state.isOpen = isOpen;
	}, invalidateStateQuery);
	const open = () => setIsOpen(true);
	const close = () => setIsOpen(false);

	const setCategoryToEdit = flow((category: State["category"]) => {
		_state.category = category;
		_state.isOpen = true;
	}, invalidateStateQuery);

	return {
		...state,
		...{
			...{ setIsOpen, open, close },
			setCategoryToEdit,
		},
	};
}
