<script lang="ts">
	import { Modal, Button, Input, Label, Select, Textarea } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';

	export let isOpen: boolean = false;
	export let productList: any[] = [];

	// Items para generar los options del select
	let movementTypes = [
		{
			name: 'Entrada',
			value: 'entrada'
		},
		{
			name: 'Salida',
			value: 'salida'
		}
	];

	let movementValue: string | undefined;
	let itemId: number | null;

	const dispatch = createEventDispatcher();
	const handleSubmit = (e: SubmitEvent) => {
		e.preventDefault();

		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);
		const data = Object.fromEntries(formData.entries());

		dispatch('submit', data);
	};
</script>

<Modal
	title="Registrar Movimiento"
	bind:open={isOpen}
	class="min-w-full"
	on:cancel={() => (isOpen = false)}
>
	<form on:submit={handleSubmit}>
		<div>
			<Label
				>Seleccionar tipo
				<Select
					class="mt-2"
					items={movementTypes}
					placeholder="Selecciona el tipo de movimiento..."
					bind:value={movementValue}
					name="movement_type"
				/>
			</Label>
		</div>

		<hr class="hr" />
		{#if movementValue}
			<div class="grid gap-4 mb-4 sm:grid-cols-2">
				<div>
					<Label
						>Producto
						<Select
							items={productList}
							bind:value={itemId}
							class="mt-2"
							placeholder="Selecciona un producto.."
							name="product_stock_id"
						/>
					</Label>
				</div>

				<div>
					<Label for="quantity" class="mb-2">Cantidad</Label>
					<Input
						type="number"
						id="quantity"
						placeholder="Cantidad de items"
						required
						name="quantity"
					/>
				</div>

				<div class="sm:col-span-1">
					<Label for="date" class="mb-2"
						>{movementValue === 'entrada' ? 'Fecha de fabricación' : 'Fecha de salida'}</Label
					>
					<input
						type="date"
						name="movement_date"
						id="date"
						class="w-full rounded-lg border-gray-300 bg-slate-50"
					/>
				</div>

				<div class="sm:col-span-2">
					<Label for="concept" class="mb-2">Concepto</Label>
					<Textarea
						id="concept"
						placeholder="Explicación del movimiento (opcional)"
						rows="4"
						name="concept"
					/>
				</div>

				<div class="flex items-end space-x-4 mt-3">
					<Button type="submit" class="w-64">Registrar</Button>
					<Button type="button" class="w-52" outline color="red" on:click={() => (isOpen = false)}
						>Cancelar</Button
					>
				</div>
			</div>
		{/if}
	</form>
</Modal>
