<script lang="ts">
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Avatar,
		Dropdown,
		DropdownItem,
		DropdownHeader
	} from 'flowbite-svelte';

	export let path: string;

	// Regular expression to match paths starting with '/transacciones'
	const transaccionesRegex = /^\/transacciones(\/|$)/;
	// Check if the current path matches the pattern
	$: isTransacciones = transaccionesRegex.test(path);
</script>

<Navbar let:hidden let:toggle>
	<NavBrand href="/">
		<img src="/logo.png" class="mr-3 h-6 sm:h-9" alt="Lievito Logo" />
	</NavBrand>
	<div class="flex items-center md:order-2 hover:cursor-pointer">
		<Avatar id="avatar-menu" src="" />
		<NavHamburger on:click={toggle} class1="w-full md:flex md:w-auto md:order-1" />
	</div>
	<Dropdown placement="bottom" triggeredBy="#avatar-menu">
		<DropdownHeader>
			<span class="block text-sm">Bonnie Green</span>
			<span class="block truncate text-sm font-medium">name@flowbite.com</span>
		</DropdownHeader>
		<DropdownItem>Sign out</DropdownItem>
	</Dropdown>
	<NavUl {hidden}>
		<NavLi href="/" active={path === '/'}>Home</NavLi>
		<NavLi href="/productos" active={path === '/productos'}>Productos</NavLi>
		<NavLi href="/insumos" active={path === '/insumos'}>Insumos</NavLi>
	</NavUl>
</Navbar>
