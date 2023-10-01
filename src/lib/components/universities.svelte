<script lang="ts">
	import { page } from '$app/stores';
	import type { University as UniversityType } from '$lib/types';
	import { fly } from 'svelte/transition';
	import { readableFormState } from '../../routes/+page.svelte';
	import University from './university.svelte';

	$: universities = $page.data.universities as UniversityType[];
	$: console.log(universities);
</script>

<div class="flex flex-col w-full max-w-xl gap-4">
	{#if universities}
		{#each universities as university, idx (idx)}
			<div in:fly|global={{ y: 150, duration: 300, delay: (idx + 1) * 75 }}>
				<University data={university} />
			</div>
		{/each}
	{/if}
	{#if $readableFormState === 'done'}
		<div class="hidden only:flex">Nie znaleziono</div>
	{:else if $readableFormState === 'busy'}
		skeleton
	{:else if $readableFormState === 'idle'}
		<div class="hidden only:flex">Wyszukaj cos, jeszcze nie pisales</div>
	{:else if $readableFormState === 'error'}
		<div class="hidden only:flex">WErrore eororryszukaj cos, jeszcze nie pisales</div>
	{/if}
</div>
