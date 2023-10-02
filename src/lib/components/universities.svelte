<script lang="ts">
	import { page } from '$app/stores';
	import type { University as UniversityType } from '$lib/types';
	import { SearchX } from 'lucide-svelte';
	import { fly } from 'svelte/transition';
	import { readableFormState } from '../../routes/+page.svelte';
	import Skeleton from './ui/skeleton.svelte';
	import University from './university.svelte';

	$: universities = $page.data.universities as UniversityType[];
</script>

<div class="flex flex-col w-full max-w-xl gap-4">
	<!-- {#if universities && $readableFormState !== 'busy'}
		{#each universities as university, idx (idx)}
			<div in:fly|global={{ y: 150, duration: 300, delay: (idx + 1) * 75 }}>
				<University data={university} />
			</div>
		{/each}
	{/if}
	{#if $readableFormState === 'done'}
		<div class="hidden only:flex gap-6 flex-col items-center">
			<SearchX class="text-accent" size="36" />
			<p class="text-center max-w-xs w-full">
				Unfortunately, we weren't able to find anything for you. Perhaps try searching in a
				different way.
			</p>
		</div>
	{:else if $readableFormState === 'busy'}
		{#each { length: 3 } as _, idx (idx)}
			<div in:fly|global={{ y: 150, duration: 300, delay: (idx + 1) * 75 }}>
				<Skeleton class="rounded-2xl w-full h-[4.5rem]" />
			</div>
		{/each}
	{/if} -->

	{#await $page.data.universities}
		{#each { length: 3 } as _, idx (idx)}
			<div in:fly|global={{ y: 150, duration: 300, delay: (idx + 1) * 75 }}>
				<Skeleton class="rounded-2xl w-full h-[4.5rem]" />
			</div>
		{/each}
	{:then universities}
		{#each universities as university, idx (idx)}
			<div in:fly|global={{ y: 150, duration: 300, delay: (idx + 1) * 75 }}>
				<University data={university} />
			</div>
		{:else}
			{#if $page.url.searchParams.has('search')}
				<div class="hidden only:flex gap-6 flex-col items-center">
					<SearchX class="text-accent" size="36" />
					<p class="text-center max-w-xs w-full">
						Unfortunately, we weren't able to find anything for you. Perhaps try searching in a
						different way.
					</p>
				</div>
			{/if}
		{/each}
	{:catch _}
		<div class="hidden only:flex gap-6 flex-col items-center">
			<SearchX class="text-accent" size="36" />
			<p class="text-center max-w-xs w-full">
				Unfortunately, we weren't able to find anything for you. Perhaps try searching in a
				different way.
			</p>
		</div>
	{/await}
</div>
