<script lang="ts">
	import { getContext } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import {
		Modal,
		Button,
		Input,
		Label,
		Select,
		Textarea,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		CloseButton
	} from 'flowbite-svelte';

	import type { Ingredient, Product, ProductIngredient, SelectedIngredient } from '$lib/interfaces';
	import type { Writable } from 'svelte/store';

	export let isOpen: boolean = false;
	export let product: Product;
	export let ingredients: Ingredient[] = [];
	export let selectedIngredients: SelectedIngredient[] = [];

	let ingredientQuantity = '';
	let ingredientId = '';
	let ingredientsToDelete: number[] = [];
	let ingredientsToAdd: Omit<SelectedIngredient, 'name'>[] = [];

	const dispatch = createEventDispatcher();
	const productIngredientsStore = getContext('productIngredients') as Writable<
		SelectedIngredient[] | undefined
	>;

	// Items para generar los options del select
	const selectIngredientsItems = ingredients.map((ingredient) => ({
		name: ingredient.name,
		value: ingredient.ingredient_id
	}));

	// Funciones
	const removeIngredient = (
		product_ingredient_id: number | undefined = undefined,
		ingredient_id: number
	) => {
		const index = selectedIngredients.findIndex(
			(selectedIngredient) => selectedIngredient.ingredient_id === ingredient_id
		);

		if (index !== -1) {
			if (product_ingredient_id) {
				ingredientsToDelete = [...ingredientsToDelete, product_ingredient_id];
			}

			selectedIngredients = selectedIngredients.filter(
				(selectedIngredient) => selectedIngredient.ingredient_id !== ingredient_id
			);
			ingredientsToAdd = ingredientsToAdd.filter(
				(ingredient) => ingredient.ingredient_id !== ingredient_id
			);
			$productIngredientsStore = $productIngredientsStore?.filter(
				(selectedIngredient) => selectedIngredient.ingredient_id !== ingredient_id
			);
		}
	};

	const handleAdd = () => {
		if (!ingredientId || !ingredientQuantity) {
			alert('Selecciona un ingrediente y su cantidad');
			return;
		}
		// Check if ingredient is already added
		const isAdded = selectedIngredients.find(
			(ingredient) => ingredient.ingredient_id === Number(ingredientId)
		);
		if (isAdded) {
			alert('El ingrediente ya fue añadido');
			return;
		}

		const ingredient = ingredients.find(
			(ingredient) => ingredient.ingredient_id === Number(ingredientId)
		);
		if (!ingredient) {
			alert('Ingrediente no encontrado');
			return;
		}

		selectedIngredients = [
			...selectedIngredients,
			{
				product_id: product.product_id,
				ingredient_id: ingredient?.ingredient_id,
				name: ingredient?.name,
				quantity: Number(ingredientQuantity)
			}
		];

		ingredientsToAdd = [
			...ingredientsToAdd,
			{
				product_id: product.product_id,
				ingredient_id: ingredient?.ingredient_id,
				quantity: Number(ingredientQuantity)
			}
		];

		ingredientId = '';
		ingredientQuantity = '';
	};

	const handleSubmit = (e: SubmitEvent) => {
		e.preventDefault();

		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);
		formData.append('ingredients_to_delete', JSON.stringify(ingredientsToDelete));
		formData.append('ingredients_to_add', JSON.stringify(ingredientsToAdd));
		formData.append('product_id', JSON.stringify(product.product_id));
		const data = Object.fromEntries(formData.entries());

		dispatch('edit', data);
	};
</script>

<Modal title="Editar Producto" bind:open={isOpen} class="min-w-full">
	<form on:submit={handleSubmit}>
		<div class="grid gap-4 mb-4 sm:grid-cols-2">
			<div>
				<Label for="name" class="mb-2">Nombre</Label>
				<Input
					type="text"
					id="name"
					placeholder="Nombre del producto"
					required
					name="name"
					value={product?.name}
				/>
			</div>
			<div>
				<Label for="price" class="mb-2">Precio Unitario Gs.</Label>
				<Input
					type="text"
					id="price"
					placeholder="5800"
					required
					name="price"
					value={product?.price}
				/>
			</div>
			<div class="sm:col-span-2">
				<Label for="description" class="mb-2">Descripción</Label>
				<Textarea
					id="description"
					placeholder="Descripción del producto"
					rows="4"
					required
					name="description"
					value={product?.description}
				/>
			</div>

			<div>
				<Label
					>Ingredientes
					<Select
						class="mt-2"
						items={selectIngredientsItems}
						placeholder="Selecciona un ingrediente.."
						bind:value={ingredientId}
						name="ingredient_id"
					/>
				</Label>
			</div>
			<div class="flex justify-between">
				<div>
					<Label>Cantidad Kg</Label>
					<Input
						type="text"
						id="quantity"
						placeholder="0.74"
						class="mt-2"
						bind:value={ingredientQuantity}
					/>
				</div>
				<div class="self-end">
					<Button size="md" class="py-3" type="button" on:click={() => handleAdd()}>Añadir</Button>
				</div>
			</div>
			<div class="col-span-2">
				<Table hoverable={true}>
					<TableHead
						theadClass="font-medium text-gray-900 dark:text-gray-300 bg-gray-50 dark:bg-gray-700"
					>
						<TableHeadCell padding="px-0 py-3">Ingredientes</TableHeadCell>
						<TableHeadCell padding="px-0 py-3">Cantidad (kg)</TableHeadCell>

						<TableHeadCell>
							<span class="sr-only">Delete</span>
						</TableHeadCell>
					</TableHead>
					<TableBody>
						{#each selectedIngredients as ingredient (ingredient.ingredient_id)}
							<TableBodyRow>
								<TableBodyCell tdClass="whitespace-nowrap font-medium"
									>{ingredient.name}</TableBodyCell
								>
								<TableBodyCell tdClass="whitespace-nowrap font-medium"
									>{ingredient.quantity}</TableBodyCell
								>

								<TableBodyCell
									tdClass="whitespace-nowrap font-medium text-gray-900 dark:text-white  flex"
								>
									<CloseButton
										on:click={() =>
											removeIngredient(ingredient.product_ingredient_id, ingredient.ingredient_id)}
									/>
								</TableBodyCell>
							</TableBodyRow>
						{/each}
					</TableBody>
				</Table>
			</div>
			<div class="flex items-center space-x-4 mt-3">
				<Button type="submit" class="w-64">Guardar Cambios</Button>
				<Button type="button" class="w-52" outline color="red" on:click={() => (isOpen = !isOpen)}>
					Cancelar
				</Button>
			</div>
		</div>
	</form>
</Modal>
