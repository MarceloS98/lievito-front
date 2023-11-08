import type { PageServerLoad } from './$types';
import type { IngredientStock } from '$lib/interfaces';
import { redirect } from '@sveltejs/kit';

type IngredientStockData = {
	ingredientStock: IngredientStock[];
	totalPages: number;
};

export const load: PageServerLoad = async ({ fetch, url }) => {
	const page = url.searchParams.get('page');

	if (!page) {
		throw redirect(302, '/insumos/stock?page=1');
	}

	try {
		const res = await fetch(
			`https://lievito-back-production.up.railway.app/api/v1/ingredientsStock?page=${page}`
		);

		const ingredientStockData: IngredientStockData = await res.json();

		return { ingredientStockData };
	} catch (e) {
		console.log(e);
	}
};
