<script lang="ts">
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
	import type { Ingredient } from '$lib/interfaces';

	export let isOpen: boolean = false;
	export let ingredients: Ingredient[] = [];

	let ingredientQuantity = '';
	let ingredientId = '';
	let selectedIngredients: any[] = [];

	const dispatch = createEventDispatcher();

	// Items para generar los options del select
	const items = ingredients.map((ingredient) => {
		return {
			name: ingredient.name,
			value: ingredient.ingredient_id
		};
	});
	// Funciones
	const handleDelete = (id: number) => {
		selectedIngredients = selectedIngredients.filter((ingredient) => ingredient.id !== id);
	};

	const handleAdd = () => {
		if (!ingredientId || !ingredientQuantity) {
			alert('Selecciona un ingrediente y su cantidad');
			return;
		}

		const ingredient = ingredients.find(
			(ingredient) => ingredient.ingredient_id === Number(ingredientId)
		);

		selectedIngredients = [
			...selectedIngredients,
			{
				id: ingredient?.ingredient_id,
				name: ingredient?.name,
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
		formData.append('ingredients', JSON.stringify(selectedIngredients));
		const data = Object.fromEntries(formData.entries());

		dispatch('create', data);
	};
</script>

<Modal title="Nuevo Producto" bind:open={isOpen} class="min-w-full">
	<form on:submit={handleSubmit}>
		<div class="grid gap-4 mb-4 sm:grid-cols-2">
			<div>
				<Label for="name" class="mb-2">Nombre</Label>
				<Input type="text" id="name" placeholder="Nombre del producto" required name="name" />
			</div>
			<div>
				<Label for="price" class="mb-2">Precio Unitario Gs.</Label>
				<Input type="text" id="price" placeholder="5800" required name="price" />
			</div>
			<div class="sm:col-span-2">
				<Label for="description" class="mb-2">Descripción</Label>
				<Textarea
					id="description"
					placeholder="Descripción del producto"
					rows="4"
					required
					name="description"
				/>
			</div>

			<div>
				<Label
					>Ingredientes
					<Select
						class="mt-2"
						{items}
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
						{#each selectedIngredients as ingredient (ingredient.id)}
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
									<CloseButton on:click={() => handleDelete(ingredient.id)} />
								</TableBodyCell>
							</TableBodyRow>
						{/each}
					</TableBody>
				</Table>
			</div>
			<div class="flex items-center space-x-4 mt-3">
				<Button type="submit" class="w-64">Crear Producto</Button>
				<Button type="button" class="w-52" outline color="red" on:click={() => (isOpen = !isOpen)}>
					Cancelar
				</Button>
			</div>
		</div>
	</form>
</Modal>
