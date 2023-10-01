<script>
	import Button from './ui/button.svelte';
	import Kbd from './ui/kbd.svelte';
	import { Modal } from './ui/modal';
	export let open = false;
</script>

<Modal alert let:Content bind:open type="info" crossButton closeOnOutsideClick>
	<Content let:Header let:Footer class="max-w-md" let:close>
		<Header let:Title let:Description>
			<Title>Interactive Controls Guide</Title>
			<Description class="">
				<p class="mb-2">
					`` This page features interactive cards that you can navigate using various controls:
				</p>
				<ul class="list-disc list-inside pl-2">
					<li>Swipe left for 'No'</li>
					<li>Swipe right for 'Yes'</li>
					<li>
						Use arrow keys for navigation

						<Kbd class="ml-1">←</Kbd>
						<Kbd>→</Kbd>
					</li>
				</ul>
			</Description>
		</Header>
		<Footer>
			<Button melt={close} variant="accent">Understood</Button>
		</Footer>
	</Content>
</Modal>
