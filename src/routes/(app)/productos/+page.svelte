<script lang="ts">
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { Button, TableBody, TableBodyCell, TableHead, TableHeadCell } from 'flowbite-svelte';
	import { Table } from '$lib/components';
	import ConfirmDeleteModal from '$lib/components/Table/ConfirmDeleteModal.svelte';
	import Pagination from '$lib/components/Table/Pagination.svelte';
	import TableRow from '$lib/components/Table/TableRow.svelte';
	import type { Product, ProductIngredient, SelectedIngredient } from '$lib/interfaces';
	import type { PageServerData } from './$types';
	import CreateProductModal from '$lib/components/CreateProductModal.svelte';
	import { handleCreateProduct } from '$lib/utils/createProduct';
	import { handleDeleteProduct } from '$lib/utils/deleteProduct';
	import EditProductModal from '$lib/components/Table/EditProductModal.svelte';
	import { handleEditProduct } from '$lib/utils/editProduct';

	export let data: PageServerData;

	let isNewProductOpen = false;
	let isEditModalOpen = false;
	let isDeleteOpen = false;

	let productToEdit: Product;
	let productToDelete: Product;
	let selectedProductIngredients: SelectedIngredient[] | undefined = [];

	const productIngredients = writable<SelectedIngredient[] | undefined>([]);
	setContext('productIngredients', productIngredients);
	$: $productIngredients = data.productIngredients?.map((pi) => {
		return {
			product_ingredient_id: pi.product_ingredient_id,
			product_id: pi.product_id,
			ingredient_id: pi.ingredient.ingredient_id,
			name: pi.ingredient.name,
			quantity: pi.quantity
		};
	});

	const titleKeys = {
		name: 'Nombre',
		description: 'Descripción',
		price: 'Precio unitario'
	};

	const titles = Object.values(titleKeys);

	const handleSearch = (e: CustomEvent) => {
		console.log(e.detail);
	};

	const getSelectedProductIngredients = (product: Product) => {
		const selectedIngredients = $productIngredients?.filter(
			(pi) => pi.product_id === product.product_id
		);
		selectedProductIngredients = selectedIngredients;
	};

	const openEditModal = (product: Product) => {
		isEditModalOpen = true;
		productToEdit = product;
	};

	const openDeleteModal = (product: Product) => {
		isDeleteOpen = true;
		productToDelete = product;
	};
</script>

<main>
	<Table title="Productos Registrados" on:search={handleSearch}>
		<Button href="/productos/stock" slot="stock">Ver Stock</Button>
		<svelte:fragment slot="crear">
			<Button on:click={() => (isNewProductOpen = true)}>Nuevo Producto</Button>
			<CreateProductModal
				bind:isOpen={isNewProductOpen}
				ingredients={data.ingredients}
				on:create={handleCreateProduct}
			/>
		</svelte:fragment>

		<TableHead slot="head">
			{#each titles as title}
				<TableHeadCell>{title}</TableHeadCell>
			{/each}
		</TableHead>

		<TableBody slot="body">
			{#if data.productData?.products}
				{#each data.productData?.products as product (product.product_id)}
					<TableRow item={product}>
						<TableBodyCell
							slot="actions"
							tdClass="px-6 py-4 whitespace-nowrap font-medium flex justify-end"
						>
							<div class="flex gap-x-3">
								<Button
									size="xs"
									color="alternative"
									on:click={() => {
										openEditModal(product);
										getSelectedProductIngredients(product);
									}}>Editar</Button
								>
								<Button size="xs" color="red" on:click={() => openDeleteModal(product)}
									>Eliminar</Button
								>
							</div>
						</TableBodyCell>
					</TableRow>
				{/each}
			{/if}
		</TableBody>
	</Table>
</main>

<div class="flex justify-end mt-4">
	<Pagination totalPages={data.productData?.totalPages || 1} />
</div>

<!-- Modals -->
<EditProductModal
	bind:isOpen={isEditModalOpen}
	product={productToEdit}
	ingredients={data.ingredients}
	selectedIngredients={selectedProductIngredients}
	on:edit={(e) => handleEditProduct(e)}
/>
<!-- on:edit={(event) => handleEditProduct(event, productToEdit)} -->
<ConfirmDeleteModal
	bind:isOpen={isDeleteOpen}
	on:click={() => handleDeleteProduct(productToDelete.product_id)}
/>
