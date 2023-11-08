export const handleCreateIngredientStock = async (e: CustomEvent) => {
	const movement = {
		ingredient_stock_id: Number(e.detail.ingredient_stock_id),
		quantity: Number(e.detail.quantity),
		movement_date: new Date(e.detail.movement_date).toISOString(),
		movement_type: e.detail.movement_type,
		concept: e.detail.concept || 'No concept'
	};

	try {
		const res = await fetch(
			'https://lievito-back-production.up.railway.app/api/v1/ingredientsStockMovements',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(movement)
			}
		);

		if (!res.ok) {
			throw new Error('Failed to create ingredient stock movement');
		}

		location.reload();
	} catch (error) {
		console.log(error);
	}
};
