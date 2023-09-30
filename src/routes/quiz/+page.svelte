<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import { CardSorter, swipeDispatcher, cardSorterAction } from '$lib/components/card-sorter/index';
	import { Check, X } from 'lucide-svelte';
	import Button from '$lib/components/ui/button.svelte';
	import { cn, uuid } from '$lib/helpers';

	export let data;
	let actions: { type: 'left' | 'right'; id: number | string }[] = [];
	let reset = 0;

	$: cards = data.questions.map((question) => {
		return {
			question,
			id: uuid()
		};
	});
	let swipeNextCard = swipeDispatcher.dispatch;
</script>

<svelte:window
	on:keydown={(e) => {
		if (e.key === 'ArrowLeft') swipeNextCard('left');
		if (e.key === 'ArrowRight') swipeNextCard('right');
	}}
/>

<main
	class="min-h-[calc(100dvh-6.5rem)] w-full px-6 pt-12 sm:pt-20 space-y-16 flex items-center flex-col overflow-hidden"
>
	<h1
		class="text-3xl font-bold font-display tracking-tighter text-center"
		in:scale={{ duration: 300, start: 0.9 }}
	>
		Let's Blitz through Questions!
	</h1>
	<div class="grid h-fit">
		{#if $cardSorterAction === 'left'}
			<div
				transition:fade={{ duration: 300 }}
				class="pointer-events-none aspect-[1/3] z-20 sm:aspect-[3/5] w-full max-h-full sm:w-1/2 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] left-0 from-error-500/30 via-error-500/0 absolute top-1/2 -translate-y-1/2"
			/>
		{:else if $cardSorterAction === 'right'}
			<div
				transition:fade={{ duration: 300 }}
				class="pointer-events-none aspect-[1/3] z-20 sm:aspect-[3/5] w-full max-h-full sm:w-1/2 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] right-0 from-success-500/30 via-success-500/0 absolute top-1/2 -translate-y-1/2"
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
		<!-- <Button
			variant="secondary"
			size="icon"
			class="mb-12 w-[5.5rem] mx-auto"
			on:click={() => {
				actions = [];
				reset++;
			}}
		>
			Reset
		</Button>
	</div> -->
	</div>
</main>
