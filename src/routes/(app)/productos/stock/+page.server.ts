// import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch, url }) => {
	const page = url.searchParams.get('page');

	if (!page) {
		throw redirect(302, '/productos/stock?page=1');
	}

	try {
		const [res_paginated, res_complete] = await Promise.all([
			fetch(`https://lievito-back-production.up.railway.app/api/v1/productsStock?page=${page}`),
			fetch(`https://lievito-back-production.up.railway.app/api/v1/productsStock?all=true`)
		]);
		const [productStockData, completeProductStockData] = await Promise.all([
			res_paginated.json(),
			res_complete.json()
		]);
		return { productStockData, completeProductStockData };
	} catch (e) {
		console.log(e);
	}
};
