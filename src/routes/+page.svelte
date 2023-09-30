<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';
	import { Card } from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input';
	import { Search, Stars } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;

	let mounted = false;
	const { form, errors, enhance } = superForm(data.form);

	onMount(() => (mounted = true));

	let currentView: 'search' | 'survey';

	onMount(() => {
		const actionChoice = localStorage.getItem('action-choice') as 'search' | 'survey';
		currentView = actionChoice ? 'search' : 'survey';
	});
</script>

{#key mounted}
	<main
		class="z-10 flex h-[calc(100dvh)] justify-start items-center flex-col pt-24 md:pt-40 gap-12 pb-9 relative"
	>
		<div class="p-6 flex flex-col justify-center items-center gap-8">
			<h1
				in:scale={{ duration: 400, start: 0.9 }}
				class="text-center font-display antialiased py-2.5 -my-2.5 [text-wrap:balance] text-4xl md:text-6xl bg-clip-text transition-all duration-1000 text-transparent bg-gradient-to-t selection:text-base-950 dark:selection:text-base-50 from-base-950 via-base-900 to-base-700 md:to-base-500 dark:from-base-400 dark:via-base-100 tracking-tighter dark:to-base-50"
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
				class="text-center mb-6 text-sm [text-wrap:balance] bg-clip-text max-w-2xl text-transparent transition-all delay-500 duration-1000 bg-gradient-to-t from-base-700 to-base-500 dark:from-base-400 dark:to-base-50 md:text-lg selection:text-foreground"
			>
				Just tell us your goals and skills, or take a quick survey. We'll help you find the perfect
				university and major. Let's get started!
			</p>

			{#if currentView === 'search'}
				<form
					method="POST"
					use:enhance
					in:scale|global={{ duration: 400, start: 0.9 }}
					class="w-full max-w-xl flex items-center sm:items-start gap-4 max-sm:flex-col"
				>
					<div class="w-full flex flex-col gap-1">
						<Input
							autocomplete="off"
							name="description"
							placeholder="Share Your Interests, Goals, and Preferences"
							bind:value={$form.description}
							error={$errors.description?.join(', ')}
							required
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
						Not sure yet? Take a <Button variant="link" class="p-0">quick survey!</Button>
					</p>
				</form>
			{:else if currentView === 'survey'}
				<div in:scale|global={{ duration: 400, start: 0.9 }}>
					<Card let:Header let:Footer class="flex flex-col gap-4 items-center max-w-md">
						<Header let:Title let:Description>
							<Title class="text-center">
								Unsure about your
								<span class="text-accent dark:tracking-wide">ideal major?</span>
							</Title>
							<Description class="text-center">
								Tu bedzie fajny opis ankiety, ktory napisze Gustaw z Szymonem, albo zrobi to za nich
								ChatGPT
							</Description>
						</Header>
						<Footer class="space-x-3">
							<Button
								href="/survey"
								variant="accent"
								on:click={() => {
									localStorage.setItem('action-choice', 'survey');
								}}>Yes</Button
							>
							<Button
								on:click={() => {
									localStorage.setItem('action-choice', 'search');
									currentView = 'search';
								}}
								variant="outline">No</Button
							>
						</Footer>
					</Card>
				</div>
			{/if}
		</div>
		<!-- <div
			class=" absolute flex p-6 md:p-12 gap-8 justify-center max-sm:flex-col max-sm:items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] w-full h-screen dark:to-accent-500/40 to-accent-500/75 z-50 from-background/0 via-background/0 bottom-0"
		/> -->
	</main>
{/key}
