import { createDispatcher, createProtectedStore } from '$lib/helpers';
import { readonly } from 'svelte/store';

export { default as CardSorter } from './card-sorter-root.svelte';
export type SwipeActionType = 'left' | 'right';
type SwipeAction = (type: SwipeActionType) => void;
export const swipeDispatcher = createDispatcher<SwipeAction>();
export const undoSwipeDispatcher = createDispatcher<() => void>();

export const cardSorterAction = createProtectedStore<SwipeActionType | undefined>();
export const lastCardSorterAction = readonly(cardSorterAction);

// export const swipedCards = writable<{ id: string; swiped: boolean }[]>([]);

// export function undoSwipe() {
// 	swipedCards.update((swipedCards) => {
// 		const lastSwipedCard = swipedCards.find(({ swiped }) => swiped);
// 		if (lastSwipedCard) {
// 			swipedCards.splice(swipedCards.indexOf(lastSwipedCard), 1);
// 		}

// 		return swipedCards;
// 	});
// }
// x
