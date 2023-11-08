<script lang="ts">
	import { Pagination } from 'flowbite-svelte';
	import type { LinkType } from 'flowbite-svelte/dist/types';
	import { Icon } from 'flowbite-svelte-icons';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	$: currentPage = $page.url.searchParams.get('page') || 1;

	export let totalPages: number;

	let pages: LinkType[] = [];

	for (let i = 1; i <= totalPages; i++) {
		pages.push({
			name: `${i}`,
			href: `?page=${i}`,
			active: i === 1
		});
	}

	$: {
		pages = pages.map((page) => {
			if (page.name === currentPage) {
				return { ...page, active: true };
			} else {
				return { ...page, active: false };
			}
		});
	}

	export let previous = () => {
		if (currentPage === '1') return;

		goto(`?page=${Number(currentPage) - 1}`);
	};

	export let next = () => {
		if (Number(currentPage) >= pages.length) return;

		goto(`?page=${Number(currentPage) + 1}`);
	};
</script>

<Pagination {pages} large on:previous={previous} on:next={next}>
	<svelte:fragment slot="prev">
		<span class="sr-only">Anterior</span>
		<Icon name="chevron-left-outline" class="w-3 h-3" />
	</svelte:fragment>
	<svelte:fragment slot="next">
		<span class="sr-only">Siguiente</span>
		<Icon name="chevron-right-outline" class="w-3 h-3" />
	</svelte:fragment>
</Pagination>
