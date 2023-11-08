export const handleCreateIngredient = async (e: CustomEvent) => {
	try {
		const { name, price, description } = e.detail;

		const body = {
			name,
			price_kg: Number(price),
			description
		};

		const res = await fetch('https://lievito-back-production.up.railway.app/api/v1/ingredients', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		});

		if (!res.ok) {
			throw new Error('Failed to create ingredient');
		}

		const ingredient = await res.json();
		const stockBody = {
			ingredient_id: ingredient.ingredient_id,
			quantity_kg: 0
		};
		const stockRes = await fetch(
			'https://lievito-back-production.up.railway.app/api/v1/ingredientsStock',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(stockBody)
			}
		);

		if (!stockRes.ok) {
			throw new Error('Failed to create ingredient stock');
		}

		location.reload();
	} catch (error) {
		console.error(error);
	}
};
