<script lang="ts" context="module">
	const result = writable<string[]>([]);
	export const readableResults = readonly(result);
</script>

<script lang="ts">
	import { fade, scale, fly } from 'svelte/transition';
	import {
		CardSorter,
		swipeDispatcher,
		lastCardSorterAction,
		undoSwipeDispatcher,
		type SwipeActionType
	} from '$lib/components/card-sorter/index';
	import { Check, HelpCircle, InfoIcon, X } from 'lucide-svelte';
	import Button from '$lib/components/ui/button.svelte';
	import { cn, getMetakey } from '$lib/helpers';
	import { Modal } from '$lib/components/ui/modal';
	import Kbd from '$lib/components/ui/kbd.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { readonly, writable } from 'svelte/store';

	export let data;
	let actions: { type: SwipeActionType; id: number | string }[] = [];
	let reset = 0;
	let isInfoModalOpen = false;
	let previousQuestions: (typeof data.firstQuestion)[] = [];
	onMount(() => {
		$result = [];
		const isInfoModalShown = sessionStorage.getItem('info-modal-shown');
		if (isInfoModalShown === 'true') {
			isInfoModalOpen = false;
		} else {
			isInfoModalOpen = true;
			sessionStorage.setItem('info-modal-shown', 'true');
		}
	});

	let swipeNextCard = swipeDispatcher.dispatch;
	let undoSwipe = undoSwipeDispatcher.dispatch;
	let currentQuestion = data.firstQuestion;

	function setNextQuestions() {
		if (actions.length === 0) return data.firstQuestion;

		const lastAction = actions[actions.length - 1];
		if (currentQuestion.options[lastAction.type].options) {
			previousQuestions = [...previousQuestions, currentQuestion];
			return currentQuestion.options[lastAction.type];
		}

		$result = currentQuestion.options[lastAction.type].result;
		return currentQuestion;
	}
	function handleUndo() {
		console.log(actions);
		console.log(actions.length);
		if (actions.length === 0) {
			cards = [data.firstQuestion];
		}
	}
	$: cards = [...previousQuestions, currentQuestion];
</script>

<svelte:window
	on:keydown={(e) => {
		if (e.key === 'ArrowLeft') swipeNextCard('left');
		if (e.key === 'ArrowRight') swipeNextCard('right');
		if (e.key === 'z' && (e.metaKey || e.ctrlKey)) undoSwipe();
	}}
/>

<main
	class="min-h-[calc(100dvh-6.5rem)] w-full px-6 pt-12 sm:pt-20 space-y-16 flex items-center flex-col overflow-hidden"
>
	<h1
		class="text-xl sm:text-3xl [text-wrap:balance] font-bold font-display tracking-tighter text-center max-sm:flex-col flex items-center gap-3"
		in:scale={{ duration: 300, start: 0.9 }}
	>
		Let's Blitz through some Questions!

		<Button on:click={() => (isInfoModalOpen = true)} size="icon" variant="text" aria-hidden>
			<InfoIcon size="20" />
		</Button>
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
		{/if}
		<div>
			{#key reset}
				<div in:fade={{ duration: 150 }}>
					<CardSorter
						{cards}
						bind:actions
						let:Placeholder
						on:swipe={(e) => {
							if (e.detail === 'left' && actions.length === 0) goto('/');
							else currentQuestion = setNextQuestions();
						}}
						on:undo={() => handleUndo()}
					>
						<div
							in:scale|global={{ start: 0.8, duration: 200 }}
							slot="card"
							let:card
							class={cn(
								'dark:shadow-[inset_0_2px_0_#ffffff0f,inset_0_-2px_0_#ffffff0f] shadow-[inset_0_2px_0_#0000000f,inset_0_-2px_0_#0000000f] flex bg-[#EDEDEE] dark:bg-muted items-center justify-center gap-8 text-center flex-col p-4 transition ease-out rounded-xl w-60 h-80 md:w-72 md:h-96'
							)}
						>
							<HelpCircle class="text-accent" size="36" />
							<p class="mb-16">
								{card.question}
							</p>
						</div>
						<Placeholder
							class="w-full h-80 md:h-96 max-w-md flex flex-col items-center justify-center"
						>
							{#if $result.length}
								<h2 class="font-semibold leading-none mb-1.5 text-center tracking-tight">
									Perfect Match!
								</h2>
								<p class="text-sm text-muted-foreground mb-8 text-center">
									It's time to find your perfect major. We've narrowed it down to three options.
									Take a moment to reflect and choose the one that resonates with you the most.
								</p>
								<div class="flex-col flex gap-4 w-full mb-8">
									{#each $result as major, idx (major)}
										<a
											in:fly|global={{
												y: 150,
												duration: 300,
												delay: idx === 0 ? 150 : (idx + 1) * 75
											}}
											class="rounded-2xl bg-card w-full text-card-foreground hover:ring-accent transition duration-200 outline-none focus-visible:ring-accent ring-1 ring-foreground/10 shadow p-6 grid gap-6"
											href="/?search={encodeURI(major)}"
										>
											{major}
										</a>
									{/each}
								</div>
								<div in:scale={{ start: 0.8, duration: 200 }}>
									<Button href="/" variant="link">Back to Home</Button>
								</div>
							{/if}
						</Placeholder>
					</CardSorter>
				</div>
			{/key}
		</div>
		{#if !$result.length}
			<div class="space-y-4">
				<div class="mt-16 flex gap-4 mx-auto">
					<Button class="w-full" variant="outline" on:click={() => swipeNextCard('left')}>
						<X class="text-error" size="20" />
						No
					</Button>
					<Button class="w-full" variant="outline" on:click={() => swipeNextCard('right')}>
						<Check class="text-success" size="20" />
						Yes
					</Button>
				</div>

				<Button variant="text" class="w-full mx-auto" on:click={() => undoSwipe()}>Undo</Button>
			</div>
		{/if}
	</div>
</main>

<Modal alert let:Content bind:open={isInfoModalOpen} type="info" crossButton closeOnOutsideClick>
	<Content let:Header let:Footer class="max-w-md" let:close>
		<Header let:Title let:Description>
			<Title>Interactive Controls Guide</Title>
			<Description class="">
				<p class="mb-2">
					This page features interactive cards that you can navigate using various controls:
				</p>
				<ul class="list-disc list-inside pl-2">
					<li>Swipe left for 'No'</li>
					<li>Swipe right for 'Yes'</li>
					<li>
						Use arrow keys for navigation

						<Kbd class="ml-1">←</Kbd>
						<Kbd>→</Kbd>
					</li>
				</ul>
				<p class="mt-4">
					To undo your last action, you can either press <Kbd>{getMetakey()} + Z</Kbd>, or simply
					click the 'Undo' button.
				</p>
			</Description>
		</Header>
		<Footer>
			<Button melt={close} variant="accent">Understood</Button>
		</Footer>
	</Content>
</Modal>
