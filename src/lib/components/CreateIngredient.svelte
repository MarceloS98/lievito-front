<script lang="ts">
	import { Modal, Button, Input, Label, Textarea } from 'flowbite-svelte';

	export let isOpen: boolean = false;

	const handleCreate = () => {
		alert('Ingrediente creado.');
	};
	const handleCancel = () => {
		isOpen = !isOpen;
	};
</script>

<Modal title="Nuevo Ingrediente" bind:open={isOpen} class="min-w-full">
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

			<div class="flex items-center space-x-4 mt-3">
				<Button type="submit" class="w-64" on:click={handleCreate}>Crear Ingrediente</Button>
				<Button type="submit" class="w-52" outline color="red" on:click={handleCancel}>
					Cancelar
				</Button>
			</div>
		</div>
	</form>
</Modal>
