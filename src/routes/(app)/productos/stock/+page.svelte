<script lang="ts">
	import { Button, TableBody, TableHead, TableHeadCell } from 'flowbite-svelte';
	import { Table } from '$lib/components';
	import Pagination from '$lib/components/Table/Pagination.svelte';
	import TableRow from '$lib/components/Table/TableRow.svelte';
	import type { PageServerData } from './$types';
	import ProductStockMovementModal from '$lib/components/RegisterMovement/ProductStockMovementModal.svelte';
	import type { ProductStock } from '$lib/interfaces';
	import { createProductStockMovement } from '$lib/utils/createProductStockMovement';

	export let data: PageServerData;

	let isNewMovementOpen = false;

	$: stock = data.productStockData.productStock.map((stock: ProductStock) => {
		return {
			product_id: stock.product.product_id,
			name: stock.product.name,
			quantity_kg: stock.quantity
		};
	});

	$: stockList = data.completeProductStockData.productStock.map((stock: ProductStock) => {
		return {
			name: stock.product.name,
			value: stock.product_stock_id
		};
	});

	const titleKeys = {
		product: 'Nombre',
		quantity: 'Cantidad en unidades'
	};
	const titles = Object.values(titleKeys);

	const handleSearch = (e: CustomEvent) => {
		console.log(e.detail);
	};
</script>

<main>
	<Table title="Stock de Productos" on:search={handleSearch}>
		<svelte:fragment slot="crear">
			<Button on:click={() => (isNewMovementOpen = true)}>Registrar Movimiento</Button>
			<ProductStockMovementModal
				productList={stockList}
				bind:isOpen={isNewMovementOpen}
				on:submit={createProductStockMovement}
			/>
		</svelte:fragment>

		<TableHead slot="head">
			{#each titles as title}
				<TableHeadCell>{title}</TableHeadCell>
			{/each}
		</TableHead>

		<TableBody slot="body">
			{#if stock}
				{#each stock as item (item.product_id)}
					<TableRow {item} />
				{/each}
			{/if}
		</TableBody>
	</Table>
</main>

<div class="flex justify-end mt-4">
	<Pagination totalPages={data.productStockData.totalPages || 1} />
</div>
