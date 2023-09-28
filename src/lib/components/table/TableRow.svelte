<script lang="ts">
	import { TableBodyCell, TableBodyRow } from 'flowbite-svelte';
	import type { TableItem } from '$lib/interfaces';

	import MenuIcon from './MenuIcon.svelte';

	export let item: TableItem;

	function getProperty(item: any, property: any) {
		return item[property];
	}
</script>

<TableBodyRow>
	{#each Object.keys(item) as propertyName}
		<TableBodyCell>{getProperty(item, propertyName)}</TableBodyCell>
	{/each}
	<TableBodyCell>
		<MenuIcon />
	</TableBodyCell>
</TableBodyRow>
