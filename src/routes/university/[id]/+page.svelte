<script lang="ts">
	export let data;
	import { Accordion } from '$lib/components/ui/accordion';
	import Button from '$lib/components/ui/button.svelte';
	const name = data.data[0][0];
	const address = data.data[0][1];
	const city = data.data[0][2];
	const url = data.data[0][3];
	const email = data.data[0][4];
	const fb = data.data[0][5];
	const phone = data.data[0][6];
	const desc = data.data[0][7];
	const rec_desc = data.data[0][8];
	import { Card } from '$lib/components/ui/card';
	import { Facebook, Mail, Phone } from 'lucide-svelte';
</script>

<main class="grid place-content-center">
	<div class="max-w-3xl w-3xl gap-4 flex flex-col">
		<div class="mx-auto flex flex-col items-center gap-1.5">
			<h1 class="text-xl sm:text-3xl font-bold font-display tracking-tighter text-center">
				{name}
			</h1>
			<h2 class="text-muted-foreground">{address}, {city}</h2>
			<Button variant="link" external href={url} class="w-fit">
				{url}
			</Button>
		</div>
		<div class="space-y-6">
			<div class="space-y-3">
				<h3 class="text-lg font-semibold leading-none tracking-tight">Description</h3>
				<p class="leading-relaxed">
					{desc}
				</p>
			</div>
			<div class="space-y-3">
				<h3 class="text-lg font-semibold leading-none tracking-tight">Recruitment description</h3>
				<p class="leading-relaxed">
					{rec_desc}
				</p>
			</div>
			<div class="space-y-3">
				<h3 class="text-lg font-semibold leading-none tracking-tight">Contact</h3>
				<ul class="space-y-1.5">
					{#if phone}
						<li class="flex items-center gap-1">
							<Phone size={16} />
							{phone}
						</li>
					{/if}
					{#if email}
						<li class="flex items-center gap-1">
							<Mail size={16} />
							{email}
						</li>
					{/if}
					{#if fb}
						<li class="flex items-center gap-1">
							<Facebook size={16} />
							{fb}
						</li>
					{/if}
				</ul>
			</div>
		</div>
	</div>
</main>
