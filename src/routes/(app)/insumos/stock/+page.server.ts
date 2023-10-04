import type { PageServerLoad } from './$types';
import type { Ingredient } from '$lib/interfaces';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const res_ingredientes = await fetch('/data/ingredientes-stock.json');

		const ingredientes: Ingredient[] = await res_ingredientes.json();

		return { ingredientes };
	} catch (e) {
		console.log(e);
	}
};
