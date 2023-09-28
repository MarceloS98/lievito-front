<script lang="ts">
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

	// import { items, ingredients } from '../../stores/stores';
	import type { Ingredient } from '$lib/interfaces';

	export let isOpen: boolean = false;
	export let ingredientes: Ingredient[] = [];

	// Items para generar los options del select
	let items = ingredientes.map((ingrediente) => {
		return {
			name: ingrediente.nombre,
			value: ingrediente.id
		};
	});

	let cantidadIngrediente = '';
	let ingredienteId = '';
	let selectedIngredients: any[] = [];

	// Funciones
	const handleCreate = () => {
		alert('Producto Creado.');
	};
	const handleCancel = () => {
		isOpen = !isOpen;
	};
	const handleDelete = (id: number) => {
		ingredientes = ingredientes.filter((ingrediente) => ingrediente.id !== id);
	};
	const handleAdd = () => {
		if (!ingredienteId || !cantidadIngrediente) {
			alert('Selecciona un ingrediente y su cantidad');
			return;
		}

		const ingrediente = ingredientes.find(
			(ingrediente) => ingrediente.id === Number(ingredienteId)
		);

		selectedIngredients = [
			...selectedIngredients,
			{
				id: ingrediente?.id,
				nombre: ingrediente?.nombre,
				cantidadDisponibleKg: Number(cantidadIngrediente)
			}
		];

		ingredienteId = '';
		cantidadIngrediente = '';
	};
</script>

<Modal title="Nuevo Producto" bind:open={isOpen} class="min-w-full">
	<form>
		<div class="grid gap-4 mb-4 sm:grid-cols-2">
			<div>
				<Label for="name" class="mb-2">Nombre</Label>
				<Input type="text" id="name" placeholder="Nombre del producto" required />
			</div>
			<div>
				<Label for="price" class="mb-2">Precio Unitario Gs.</Label>
				<Input type="text" id="price" placeholder="5800" required />
			</div>
			<div class="sm:col-span-2">
				<Label for="description" class="mb-2">Descripción</Label>
				<Textarea
					id="description"
					placeholder="Descripción del producto"
					rows="4"
					name="description"
					required
				/>
			</div>

			<div>
				<Label
					>Ingredientes
					<Select
						class="mt-2"
						{items}
						placeholder="Selecciona un ingrediente.."
						bind:value={ingredienteId}
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
						bind:value={cantidadIngrediente}
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
						<TableHeadCell padding="px-0 py-3">Cantidad Kg</TableHeadCell>

						<TableHeadCell>
							<span class="sr-only">Delete</span>
						</TableHeadCell>
					</TableHead>
					<TableBody>
						{#each selectedIngredients as ingrediente (ingrediente.id)}
							<TableBodyRow>
								<TableBodyCell tdClass="whitespace-nowrap font-medium"
									>{ingrediente.nombre}</TableBodyCell
								>
								<TableBodyCell tdClass="whitespace-nowrap font-medium"
									>{ingrediente.cantidadDisponibleKg}</TableBodyCell
								>

								<TableBodyCell
									tdClass="whitespace-nowrap font-medium text-gray-900 dark:text-white  flex"
								>
									<CloseButton on:click={() => handleDelete(ingrediente.id)} />
								</TableBodyCell>
							</TableBodyRow>
						{/each}
					</TableBody>
				</Table>
			</div>
			<div class="flex items-center space-x-4 mt-3">
				<Button type="submit" class="w-64" on:click={handleCreate}>Crear Producto</Button>
				<Button type="submit" class="w-52" outline color="red" on:click={handleCancel}>
					Cancelar
				</Button>
			</div>
		</div>
	</form>
</Modal>
