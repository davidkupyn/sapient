<script>
	import { page } from '$app/stores';
	import { themeStore } from '$lib/components/theme-switcher';
	import ThemeProvider from '$lib/components/theme-switcher/theme-provider.svelte';
	import Button from '$lib/components/ui/button.svelte';
	import { Menu } from '$lib/components/ui/menu';
	import Separator from '$lib/components/ui/separator.svelte';
	import { cn } from '$lib/helpers';
	import { BrainCircuit, Monitor, Moon, Sun } from 'lucide-svelte';
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
			class="font-bold flex items-center gap-2 -ml-2 p-1 focus-visible:ring-2 focus-visible:outline-none rounded-lg transition ring-offset-base-50 dark:ring-offset-base-950 focus-visible:ring-primary-600"
		>
			<BrainCircuit size="20" class="text-accent dark:text-foreground" />
			Sapient
		</a>
		<nav>
			<ul class="inline-flex gap-2 items-center -mr-4">
				<li>
					<Menu let:trigger let:Content>
						<Button melt={trigger} aria-label="Language picker" variant="ghost" size="icon"
							>EN</Button
						>
						<Content let:RadioGroup>
							<RadioGroup let:Radio value="en">
								<Radio value="en">English</Radio>
								<Radio value="pl" disabled>Polish</Radio>
							</RadioGroup>
						</Content>
					</Menu>
				</li>
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

<footer
	class={cn(
		'border-muted z-[0] w-full mt-8 bg-background',
		$page.url.pathname === '/' ? '' : 'border-t'
	)}
>
	<div class="container mx-auto flex justify-between items-center px-6 h-14 relative bottom-0">
		<span class="mx-auto text-sm text-muted-foreground font-medium">&copy Techni Schools</span>
	</div>
</footer>
