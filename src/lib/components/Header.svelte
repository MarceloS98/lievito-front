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
	import { checkRoute } from '$lib/utils/checkRoute';

	export let path: string;
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
			<span class="block text-sm">Admin</span>
			<span class="block truncate text-sm font-medium">admin@lievito.com</span>
		</DropdownHeader>
		<DropdownItem>Cerrar Sesión</DropdownItem>
	</Dropdown>
	<NavUl {hidden}>
		<NavLi href="/" active={path === '/'}>Home</NavLi>
		<NavLi href="/productos" active={checkRoute({ path, pattern: 'productos' })}>Productos</NavLi>
		<NavLi href="/insumos" active={checkRoute({ path, pattern: 'insumos' })}>Insumos</NavLi>
	</NavUl>
</Navbar>
