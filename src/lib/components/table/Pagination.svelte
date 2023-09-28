<script lang="ts">
	import { page } from '$app/stores';
	import { Pagination } from 'flowbite-svelte';
	import type { LinkType } from 'flowbite-svelte/dist/types';
	import { Icon } from 'flowbite-svelte-icons';

	$: activeUrl = $page.url.searchParams.get('page');

	export let pages: LinkType[] = [
		{ name: '1', href: '/productos/?page=6' },
		{ name: '2', href: '/?page=7' },
		{ name: '3', href: '/?page=8' },
		{ name: '4', href: '/?page=9' },
		{ name: '5', href: '/?page=10' }
	];

	export let previous = () => {
		alert('Make a call to your server to fetch data.');
	};
	export let next = () => {
		alert('Make a call to your server to fetch data.');
	};
</script>

<Pagination {pages} large on:previous={previous} on:next={next} icon>
	<svelte:fragment slot="prev">
		<span class="sr-only">Anterior</span>
		<Icon name="chevron-left-outline" class="w-3 h-3" />
	</svelte:fragment>
	<svelte:fragment slot="next">
		<span class="sr-only">Siguiente</span>
		<Icon name="chevron-right-outline" class="w-3 h-3" />
	</svelte:fragment>
</Pagination>
