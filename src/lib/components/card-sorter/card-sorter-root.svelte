<script lang="ts">
	import Placeholder from './card-sorter-placeholder.svelte';
	import Card from './card-sorter-card.svelte';
	import { randRange } from '$lib/helpers/random';

	type T = $$Generic<{ id: number | string }>;
	interface $$Slots {
		card: {
			card: T;
			upcomingAction: 'left' | 'right' | undefined;
		};
		default: {
			Placeholder: typeof Placeholder;
		};
	}
	export let cards: T[] = [];
	export let actions: {
		type: 'left' | 'right';
		id: number | string;
	}[] = [];

	let swipedCards: boolean[] = [];
	let topIdx = 0;
	$: topIdx = swipedCards.findIndex((v) => !v);
</script>

<div class="inline-grid place-items-center items-end gap-3">
	{#each cards as card, idx (card.id)}
		<Card
			class="z-[4] col-start-1 row-start-1 translate-y-4 scale-90 [&:nth-child(2)]:z-[5] [&:nth-child(2)]:translate-y-2 [&:nth-child(2)]:scale-95 [&:nth-child(1)]:z-20 [&:nth-child(1)]:translate-y-0 [&:nth-child(1)]:scale-100"
			on:swipe={(e) => (actions = [...actions, e.detail])}
			id={card.id}
			bind:swiped={swipedCards[idx]}
			let:upcomingAction
			rotation={randRange(-3, 6)}
			isTop={topIdx === idx}
		>
			<slot name="card" {card} {upcomingAction} />
		</Card>
	{/each}
	<slot {Placeholder} />
</div>
