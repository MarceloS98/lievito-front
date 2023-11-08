<script lang="ts">
	import { Button, TableBody, TableBodyCell, TableHead, TableHeadCell } from 'flowbite-svelte';
	import { handleCreateIngredient } from '$lib/utils/createIngredient';
	import { handleDeleteIngredient } from '$lib/utils/deleteIngredient';
	import { handleEditIngredient } from '$lib/utils/editIngredient';
	import { Table, CreateIngredientModal } from '$lib/components';
	import ConfirmDeleteModal from '$lib/components/ConfirmDeleteModal.svelte';
	import EditIngredientModal from '$lib/components/EditIngredientModal.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import TableRow from '$lib/components/TableRow.svelte';
	import type { Ingredient } from '$lib/interfaces';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	let isNewIngredientOpen = false;
	let isEditModalOpen = false;
	let isDeleteOpen = false;

	let ingredientToEdit: Ingredient;
	let ingredientToDelete: Ingredient;

	const titleKeys = {
		name: 'Nombre',
		description: 'Descripción',
		price_kg: 'Precio por Kg'
	};
	const titles = Object.values(titleKeys);

	const handleSearch = (e: CustomEvent) => {
		console.log(e.detail);
	};

	const openEditModal = (ingredient: Ingredient) => {
		isEditModalOpen = true;
		ingredientToEdit = ingredient;
	};

	const openDeleteModal = (ingredient: Ingredient) => {
		isDeleteOpen = true;
		ingredientToDelete = ingredient;
	};
</script>

<main>
	<Table title="Insumos Registrados" on:search={handleSearch}>
		<Button href="/insumos/stock" slot="stock">Ver Stock</Button>
		<svelte:fragment slot="crear">
			<Button on:click={() => (isNewIngredientOpen = !isNewIngredientOpen)}
				>Nuevo Ingrediente</Button
			>
			<CreateIngredientModal bind:isOpen={isNewIngredientOpen} on:create={handleCreateIngredient} />
		</svelte:fragment>

		<TableHead slot="head">
			{#each titles as title}
				<TableHeadCell>{title}</TableHeadCell>
			{/each}
		</TableHead>

		<TableBody slot="body">
			{#if data.ingredients}
				{#each data.ingredients as ingredient (ingredient.ingredient_id)}
					<TableRow item={ingredient}>
						<TableBodyCell
							slot="actions"
							tdClass="px-6 py-4 whitespace-nowrap font-medium flex justify-end"
						>
							<div class="flex gap-x-3">
								<Button size="xs" color="alternative" on:click={() => openEditModal(ingredient)}
									>Editar</Button
								>
								<Button size="xs" color="red" on:click={() => openDeleteModal(ingredient)}
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
	<Pagination totalPages={data.totalPages || 1} />
</div>

<!-- Modals -->
<EditIngredientModal
	bind:isOpen={isEditModalOpen}
	item={ingredientToEdit}
	on:edit={(event) => handleEditIngredient(event, ingredientToEdit)}
/>
<ConfirmDeleteModal
	bind:isOpen={isDeleteOpen}
	on:click={() => handleDeleteIngredient(ingredientToDelete.ingredient_id)}
/>
