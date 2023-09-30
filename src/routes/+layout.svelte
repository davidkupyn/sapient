<script>
	import { page } from '$app/stores';
	import { themeStore } from '$lib/components/theme-switcher';
	import ThemeProvider from '$lib/components/theme-switcher/theme-provider.svelte';
	import Button from '$lib/components/ui/button.svelte';
	import { Menu } from '$lib/components/ui/menu';
	import Separator from '$lib/components/ui/separator.svelte';
	import { cn } from '$lib/helpers';
	import { Monitor, Moon, Sun } from 'lucide-svelte';
	import '../app.postcss';
</script>

<svelte:head>
	<title>Sapient</title>
	<meta
		name="description"
		content="Sapient is your personal guide to finding the perfect university and major.
"
	/>
	<meta name="author" content="Techni Schools Team" />
</svelte:head>
<ThemeProvider attribute="class" disableTransitionOnChange storageKey="essense-theme" />
<header
	class={cn(
		'w-full z-20',
		$page.url.pathname === '/sidebar' && 'hidden',
		$page.url.pathname === '/' && 'absolute'
	)}
>
	<div class="container mx-auto flex justify-between items-center px-6 h-12">
		<a
			href="/"
			aria-label="Go to home page"
			class="font-bold flex items-center gap-3 -ml-2 p-1 focus-visible:ring-2 focus-visible:outline-none rounded-lg transition ring-offset-base-50 dark:ring-offset-base-950 focus-visible:ring-primary-600"
		>
			Sapient
		</a>
		<nav>
			<ul class="inline-flex gap-2 items-center -mr-4">
				<li>
					<Menu let:trigger let:Content>
						<Button melt={trigger} aria-label="Theme picker" variant="ghost" size="icon">
							{#if $themeStore.theme === 'dark'}
								<Moon size="16" />
							{:else if $themeStore.theme === 'light'}
								<Sun size="16" />
							{:else}
								<Monitor size="16" />
							{/if}
						</Button>
						<Content let:RadioGroup>
							<RadioGroup let:Radio bind:value={$themeStore.theme}>
								<Radio value="dark">Dark</Radio>
								<Radio value="light">Light</Radio>
								<Radio value="system">System</Radio>
							</RadioGroup>
						</Content>
					</Menu>
				</li>
				<Separator orientation="vertical" class="h-6 mx-2" />
				<li>
					<Button href="/about" variant="text">About</Button>
				</li>
			</ul>
		</nav>
	</div>
</header>

<slot />
<!-- 
<div
	class="pointer-events-none absolute flex p-6 md:p-12 gap-8 justify-center max-sm:flex-col max-sm:items-center w-full h-screen bottom-0 bg-gradient-to-b from-accent-500/50 dark:from-accent-600/25 via-accent-500/5 dark:via-accent-900/5 to-background/0 dark:to-background/0"
/> -->

<footer
	class={cn(
		'border-muted z-[0] w-full bottom-0',
		$page.url.pathname === '/' ? 'fixed' : 'border-t'
	)}
>
	<div class="container mx-auto flex justify-between items-center px-6 h-14">
		<span class="mx-auto text-sm text-muted-foreground">
			<span class="mr-1.5">&copy</span><a
				href="https://github.com/davidkupyn"
				target="_blank"
				class="font-medium border-b border-opacity-0 dark:border-opacity-0 border-base-500 dark:border-base-400 hover:border-opacity-100 dark:hover:border-opacity-100 transition"
				>Techni Schools</a
			>
		</span>
	</div>
</footer>
