<script lang="ts">
	import type { PageData } from './$types';

	import { Button } from 'flowbite-svelte';
	import { Table, CreateIngredient } from '$lib/components';

	export let data: PageData;

	let isOpen = false;
</script>

{#await data}
	<p>Loading...</p>
{:then data}
	<main>
		<Table items={data.ingredientes}>
			<svelte:fragment slot="crear">
				<Button on:click={() => (isOpen = !isOpen)}>Nuevo Ingrediente</Button>
				<CreateIngredient {isOpen} />
			</svelte:fragment>
		</Table>
	</main>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
