<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { Table, CreateProduct } from '$lib/components';
	import type { PageData } from './$types';

	export let data: PageData;
	let isOpen = false;
</script>

{#await data}
	<p>Loading...</p>
{:then data}
	<main>
		<Table items={data.productos}>
			<svelte:fragment slot="crear">
				<Button on:click={() => (isOpen = !isOpen)}>Nuevo Producto</Button>
				<CreateProduct bind:isOpen ingredientes={data.ingredientes} />
			</svelte:fragment>
		</Table>
	</main>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
