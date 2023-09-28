<script lang="ts">
	import { Card, Button } from 'flowbite-svelte';

	export let title: string = 'Title';
	export let description: string = 'Description';
	export let path: string;
</script>

<Card class="max-w-sm">
	<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
	<p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">{description}</p>
	<Button href={path} class="w-fit">Ver</Button>
</Card>
