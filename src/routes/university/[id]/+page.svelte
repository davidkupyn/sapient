<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';
	import { Facebook, Loader2, Mail, Phone } from 'lucide-svelte';

	export let data;
</script>

<main class="grid place-content-center">
	{#await data.streamed.data}
		<Loader2 class="animate-spin" size="16" />
	{:then data}
		{@const [name, address, city, url, email, fb, phone, desc, rec_desc] = data}
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
	{/await}
</main>
