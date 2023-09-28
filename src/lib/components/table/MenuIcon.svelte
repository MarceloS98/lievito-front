<script lang="ts">
	import { Dropdown, DropdownItem } from 'flowbite-svelte';
	import { Icon } from 'flowbite-svelte-icons';

	import EditProductModal from './EditProductModal.svelte';
	import ConfirmDeleteModal from './ConfirmDeleteModal.svelte';

	let editOpen = false;
	let deleteOpen = false;

	const handleCancel = () => {
		//
	};
	const handleDelete = () => {
		alert('Deleted');
	};
</script>

<Icon
	name="dots-horizontal-outline"
	class="dots-menu hover:cursor-pointer focus:outline-offset-4"
/>

<Dropdown triggeredBy=".dots-menu" containerClass="shadow-sm">
	<DropdownItem on:click={() => (editOpen = true)}>Editar</DropdownItem>
	<DropdownItem on:click={() => (deleteOpen = true)}>Eliminar</DropdownItem>
</Dropdown>

<EditProductModal bind:isOpen={editOpen} />
<ConfirmDeleteModal bind:isOpen={deleteOpen} />
