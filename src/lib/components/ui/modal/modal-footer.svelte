<script lang="ts">
	import { cn } from '$lib/helpers';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<div class={cn('flex gap-4 w-full justify-end', className)}>
	<slot />
</div>
