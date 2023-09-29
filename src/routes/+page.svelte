<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/button.svelte';
	import { Input } from '$lib/components/ui/input';
	import { ArrowRight, Stars } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { fade, scale } from 'svelte/transition';

	let mounted = false;
	onMount(() => (mounted = true));
</script>

{#key mounted}
	<main
		class="z-10 flex h-[calc(100dvh-3.5rem)] justify-start items-center flex-col pt-24 md:pt-40 gap-12 pb-9"
	>
		<div class="p-6 flex flex-col justify-center items-center gap-8">
			<h1
				in:scale={{ duration: 400, start: 0.9 }}
				class="text-center font-display antialiased py-2.5 -my-2.5 [text-wrap:balance] text-4xl md:text-6xl bg-clip-text transition-all duration-1000 text-transparent bg-gradient-to-t selection:text-base-950 dark:selection:text-base-50 from-base-950 via-base-900 to-base-700 md:to-base-500 dark:from-base-400 dark:via-base-100 tracking-tighter dark:to-base-50"
			>
				Empower Your Journey with
				<span
					class="bg-clip-text ml-1 text-transparent bg-gradient-to-t from-accent-focus to-accent-300 selection:text-accent-500 dark:selection:text-accent-400"
				>
					Sapient.
				</span>
			</h1>
			<p
				in:fade={{ duration: 400 }}
				class="text-center text-sm [text-wrap:balance] bg-clip-text max-w-md text-transparent transition-all delay-500 duration-1000 bg-gradient-to-t from-base-700 to-base-500 dark:from-base-400 dark:to-base-50 md:text-lg selection:text-foreground"
			>
				Sapient is your personal guide to finding the perfect university and major.
			</p>
			<form
				use:enhance
				in:scale={{ duration: 400, start: 0.9 }}
				class="mt-4 max-sm:w-full flex items-center gap-4 max-sm:flex-col"
			>
				<div class="max-sm:w-full">
					<Input name="description" placeholder="Tell us about Yourself">
						<Stars slot="prefix" size="16" />
					</Input>
				</div>
				<Button class="max-sm:w-full" type="submit" variant="accent">
					Get Started
					<ArrowRight class="group-hover:translate-x-1 transition" size="16" />
				</Button>
			</form>
		</div>
		<div class="flex w-full p-6 md:p-12 gap-8 justify-center max-sm:flex-col max-sm:items-center">
			Something Beautiful Here
		</div>
	</main>
{/key}
