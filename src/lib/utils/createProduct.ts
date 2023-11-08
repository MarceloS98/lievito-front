import type { Product } from '$lib/interfaces';

type SelectedIngredient = {
	id: number;
	name: string;
	quantity: number;
};

export const handleCreateProduct = async (e: CustomEvent) => {
	try {
		const { name, price, description, ingredients } = e.detail;

		// Create product
		const productBody = {
			name,
			price: Number(price),
			description
		};

		const res = await fetch('https://lievito-back-production.up.railway.app/api/v1/products', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(productBody)
		});

		if (!res.ok) {
			throw new Error('Failed to create product');
		}

		const product: Product = await res.json();

		// Create product ingredients
		const productIngredientsBody = JSON.parse(ingredients).map(
			(ingredient: SelectedIngredient) => ({
				product_id: product.product_id,
				ingredient_id: ingredient.id,
				quantity: Number(ingredient.quantity)
			})
		);

		const productIngredientsRes = await fetch(
			'https://lievito-back-production.up.railway.app/api/v1/productIngredients',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ data: productIngredientsBody })
			}
		);

		if (!productIngredientsRes.ok) {
			throw new Error('Failed to create product ingredients');
		}

		// Create stock for the product
		const stockBody = {
			product_id: product.product_id,
			presentation_id: 1,
			quantity: 0
		};

		const stockRes = await fetch(
			'https://lievito-back-production.up.railway.app/api/v1/productsStock',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(stockBody)
			}
		);

		if (!stockRes.ok) {
			throw new Error('Failed to create product stock');
		}

		location.reload();
	} catch (error) {
		console.error(error);
	}
};
