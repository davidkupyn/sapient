<script lang="ts">
	import { browser } from '$app/environment';
	import { draggable } from '@neodrag/svelte';
	import { createEventDispatcher } from 'svelte';
	import { spring } from 'svelte/motion';
	import { cardSorterAction, swipeDispatcher, undoSwipeDispatcher, type SwipeActionType } from '.';

	const dispatch = createEventDispatcher();

	export let id: number | string = 0;
	export let swiped = false;
	export let rotation = 0;
	export let isTop = false;
	export let isLastSwiped = false;

	let active = true;
	let position = spring({ x: 0, y: 0 }, { damping: 0.6, stiffness: 0.15 });
	let horizontalBound = browser ? (window.innerWidth > 768 ? 150 : 50) : 150;
	let verticalBound = browser ? (window.innerWidth > 768 ? 200 : 30) : 150;
	let className: string | undefined | null = undefined;
	let upcomingAction: SwipeActionType | undefined;
	export { className as class };

	swipeDispatcher.addListenerOnMount((type) => {
		if (!isTop) return;

		swipeAction(type);
	});

	undoSwipeDispatcher.addListenerOnMount(() => {
		if (!isLastSwiped) return;
		dispatch('undo', {
			id
		});
		resetSwipe();
	});

	function swipeAction(type: SwipeActionType) {
		dispatch('swipe', {
			type,
			id
		});
		upcomingAction = type;

		if (type === 'bottom') {
			$position = {
				x: 0,
				y: 800
			};
		} else {
			$position = {
				x: type === 'left' ? -800 : 800,
				y: $position.y
			};
		}

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
		swiped = false;
		active = true;
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
				if (data.offsetX > horizontalBound) upcomingAction = 'right';
				if (data.offsetX < -horizontalBound) upcomingAction = 'left';
				if (data.offsetY > verticalBound) upcomingAction = 'bottom';

				$position = { x: data.offsetX, y: data.offsetY };
			},
			onDragEnd: () => {
				if ($position.x > horizontalBound || $position.x < -horizontalBound) {
					swipeAction($position.x > horizontalBound ? 'right' : 'left');
				} else if (
					$position.y > verticalBound &&
					$position.x < horizontalBound &&
					$position.x > -horizontalBound
				) {
					swipeAction('bottom');
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
