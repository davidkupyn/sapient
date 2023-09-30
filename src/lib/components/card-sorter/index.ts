import { createDispatcher, createProtectedStore } from '$lib/helpers';

export { default as CardSorter } from './card-sorter-root.svelte';

type SwipeAction = (type: 'left' | 'right') => void;
export const swipeDispatcher = createDispatcher<SwipeAction>();

export const cardSorterAction = createProtectedStore<'left' | 'right' | undefined>();
