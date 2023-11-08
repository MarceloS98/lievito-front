export const handleEditProduct = async (e: CustomEvent) => {
	try {
		const { product_id, ingredients_to_delete, ingredients_to_add } = e.detail;
		// Edit product
		const productBody = {
			name: e.detail.name,
			price: Number(e.detail.price),
			description: e.detail.description
		};
		console.log(productBody);
		console.log(ingredients_to_add);
		console.log(ingredients_to_delete);

		const res = await fetch(
			`https://lievito-back-production.up.railway.app/api/v1/products/${product_id}`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(productBody)
			}
		);
		if (!res.ok) {
			throw new Error('Failed to create product');
		}
		// DELETE or ADD product ingredients
		if (JSON.parse(ingredients_to_delete).length > 0) {
			const productIngredientsRes = await fetch(
				'https://lievito-back-production.up.railway.app/api/v1/productIngredients',
				{
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ data: JSON.parse(ingredients_to_delete) })
				}
			);
			if (!productIngredientsRes.ok) {
				throw new Error('Failed to delete ingredients');
			}
		}
		// Add new ingredients if needed
		if (JSON.parse(ingredients_to_add).length > 0) {
			console.log(JSON.parse(ingredients_to_add));
			const productIngredientsRes = await fetch(
				'https://lievito-back-production.up.railway.app/api/v1/productIngredients',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ data: JSON.parse(ingredients_to_add) })
				}
			);
			if (!productIngredientsRes.ok) {
				throw new Error('Failed to create product ingredients');
			}
		}

		location.reload();
	} catch (error) {
		console.error(error);
	}
};
