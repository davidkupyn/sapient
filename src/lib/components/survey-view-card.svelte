<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';
	import { Card } from '$lib/components/ui/card';
	import { createEventDispatcher } from 'svelte';
	import { scale } from 'svelte/transition';

	const dispatch = createEventDispatcher();
</script>

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
					dispatch('change-view', { view: 'search' });
				}}
				class="w-full sm:w-24"
				variant="outline"
			>
				No
			</Button>
		</Footer>
	</Card>
</div>
