<script lang="ts" context="module">
	const formState = writable<'idle' | 'busy' | 'done'>();
	export const readableFormState = readonly(formState);
</script>

<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';
	import { Card } from '$lib/components/ui/card';
	import { AutoComplete } from '$lib/components/ui/auto-complete';
	import { Input } from '$lib/components/ui/input';
	import Universities from '$lib/components/universities.svelte';
	import { Search, Stars } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import Badge from '$lib/components/ui/badge.svelte';
	import { Disclosure } from '$lib/components/ui/disclosure';
	import { readableResults } from './survey/+page.svelte';
	import { page } from '$app/stores';
	import { readonly, writable } from 'svelte/store';

	export let data;
	let modeValues: { label: string; value?: string }[] = [];
	let cityValues: { label: string; value?: string }[] = [];
	let ownershipValues: { label: string; value?: string }[] = [];
	let degreeValues: { label: string; value?: string }[] = [];
	let mounted = false;

	const modes = [
		{ label: 'Full-time', value: 'full-time' },
		{ label: 'Remote', value: 'remote' }
	];
	const cities = [
		{ label: 'Warszawa', value: 'Warszawa' },
		{ label: 'Kraków', value: 'Kraków' },
		{ label: 'Łódź', value: 'Łódź' },
		{ label: 'Wrocław', value: 'Wrocław' },
		{ label: 'Poznań', value: 'Poznań' },
		{ label: 'Gdańsk', value: 'Gdańsk' },
		{ label: 'Szczecin', value: 'Szczecin' },
		{ label: 'Bydgoszcz', value: 'Bydgoszcz' },
		{ label: 'Lublin', value: 'Lublin' }
	];
	const ownership = [
		{ label: 'public', value: 'public' },
		{ label: 'private', value: 'private' },
		{ label: 'non-public', value: 'non-public' }
	];
	const degrees = [
		{ label: "Engineer's", value: "engineer's" },
		{ label: "Bachelor's", value: "bachelor's" },
		{ label: "Master's", value: "master's" },
		{ label: "Integrated Master's", value: "integrated master's" },
		{ label: 'Postgraduate', value: 'postgraduate' },
		{ label: 'Doctoral', value: 'doctoral' }
	];

	onMount(() => (mounted = true));

	let currentView: 'search' | 'survey';

	onMount(() => {
		mounted = true;
		const actionChoice = localStorage.getItem('action-choice') as 'search' | 'survey';
		currentView = actionChoice ? 'search' : 'survey';
	});

	$: formState.set(data.fetchState);
</script>

{#key mounted}
	<main
		class="z-10 flex min-h-[calc(100dvh)] justify-start items-center flex-col pt-24 md:pt-32 gap-6 sm:gap-8 pb-9 relative"
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
								value={$page.url.searchParams.get('search')}
								placeholder="Share a Bit About Yourself or Dive into University Search"
								required
								minlength={6}
							>
								<Stars slot="prefix" size="16" />
							</Input>
							<p class="ml-4 max-sm:hidden flex items-center gap-1 text-sm/6 text-muted-foreground">
								Not sure yet? Take a <Button variant="link" href="/survey" class="p-0"
									>quick survey!</Button
								>
							</p>
						</div>
						<Button
							class="max-sm:w-full"
							type="submit"
							variant="accent"
							loading={$readableFormState === 'busy'}
							disabled={$readableFormState === 'busy'}
						>
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
				<div in:scale|global={{ duration: 400, start: 0.9 }}>
					<Card let:Header let:Footer class="flex flex-col gap-6 items-center max-w-md">
						<Header let:Title let:Description>
							<Title class="text-center dark:tracking-wide">
								Unsure about your
								<span class="text-accent">ideal major?</span>
							</Title>
							<Description class="text-center">
								Answer a few simple questions to find out which field of study suites you the best!
							</Description>
						</Header>
						<Footer class="gap-4 max-sm:w-full">
							<Button
								href="/survey"
								variant="accent"
								class="w-full sm:w-24"
								on:click={() => {
									localStorage.setItem('action-choice', 'survey');
								}}
							>
								Yes
							</Button>
							<Button
								on:click={() => {
									localStorage.setItem('action-choice', 'search');
									currentView = 'search';
								}}
								class="w-full sm:w-24"
								variant="outline"
							>
								No
							</Button>
						</Footer>
					</Card>
				</div>
			{:else}
				<div class="h-[8.75rem] sm:h-[4.75rem]" />
			{/if}
		</div>
		{#if currentView === 'search'}
			<div class="w-full flex mx-auto container gap-5 flex-col max-w-xl">
				{#if data.universities.length}
					<Card class="w-full h-fit flex-1 p-4" let:Footer>
						<Disclosure let:Summary let:Details>
							<Summary>Filter</Summary>
							<Details class="mt-4 pb-2">
								<form class="flex gap-2 flex-col">
									<input type="hidden" name="search" value={$page.url.searchParams.get('search')} />

									<AutoComplete
										placeholder="Study form"
										label="Study form"
										required
										name="mode"
										let:Option
										multiple
										bind:value={modeValues}
									>
										{#each modes as { label, value } (value)}
											<Option {value}>
												{label}
											</Option>
										{/each}
									</AutoComplete>
									<div class="flex flex-wrap gap-2">
										{#each modeValues as mode}
											<Badge variant="outline">
												{mode.label}
											</Badge>
										{/each}
									</div>
									<AutoComplete
										placeholder="City"
										name="city"
										label="City"
										required
										let:Option
										multiple
										bind:value={cityValues}
									>
										{#each cities as { label, value } (value)}
											<Option {value}>
												{label}
											</Option>
										{/each}
									</AutoComplete>
									<div class="flex flex-wrap gap-3">
										{#each cityValues as city}
											<Badge variant="outline">
												{city.label}
											</Badge>
										{/each}
									</div>
									<AutoComplete
										placeholder="Type of university"
										label="Type of university"
										name="type"
										required
										let:Option
										multiple
										bind:value={ownershipValues}
									>
										{#each ownership as { label, value } (value)}
											<Option {value}>
												{label}
											</Option>
										{/each}
									</AutoComplete>
									<div class="flex flex-wrap gap-3">
										{#each ownershipValues as ownership}
											<Badge variant="outline">
												{ownership.label}
											</Badge>
										{/each}
									</div>
									<AutoComplete
										placeholder="Degree"
										label="Degree"
										required
										name="degree"
										let:Option
										multiple
										bind:value={degreeValues}
									>
										{#each degrees as { label, value } (value)}
											<Option {value}>
												{label}
											</Option>
										{/each}
									</AutoComplete>
									<div class="flex flex-wrap gap-3">
										{#each degreeValues as degree}
											<Badge variant="outline">
												{degree.label}
											</Badge>
										{/each}
									</div>
									<Footer>
										<Button variant="secondary" class="ml-auto">Apply</Button>
									</Footer>
								</form>
							</Details>
						</Disclosure>
					</Card>
				{/if}
				<Universities />
			</div>
		{/if}
	</main>
{/key}
