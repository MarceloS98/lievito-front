// import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Ingredient, Product } from '$lib/interfaces';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const res_productos = await fetch('data/productos.json');
		const res_ingredientes = await fetch('data/ingredientes.json');

		const productos: Product[] = await res_productos.json();
		const ingredientes: Ingredient[] = await res_ingredientes.json();

		return { productos, ingredientes };
	} catch (e) {
		console.log(e);
	}
};
