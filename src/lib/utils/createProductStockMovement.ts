import type { ProductStockMovementPayload } from '$lib/interfaces';

export const createProductStockMovement = async (e: CustomEvent) => {
	const payload = {
		product_stock_id: Number(e.detail.product_stock_id),
		quantity: Number(e.detail.quantity),
		movement_date: new Date(e.detail.movement_date).toISOString(),
		movement_type: e.detail.movement_type,
		...(e.detail.concept.trim() && { concept: e.detail.concept })
	} as ProductStockMovementPayload;

	try {
		const res = await fetch(
			'https://lievito-back-production.up.railway.app/api/v1/productStockMovements',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(payload)
			}
		);

		if (!res.ok) {
			throw new Error('Failed to create product stock movement');
		}

		location.reload();
	} catch (error) {
		console.log(error);
	}
};
