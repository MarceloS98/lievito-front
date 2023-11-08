export const handleDeleteIngredient = async (ingredientId: number) => {
	try {
		const res = await fetch(
			`https://lievito-back-production.up.railway.app/api/v1/ingredients/${ingredientId}`,
			{
				method: 'DELETE'
			}
		);

		if (!res.ok) {
			throw new Error('Failed to delete ingredient');
		}

		location.reload();
	} catch (err) {
		console.error(err);
	}

	location.reload();
};
