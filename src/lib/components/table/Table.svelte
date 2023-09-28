<script lang="ts">
	import type { TableItems } from '$lib/interfaces';

	import { Table, TableBody, TableHead, TableHeadCell, Search } from 'flowbite-svelte';
	import Pagination from './Pagination.svelte';
	import TableRow from './TableRow.svelte';

	export let items: TableItems = [];

	let searchTerm = '';

	$: itemKeys = Object.keys(items[0]);
</script>

<div class="flex justify-between mb-4 p-4 bg-white">
	<div class="max-w-lg">
		<!-- TODO: Form and query then submit  -->
		<Search bind:value={searchTerm} placeholder="Buscar por nombre" />
	</div>
	<slot name="crear" />
</div>

<Table shadow={true} striped={true}>
	<TableHead>
		{#each itemKeys as key}
			<TableHeadCell>{key}</TableHeadCell>
		{/each}
	</TableHead>
	<TableBody>
		{#each items as item}
			<TableRow {item} />
		{/each}
	</TableBody>
</Table>
<div class="flex justify-end mt-4">
	<Pagination />
</div>
