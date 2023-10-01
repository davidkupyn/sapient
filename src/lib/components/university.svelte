<script lang="ts">
	import type { University } from '$lib/types';
	import { Card } from './ui/card';

	export let data: University;
</script>

<Card>
	<h4>{data.name}</h4>
</Card>
