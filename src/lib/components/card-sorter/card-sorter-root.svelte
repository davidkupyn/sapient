<script lang="ts">
	import type { SwipeActionType } from '.';
	import Card from './card-sorter-card.svelte';
	import Placeholder from './card-sorter-placeholder.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	type T = $$Generic<{ id: number | string; swiped?: boolean }>;
	interface $$Slots {
		card: {
			card: T;
			upcomingAction?: SwipeActionType;
		};
		default: {
			Placeholder: typeof Placeholder;
		};
	}
	export let cards: T[] = [];
	export let actions: {
		type: SwipeActionType;
		id: number | string;
	}[] = [];

	// map over cards and set some as swiped if card.swiped is true
	let swipedCards: {
		[id: string]: boolean;
	} = cards.reduce((acc, card) => {
		acc[card.id] = card.swiped ?? false;
		return acc;
	}, {});
	function findTopId(swipedCards: { [id: string]: boolean }) {
		for (const [id, swiped] of Object.entries(swipedCards).reverse()) {
			if (!swiped) {
				return id;
			}
		}
	}
	$: topId = findTopId(swipedCards);
</script>

<div class="inline-grid place-items-center items-end gap-3">
	{#each cards as card, idx (card.id)}
		<Card
			class="z-[4] col-start-1 row-start-1 translate-y-4 scale-90 [&:nth-child(2)]:z-[5] [&:nth-child(2)]:translate-y-2 [&:nth-child(2)]:scale-95 [&:nth-child(1)]:z-20 [&:nth-child(1)]:translate-y-0 [&:nth-child(1)]:scale-100"
			on:swipe={(e) => {
				actions = [...actions, e.detail];
				dispatch('swipe', e.detail);
			}}
			on:undo={() => {
				actions = actions.slice(0, -1);
				dispatch('undo');
			}}
			id={card.id}
			bind:swiped={swipedCards[card.id]}
			let:upcomingAction
			rotation={idx}
			isTop={topId === card.id}
			isLastSwiped={card.id === actions[actions.length - 1]?.id}
		>
			<slot name="card" {card} {upcomingAction} />
		</Card>
	{/each}
	<slot {Placeholder} />
</div>
