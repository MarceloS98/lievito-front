<script lang="ts">
	import { Button, TableBody, TableHead, TableHeadCell } from 'flowbite-svelte';
	import { Table } from '$lib/components';
	import Pagination from '$lib/components/Table/Pagination.svelte';
	import TableRow from '$lib/components/Table/TableRow.svelte';
	import type { PageServerData } from './$types';
	import IngredientStockMovementModal from '$lib/components/RegisterMovement/IngredientStockMovementModal.svelte';
	import { handleCreateIngredientStock } from '$lib/utils/createIngredientStock';

	export let data: PageServerData;

	let isNewMovementOpen = false;

	const titleKeys = {
		ingredient: 'Nombre',
		quantity_kg: 'Cantidad en kg'
	};
	const titles = Object.values(titleKeys);

	$: stock = data.ingredientStockData?.ingredientStock?.map((stock) => {
		return {
			ingredient_stock_id: stock.ingredient_stock_id,
			name: stock.ingredient.name,
			quantity_kg: stock.quantity_kg
		};
	});

	const handleSearch = (e: CustomEvent) => {
		console.log(e.detail);
	};
</script>

<main>
	<Table title="Stock de Insumos" on:search={handleSearch}>
		<svelte:fragment slot="crear">
			<Button on:click={() => (isNewMovementOpen = true)}>Registrar Movimiento</Button>
			<IngredientStockMovementModal
				bind:isOpen={isNewMovementOpen}
				items={data.ingredientStockData?.ingredientStock}
				on:create={handleCreateIngredientStock}
			/>
		</svelte:fragment>

		<TableHead slot="head">
			{#each titles as title}
				<TableHeadCell>{title}</TableHeadCell>
			{/each}
		</TableHead>

		<TableBody slot="body">
			{#if stock}
				{#each stock as item (item.ingredient_stock_id)}
					<TableRow {item} />
				{/each}
			{/if}
		</TableBody>
	</Table>
</main>

<div class="flex justify-end mt-4">
	<Pagination totalPages={data.ingredientStockData?.totalPages || 1} />
</div>
