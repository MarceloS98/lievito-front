<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import { Modal, Button, Input, Label, Select, Textarea } from 'flowbite-svelte';

	import type { IngredientStock } from '$lib/interfaces';

	export let isOpen: boolean = false;
	export let items: IngredientStock[] = [];

	let itemsForSelect = items.map((item) => {
		return {
			name: item.ingredient.name,
			value: item.ingredient_stock_id
		};
	});

	let movementTypes = [
		{
			name: 'Entrada',
			value: 'entry'
		},
		{
			name: 'Salida',
			value: 'outgoing'
		}
	];

	let movementValue: string | undefined;
	let itemId: number | null;

	const dispatch = createEventDispatcher();

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();

		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);
		const data = Object.fromEntries(formData.entries());

		dispatch('create', data);
	}
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

		{#if movementValue === 'entry'}
			<div class="grid gap-4 mb-4 sm:grid-cols-2">
				<div>
					<Label
						>Insumo
						<Select
							items={itemsForSelect}
							bind:value={itemId}
							class="mt-2"
							placeholder="Selecciona un insumo"
							name="ingredient_stock_id"
						/>
					</Label>
				</div>

				<div>
					<Label for="quantity" class="mb-2">Cantidad</Label>
					<Input
						type="number"
						id="quantity"
						placeholder="Cantidad en kg"
						name="quantity"
						required
					/>
				</div>

				<div class="sm:col-span-1">
					<Label for="date" class="mb-2">Fecha de ingreso</Label>
					<input
						required
						type="date"
						name="movement_date"
						id="entry-date"
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
		{:else if movementValue === 'outgoing'}
			<div class="grid gap-4 mb-4 sm:grid-cols-2">
				<div>
					<Label
						>Insumo
						<Select
							items={itemsForSelect}
							bind:value={itemId}
							class="mt-2"
							placeholder="Selecciona un insumo"
							name="ingredient_stock_id"
						/>
					</Label>
				</div>

				<div>
					<Label for="quantity" class="mb-2">Cantidad</Label>
					<Input
						type="number"
						id="quantity"
						name="quantity"
						placeholder="Cantidad en kg"
						required
					/>
				</div>

				<div class="sm:col-span-1">
					<Label for="movement-date" class="mb-2">Fecha de salida</Label>
					<input
						type="date"
						name="movement_date"
						id="movement-date"
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
					<Button type="submit" class="w-52" outline color="red">Cancelar</Button>
				</div>
			</div>
		{/if}
	</form>
</Modal>
