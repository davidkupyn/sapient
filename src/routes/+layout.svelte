<script>
	import ThemeProvider from '$lib/components/theme-switcher/theme-provider.svelte';
	import { page } from '$app/stores';
	import Button from '$lib/components/ui/button.svelte';
	import { Menu } from '$lib/components/ui/menu';
	import { cn } from '$lib/helpers';
	import { Monitor, Moon, Sun } from 'lucide-svelte';
	import '../app.postcss';
	import { themeStore } from '$lib/components/theme-switcher';
	import Separator from '$lib/components/ui/separator.svelte';
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

<footer
	class={cn('border-muted w-full', $page.url.pathname === '/sidebar' ? 'hidden' : 'border-t')}
>
	<div class="container mx-auto flex justify-between items-center px-6 h-14">
		<span class="mx-auto text-sm text-muted-foreground">
			<span class="mr-1.5">&copy</span><a
				href="https://github.com/davidkupyn"
				target="_blank"
				class="font-medium border-b border-opacity-0 dark:border-opacity-0 border-base-500 dark:border-base-400 hover:border-opacity-100 dark:hover:border-opacity-100 transition"
				>Techni Schools, Sapient</a
			>
		</span>
		{#if !['/', '/about'].includes($page.url.pathname)}
			<Menu let:trigger let:Content placement="bottom-end">
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
		{/if}
	</div>
</footer>
