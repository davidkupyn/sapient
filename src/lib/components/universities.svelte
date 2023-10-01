<script lang="ts">
	import type { University as UniversityType } from '$lib/types';
	import { page } from '$app/stores';
	import University from './university.svelte';
	import { fly } from 'svelte/transition';
	import { readableFormState } from '../../routes/+page.svelte';
	import { Loader2 } from 'lucide-svelte';

	$: universities = $page.data.universities as UniversityType[];
	$: console.log($readableFormState);
</script>

<div class="flex flex-col w-full max-w-xl gap-4">
	{#each universities as university, idx (idx)}
		<div in:fly|global={{ y: 150, duration: 300, delay: (idx + 1) * 75 }}>
			<University data={university} />
		</div>
	{/each}
	{#if $readableFormState === 'done'}
		<div class="hidden only:flex">Nie znaleziono</div>
	{:else if $readableFormState === 'busy'}
		skeleton
	{:else if $readableFormState === 'idle'}
		<div class="hidden only:flex">Wyszukaj cos, jeszcze nie pisales</div>
	{/if}
</div>
