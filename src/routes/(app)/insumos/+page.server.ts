import type { Ingredient } from '$lib/interfaces';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

type IngredientData = {
	ingredients: Ingredient[];
	totalPages: number;
};

export const load: PageServerLoad = async ({ fetch, url }) => {
	const page = url.searchParams.get('page');

	if (!page) {
		throw redirect(302, '/insumos?page=1');
	}

	try {
		const res = await fetch(
			`https://lievito-back-production.up.railway.app/api/v1/ingredients?page=${page}`
		);
		const ingredientData: IngredientData = await res.json();
		return ingredientData;
	} catch (error) {
		console.log(error);
	}
};
