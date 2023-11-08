<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Modal, Button, Input, Label, Textarea } from 'flowbite-svelte';
	import type { Ingredient } from '$lib/interfaces';

	const dispatch = createEventDispatcher();

	export let isOpen: boolean = false;
	export let item: Ingredient;

	const handleSubmit = (e: SubmitEvent) => {
		e.preventDefault();

		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);
		const data = Object.fromEntries(formData.entries());

		dispatch('edit', data);
	};
</script>

<Modal title="Editar ingrediente" bind:open={isOpen} class="min-w-full">
	<form on:submit={handleSubmit}>
		<div class="grid gap-4 mb-4 sm:grid-cols-2">
			<div>
				<Label for="name" class="mb-2">Nombre</Label>
				<Input
					type="text"
					id="name"
					placeholder="Nombre del insumo"
					name="name"
					required
					value={item?.name}
				/>
			</div>
			<div>
				<Label for="price" class="mb-2">Precio por kg</Label>
				<Input
					type="text"
					id="price"
					placeholder="5800"
					name="price_kg"
					required
					value={item?.price_kg}
				/>
			</div>
			<div class="sm:col-span-2">
				<Label for="description" class="mb-2">Descripción</Label>
				<Textarea
					id="description"
					placeholder="Descripción del insumo"
					rows="4"
					name="description"
					required
					value={item?.description}
				/>
			</div>

			<div class="flex items-center space-x-4 mt-3">
				<Button type="submit" class="w-64">Guardar cambios</Button>
				<Button type="button" class="w-52" outline color="red" on:click={() => (isOpen = false)}>
					Cancelar
				</Button>
			</div>
		</div>
	</form>
</Modal>
