<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Table, Search } from 'flowbite-svelte';

	export let title: string = 'Titulo';
	export let searchTerm = '';

	const dispatch = createEventDispatcher();

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();

		const data = searchTerm.trim().toLowerCase();
		dispatch('search', data);
	}
</script>

<!-- Title -->
<div class="flex gap-x-7">
	<h1 class="table-title">{title}</h1>
	<slot name="stock" />
</div>
<hr class="hr" />

<!-- Search and New Ingredient -->
<div class="flex justify-between mb-4 p-4 bg-white">
	<form class="max-w-lg" on:submit={handleSubmit}>
		<Search bind:value={searchTerm} placeholder="Buscar por nombre" />
	</form>
	<slot name="crear" />
</div>

<!-- Table -->
<Table shadow={true} striped={true}>
	<slot name="head" />
	<slot name="body" />
</Table>
