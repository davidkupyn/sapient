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
<svg
	class="absolute pointer-events-none inset-0 top-3.5 h-[400px] w-full stroke-foreground dark:stroke-muted-foreground opacity-10 [mask-image:radial-gradient(100%_100%_at_top_center,white,transparent)]"
	aria-hidden
>
	<defs>
		<pattern
			id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
			width="200"
			height="200"
			x="50%"
			y="-1"
			patternUnits="userSpaceOnUse"><path d="M100 200V.5M.5 .5H200" fill="none" /></pattern
		>
	</defs>
	<svg x="50%" y="-1" class="overflow-visible fill-foreground/20">
		<path
			d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
			stroke-width="0"
		/>
	</svg>
	<rect
		width="100%"
		height="100%"
		stroke-width="0"
		fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
	/>
</svg>
<main class="flex-grow">
	<slot />
</main>
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
