export const handleDeleteProduct = async (productId: number) => {
	try {
		const res = await fetch(
			`https://lievito-back-production.up.railway.app/api/v1/products/${productId}`,
			{
				method: 'DELETE'
			}
		);

		if (!res.ok) {
			throw new Error('Failed to delete product');
		}

		location.reload();
	} catch (err) {
		console.error(err);
	}
};
