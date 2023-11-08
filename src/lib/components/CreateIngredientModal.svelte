<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Modal, Button, Input, Label, Textarea } from 'flowbite-svelte';

	const dispatch = createEventDispatcher();

	export let isOpen: boolean = false;

	const handleSubmit = (e: SubmitEvent) => {
		e.preventDefault();

		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);
		const data = Object.fromEntries(formData.entries());

		dispatch('create', data);
	};
</script>

<Modal title="Nuevo Ingrediente" bind:open={isOpen} class="min-w-full">
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
					autocomplete="off"
				/>
			</div>
			<div>
				<Label for="price" class="mb-2">Precio por kg</Label>
				<Input type="text" id="price" placeholder="5800" name="price" required autocomplete="off" />
			</div>
			<div class="sm:col-span-2">
				<Label for="description" class="mb-2">Descripción</Label>
				<Textarea
					id="description"
					placeholder="Descripción del insumo"
					rows="4"
					name="description"
				/>
			</div>

			<div class="flex items-center space-x-4 mt-3">
				<Button type="submit" class="w-64">Crear Ingrediente</Button>
				<Button type="button" class="w-52" outline color="red" on:click={() => (isOpen = false)}>
					Cancelar
				</Button>
			</div>
		</div>
	</form>
</Modal>
