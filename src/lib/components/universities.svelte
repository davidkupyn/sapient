<script lang="ts">
	import { page } from '$app/stores';
	import type { University as UniversityType } from '$lib/types';
	import { GraduationCap, SearchX } from 'lucide-svelte';
	import { fly, scale } from 'svelte/transition';
	import Skeleton from './ui/skeleton.svelte';
	import University from './university.svelte';

	$: universities = $page.data.streamed.universities as UniversityType[];
</script>

{#await universities}
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
	{/each}
	{#if $page.url.searchParams.has('search') && !universities.length}
		<div
			in:scale|global={{ start: 0.9, duration: 200 }}
			class="hidden only:flex gap-6 flex-col items-center"
		>
			<SearchX class="text-accent" size="36" />
			<p class="text-center max-w-md w-full [text-wrap:balance]">
				Unfortunately, we weren't able to find anything for you. Perhaps try searching in a
				different way.
			</p>
		</div>
	{:else if !universities.length}
		<div
			in:scale|global={{ start: 0.9, duration: 200 }}
			class="hidden only:flex gap-6 flex-col items-center"
		>
			<GraduationCap class="text-accent" size="36" />
			<p class="text-center max-w-md w-full [text-wrap:balance]">
				Start by searching for a university or a major.
			</p>
		</div>
	{/if}
{:catch _}
	<div
		in:scale|global={{ start: 0.9, duration: 200 }}
		class="hidden only:flex gap-6 flex-col items-center"
	>
		<SearchX class="text-accent" size="36" />
		<p class="text-center max-w-xs w-full">
			Unfortunately, we weren't able to find anything for you. Perhaps try searching in a different
			way.
		</p>
	</div>
{/await}
