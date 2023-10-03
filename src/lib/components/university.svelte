<script lang="ts">
	import type { University } from '$lib/types';
	import Badge from './ui/badge.svelte';

	export let data: University;
	const [id, name, city] = data;
</script>

<a
	href="/university/{id}"
	class="rounded-2xl bg-card text-card-foreground ring-1 ring-foreground/10 shadow p-6 gap-6 flex flex-row justify-between items-start"
>
	<h4>{name}</h4>
	<Badge variant="outline" class="w-auto h-4 p-1">{city}</Badge>
</a>
