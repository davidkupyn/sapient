<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';
	import { Card } from '$lib/components/ui/card';
	import { AutoComplete } from '$lib/components/ui/auto-complete';
	import { Input } from '$lib/components/ui/input';
	import Universities from '$lib/components/universities.svelte';
	import { Search, Stars } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import { superForm } from 'sveltekit-superforms/client';
	import Badge from '$lib/components/ui/badge.svelte';
	import { Disclosure } from '$lib/components/ui/disclosure';

	export let data;
	let modeValues: { label: string; value?: string }[] = [];
	let cityValues: { label: string; value?: string }[] = [];
	let ownershipValues: { label: string; value?: string }[] = [];
	let degreeValues: { label: string; value?: string }[] = [];
	let accordionValue = '';
	let mounted = false;
	const { form, errors, enhance } = superForm(data.form);

	const modes = [
		{ label: 'stacjonarne', value: 'stacjonarne' },
		{ label: 'zdalne', value: 'zdalne' }
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
		{ label: 'publiczna', value: 'publiczna' },
		{ label: 'prywatna', value: 'prywatna' },
		{ label: 'niepubliczna', value: 'niepubliczna' }
	];
	const degrees = [
		{ label: 'inżynierskie', value: 'inżynierskie' },
		{ label: 'licencjackie', value: 'licencjackie' },
		{ label: 'magisterskie', value: 'magisterskie' },
		{ label: 'jednolite magisterskie', value: 'jednolite magisterskie' },
		{ label: 'podyplomowe', value: 'podyplomowe' },
		{ label: 'doktoranckie', value: 'doktoranckie' }
	];

	onMount(() => (mounted = true));

	let currentView: 'search' | 'survey';

	onMount(() => {
		mounted = true;
		const actionChoice = localStorage.getItem('action-choice') as 'search' | 'survey';
		currentView = actionChoice ? 'search' : 'survey';
	});
</script>

{#key mounted}
	<main
		class="z-10 flex min-h-[calc(100dvh)] justify-start items-center flex-col pt-24 md:pt-32 gap-8 sm:gap-16 pb-9 relative"
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
		<Card class="w-full max-w-xl">
			<Disclosure let:Summary let:Details bind:value={accordionValue}>
				<Summary>Filtry</Summary>
				<Details class="flex gap-4 flex-col">
					<AutoComplete
						placeholder="Tryb Nauczania"
						label="Tryb Nauczania"
						required
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
					<div class="flex flex-wrap gap-3">
						{#each modeValues as mode}
							<Badge>
								{mode.label}
							</Badge>
						{/each}
					</div>
					<AutoComplete
						placeholder="Miasto"
						label="Miasto"
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
							<Badge>
								{city.label}
							</Badge>
						{/each}
					</div>
					<AutoComplete
						placeholder="Typ Uczelni"
						label="Typ Uczelni"
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
							<Badge>
								{ownership.label}
							</Badge>
						{/each}
					</div>
					<AutoComplete
						placeholder="Stopień"
						label="Stopień"
						required
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
							<Badge>
								{degree.label}
							</Badge>
						{/each}
					</div>
				</Details>
			</Disclosure>

			<!-- multipleAutocomplete - tryb - zdalny/stacjonarny multipleAutocomplete - miasto
			multipleAutocomplete - typ uczelni - prywatna/publiczna/niepubliczne multipleAutocomplete -
			stopień -
			inźynierskie/licencjackie/magisterskie/jednoliteMagisterskie/podyplomowe/doktoranckie
			multipleAutocomplete - kierunki -->
		</Card>
		<!-- <div
			class=" absolute flex p-6 md:p-12 gap-8 justify-center max-sm:flex-col max-sm:items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] w-full h-screen dark:to-accent-500/40 to-accent-500/75 z-50 from-background/0 via-background/0 bottom-0"
		/> -->
		<div />
	</main>
{/key}
