<script lang="ts">
	import { page } from '$app/stores';
	import { AutoComplete } from '$lib/components/ui/auto-complete';
	import Badge from '$lib/components/ui/badge.svelte';
	import Button from '$lib/components/ui/button.svelte';
	import { Card } from '$lib/components/ui/card';
	import { Disclosure } from '$lib/components/ui/disclosure';
	import Universities from '$lib/components/universities.svelte';

	let modeValues: { label: string; value: string }[] = [];
	let cityValues: { label: string; value: string }[] = [];
	let ownershipValues: { label: string; value: string }[] = [];
	let degreeValues: { label: string; value: string }[] = [];

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
</script>

{#if $page.data.streamed.universities.length}
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
