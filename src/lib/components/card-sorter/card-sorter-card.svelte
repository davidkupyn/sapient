<script lang="ts">
	import { browser } from '$app/environment';
	import { draggable } from '@neodrag/svelte';
	import { createEventDispatcher } from 'svelte';
	import { spring } from 'svelte/motion';
	import { swipeDispatcher, cardSorterAction } from '.';

	const dispatch = createEventDispatcher();

	export let id: number | string = 0;
	export let swiped = false;
	export let rotation = 0;
	export let isTop = false;

	let active = true;
	let position = spring({ x: 0, y: 0 }, { damping: 0.6, stiffness: 0.15 });
	let bound = browser ? (window.innerWidth > 768 ? 150 : 50) : 150;
	let className: string | undefined | null = undefined;
	let upcomingAction: 'left' | 'right' | undefined;
	export { className as class };

	swipeDispatcher.addListenerOnMount((type) => {
		if (!isTop) return;
		swipeAction(type);
	});

	function swipeAction(type: 'left' | 'right') {
		dispatch('swipe', {
			type,
			id
		});
		upcomingAction = type;
		$position = {
			x: type === 'left' ? -800 : 800,
			y: $position.y
		};
		if (browser && upcomingAction) position.stiffness = window.innerWidth > 768 ? 0.2 : 0.04;
		swiped = true;

		setTimeout(() => {
			upcomingAction = undefined;
		}, 150);
		setTimeout(() => {
			active = false;
		}, 75);
	}

	function resetSwipe() {
		$position = { x: 0, y: 0 };
		position.stiffness = 0.15;
		upcomingAction = undefined;
	}

	$: cardSorterAction.set(upcomingAction);
</script>

{#if active}
	<div
		class={className}
		use:draggable={{
			position: $position,
			bounds: { top: 80, bottom: 80, left: -1200, right: -1200 },

			onDrag: (data) => {
				upcomingAction =
					data.offsetX > bound ? 'right' : data.offsetX < -bound ? 'left' : undefined;
				$position = { x: data.offsetX, y: data.offsetY };
			},
			onDragEnd: () => {
				if ($position.x > bound || $position.x < -bound) {
					swipeAction($position.x > bound ? 'right' : 'left');
				} else {
					resetSwipe();
				}
			}
		}}
	>
		<div
			style="transform: rotate({$position.x * 0.02 + rotation}deg)"
			class="cursor-grab active:cursor-grabbing"
		>
			<slot {upcomingAction} />
		</div>
	</div>
{/if}
