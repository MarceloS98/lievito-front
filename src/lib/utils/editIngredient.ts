import type { Ingredient } from '$lib/interfaces';

export const handleEditIngredient = async (e: CustomEvent, ingredient: Ingredient) => {
	const payload = {
		name: e.detail.name,
		price_kg: Number(e.detail.price_kg),
		description: e.detail.description
	};

	const res = await fetch(
		`https://lievito-back-production.up.railway.app/api/v1/ingredients/${ingredient.ingredient_id}`,
		{
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		}
	);

	if (!res.ok) {
		throw new Error('Failed to edit ingredient');
	}

	location.reload();
};
