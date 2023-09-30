<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import {
		CardSorter,
		swipeDispatcher,
		lastCardSorterAction,
		undoSwipeDispatcher,
		type SwipeActionType
	} from '$lib/components/card-sorter/index';
	import { Check, X } from 'lucide-svelte';
	import Button from '$lib/components/ui/button.svelte';
	import { cn, uuid } from '$lib/helpers';

	export let data;
	let actions: { type: SwipeActionType; id: number | string }[] = [];
	let reset = 0;

	$: cards = data.questions.map((question) => {
		return {
			question,
			id: uuid()
		};
	});
	let swipeNextCard = swipeDispatcher.dispatch;
	let undoSwipe = undoSwipeDispatcher.dispatch;
</script>

<svelte:window
	on:keydown={(e) => {
		if (e.key === 'ArrowLeft') swipeNextCard('left');
		if (e.key === 'ArrowRight') swipeNextCard('right');
		if (e.key === 'ArrowDown') swipeNextCard('bottom');
		if (e.key === 'z' && e.metaKey) undoSwipe();
	}}
/>

<main
	class="h-[calc(100dvh-6.5rem)] w-full px-6 pt-12 sm:pt-20 space-y-16 flex items-center flex-col overflow-hidden"
>
	<h1
		class="text-3xl font-bold font-display tracking-tighter text-center"
		in:scale={{ duration: 300, start: 0.9 }}
	>
		Let's Blitz through Questions!
	</h1>
	<div class="grid h-fit">
		{#if $lastCardSorterAction === 'left'}
			<div
				transition:fade={{ duration: 300 }}
				class="pointer-events-none aspect-[1/3] z-20 max-h-full sm:aspect-[3/5] w-full sm:w-1/2 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] left-0 from-error-500/50 via-error-500/0 dark:from-error-500/30 dark:via-error-500/0 to absolute top-1/2 -translate-y-1/2"
			/>
		{:else if $lastCardSorterAction === 'right'}
			<div
				transition:fade={{ duration: 300 }}
				class="pointer-events-none aspect-[1/3] z-20 max-h-full sm:aspect-[3/5] w-full sm:w-1/2 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] right-0 from-success-500/50 via-success-500/0 dark:from-success-500/30 dark:via-success-500/0 absolute top-1/2 -translate-y-1/2"
			/>
		{:else if $lastCardSorterAction === 'bottom'}
			<div
				transition:fade={{ duration: 300 }}
				class="pointer-events-none aspect-[3/1] sm:aspect-[4/1] z-20 max-w-full w-full bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] bottom-0 from-accent-500/50 via-accent-500/0 dark:from-accent-500/30 dark:via-accent-500/0 absolute left-1/2 -translate-x-1/2"
			/>
		{/if}
		<div>
			{#key reset}
				<div in:fade={{ duration: 150 }}>
					<CardSorter bind:cards bind:actions let:Placeholder>
						<div
							slot="card"
							let:card
							class={cn(
								'dark:shadow-[inset_0_2px_0_#ffffff0f,inset_0_-2px_0_#ffffff0f] shadow-[inset_0_2px_0_#0000000f,inset_0_-2px_0_#0000000f] grid bg-muted place-content-center transition ease-out rounded-xl w-72 h-96'
							)}
						>
							{card.question}
						</div>
						<Placeholder class="w-72 h-96 grid place-content-center">
							<span>empty</span>
						</Placeholder>
					</CardSorter>
				</div>
			{/key}
		</div>
		<div class="mt-16 mb-4 flex gap-4 mx-auto">
			<Button variant="secondary" on:click={() => swipeNextCard('left')}>
				<X size="20" />
				No
			</Button>
			<Button variant="secondary" on:click={() => swipeNextCard('right')}>
				<Check size="20" />
				Yes
			</Button>
		</div>
		<Button
			variant="secondary"
			size="icon"
			class="mb-12 w-[5.5rem] mx-auto"
			on:click={() => undoSwipe()}
		>
			Undo
		</Button>
	</div>
</main>
