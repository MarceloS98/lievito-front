export const getProductIngredients = async (product_id: number) => {
	try {
		const res = await fetch(
			`https://lievito-back-production.up.railway.app/api/v1/productIngredients/${product_id}`
		);
		const data = await res.json();
		return data;
	} catch (error) {
		console.error(error);
	}
};
