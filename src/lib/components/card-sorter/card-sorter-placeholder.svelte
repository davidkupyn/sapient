<script lang="ts">
	import { cn } from '$lib/helpers';
	import type { HTMLAttributes } from 'svelte/elements';

	type $$Props = HTMLAttributes<HTMLDivElement>;
	let className: $$Props['class'] = undefined;

	export { className as class };
</script>

<div class={cn('col-start-1 row-start-1', className)} {...$$restProps}>
	<slot />
</div>
