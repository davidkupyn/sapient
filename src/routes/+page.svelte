<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';
	import { Input } from '$lib/components/ui/input';
	import { Search, Stars } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;

	let mounted = false;
	const { form, errors, enhance } = superForm(data.form);

	onMount(() => (mounted = true));
</script>

{#key mounted}
	<main
		class="z-10 flex h-[calc(100dvh)] justify-start items-center flex-col pt-24 md:pt-40 gap-12 pb-9 relative"
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
				method="POST"
				use:enhance
				in:scale={{ duration: 400, start: 0.9 }}
				class="mt-4 w-full max-w-xl flex items-center sm:items-start gap-4 max-sm:flex-col"
			>
				<div class="w-full">
					<Input
						autocomplete="off"
						name="description"
						placeholder="Share Your Interests, Goals, and Preferences"
						bind:value={$form.description}
						error={$errors.description?.join(', ')}
						required
					>
						<Stars slot="prefix" size="16" />
					</Input>
				</div>
				<Button class="max-sm:w-full" type="submit" variant="accent">
					<Search size="16" />
					Explore Now
				</Button>
			</form>
		</div>
		<!-- <div
			class=" absolute flex p-6 md:p-12 gap-8 justify-center max-sm:flex-col max-sm:items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] w-full h-screen dark:to-accent-500/40 to-accent-500/75 z-50 from-background/0 via-background/0 bottom-0"
		/> -->
	</main>
{/key}
