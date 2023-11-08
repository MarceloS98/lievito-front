<script lang="ts">
	import { TableBodyCell, TableBodyRow } from 'flowbite-svelte';

	export let item: any;

	const values = Object.values(item).splice(1);
</script>

<TableBodyRow>
	{#each values as value}
		<TableBodyCell>{value}</TableBodyCell>
	{/each}
	<slot name="actions" />
</TableBodyRow>
