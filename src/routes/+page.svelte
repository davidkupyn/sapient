<script lang="ts" context="module">
	const formState = writable<'idle' | 'busy' | 'done' | 'error'>();
	export const readableFormState = readonly(formState);
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import SearchView from '$lib/components/filter-card.svelte';
	import SurveyViewCard from '$lib/components/survey-view-card.svelte';
	import Badge from '$lib/components/ui/badge.svelte';
	import Button from '$lib/components/ui/button.svelte';
	import { Input } from '$lib/components/ui/input';
	import Universities from '$lib/components/universities.svelte';
	import { Search, Stars } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { readonly, writable } from 'svelte/store';
	import { fade, scale } from 'svelte/transition';
	import { readableResults } from './survey/+page.svelte';

	let mounted = false;
	let currentView: 'search' | 'survey';

	onMount(() => {
		mounted = true;
		const actionChoice = localStorage.getItem('action-choice') as 'search' | 'survey';
		currentView = actionChoice ? 'search' : 'survey';
	});
</script>

{#key mounted}
	<main
		class="z-10 flex min-h-[calc(100dvh)] justify-start items-center flex-col pt-24 md:pt-32 gap-6 sm:gap-8 pb-9"
	>
		<div class="p-6 flex flex-col justify-center items-center gap-8">
			<h1
				in:scale={{ duration: 400, start: 0.9 }}
				class="text-center font-display antialiased py-2.5 [text-wrap:balance] text-4xl md:text-6xl bg-clip-text transition-all duration-1000 text-transparent bg-gradient-to-t selection:text-base-950 dark:selection:text-base-50 from-base-950 via-base-900 to-base-700 md:to-base-500 dark:from-base-400 dark:via-base-100 tracking-tighter dark:to-base-50"
			>
				Shape Your Future with
				<span
					class="bg-clip-text ml-1 text-transparent bg-gradient-to-t from-accent-focus to-accent-300 selection:text-accent-500 dark:selection:text-accent-400"
				>
					Sapient.
				</span>
			</h1>
			<p
				in:fade={{ duration: 400 }}
				class="text-center mb-6 text-sm [text-wrap:balance] bg-clip-text max-w-xl text-transparent transition-all delay-500 duration-1000 bg-gradient-to-t from-base-700 to-base-500 dark:from-base-400 dark:to-base-50 md:text-lg selection:text-foreground"
			>
				Just tell us your goals and skills, or take a quick survey. We'll help you find the perfect
				university and major. Let's get started!
			</p>
			{#if currentView === 'search'}
				<div class="flex flex-col gap-1 w-full max-w-xl items-center">
					<div class="flex gap-2 mb-1.5 w-full">
						{#each $readableResults as result}
							<Badge
								subtle
								variant={$page.url.searchParams.get('search') === result ? 'accent' : 'outline'}
								href="/?search={encodeURI(result)}">{result}</Badge
							>
						{/each}
					</div>
					<form
						in:scale|global={{ duration: 400, start: 0.9 }}
						on:submit={() => {
							formState.set('busy');
						}}
						class="w-full max-w-xl flex items-center sm:items-start gap-4 max-sm:flex-col"
					>
						<div class="w-full flex flex-col gap-1">
							<Input
								autocomplete="off"
								name="search"
								value={$page.url.searchParams.get('search') ?? ''}
								placeholder="Share a Bit About Yourself or Dive into University Search"
								required
								minlength={5}
							>
								<Stars slot="prefix" size="16" />
							</Input>
							<p class="ml-4 max-sm:hidden flex items-center gap-1 text-sm/6 text-muted-foreground">
								Not sure yet? Take a <Button variant="link" href="/survey" class="p-0"
									>quick survey!</Button
								>
							</p>
						</div>
						<Button class="max-sm:w-full" type="submit" variant="accent">
							<Search size="16" />
							Explore Now
						</Button>
						<p class="sm:hidden flex items-center gap-1 text-sm/6 text-muted-foreground">
							Not sure yet? Take a <Button href="/survey" variant="link" class="p-0"
								>quick survey!</Button
							>
						</p>
					</form>
				</div>
			{:else if currentView === 'survey'}
				<SurveyViewCard on:change-view={(e) => (currentView = e.detail.view)} />
			{:else}
				<div class="h-[8.75rem] sm:h-[4.75rem]" />
			{/if}
		</div>
		{#if currentView === 'search'}
			<div class="w-full flex mx-auto container gap-5 flex-col max-w-xl max-sm:px-6">
				<SearchView />
				<Universities />
			</div>
		{/if}
	</main>
{/key}
