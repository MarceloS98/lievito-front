// import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Ingredient, Product, ProductIngredient } from '$lib/interfaces';
import { redirect } from '@sveltejs/kit';

type ProductData = {
	products: Product[];
	totalPages: number;
};

type IngredientData = {
	ingredients: Ingredient[];
	totalPages: number;
};

export const load: PageServerLoad = async ({ fetch, url }) => {
	const page = url.searchParams.get('page');

	if (!page) {
		throw redirect(302, '/productos?page=1');
	}

	try {
		const [res_productos, res_ingredientes, res_productos_ingrediente] = await Promise.all([
			fetch(`https://lievito-back-production.up.railway.app/api/v1/products?page=${page}`),
			fetch('https://lievito-back-production.up.railway.app/api/v1/ingredients?all=true'),
			fetch('https://lievito-back-production.up.railway.app/api/v1/productIngredients')
		]);

		const productData: ProductData = await res_productos.json();
		const { ingredients }: IngredientData = await res_ingredientes.json();
		const productIngredients: ProductIngredient[] = await res_productos_ingrediente.json();

		return { productData, ingredients, productIngredients };
	} catch (e) {
		console.log(e);
	}
};
