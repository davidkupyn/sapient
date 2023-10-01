<script lang="ts">
	import type { University as UniversityType } from '$lib/types';
	import { page } from '$app/stores';
	import University from './university.svelte';
	import { fly } from 'svelte/transition';
	$: universities = $page.data.universities as UniversityType[];
</script>

<div class="flex flex-col w-full max-w-xl gap-4">
	{#each universities as university, idx (idx)}
		<div in:fly|global={{ y: 150, duration: 300, delay: (idx + 1) * 75 }}>
			<University data={university} />
		</div>
	{/each}
	{#if !!$page.url.searchParams.get('search')}
		<div class="hidden only:flex">Nie mo</div>
	{/if}
</div>
