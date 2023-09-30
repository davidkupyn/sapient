<script lang="ts">
	import { scale, fade } from 'svelte/transition';
</script>

<main
	class="min-h-[calc(100dvh-6.5rem)] container mx-auto px-6 pt-12 sm:pt-20 space-y-12 flex items-center flex-col"
>
	<h1
		class="text-3xl font-bold font-display tracking-tighter text-center"
		in:scale={{ duration: 300, start: 0.9 }}
	>
		About Sapient
	</h1>
	<div class="max-w-prose space-y-6 text-center" in:fade={{ duration: 150 }}>
		<p>
			Embrace <span class="text-accent-focus font-semibold">Wisdom</span>, Shape Futures
		</p>
		<p>
			At Sapient, we believe in the power of wisdom to illuminate the path to a brighter future. The
			name "Sapient" derives from the Latin word "sapientia," meaning wisdom. We've woven this
			essence into every aspect of our app.
		</p>
		<p>
			Sapient is more than an educational guide;
			<span class="text-accent-focus font-semibold">
				it's your trusted companion on the journey to higher learning.
			</span> Our innovative platform combines the art of understanding your unique aspirations with
			the science of machine learning-driven insights. This harmonious blend ensures you find the perfect
			educational fit, tailored just for you.
		</p>
		<p>
			Embark on a journey of self-discovery, exploration, and boundless opportunities. Let Sapient
			be your guiding light in the pursuit of knowledge and excellence.
		</p>
		<p>
			With Sapient, the
			<span class="text-accent-focus font-semibold">future is yours to shape.</span>
		</p>
	</div>
</main>
