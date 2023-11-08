export interface Ingredient {
	ingredient_id: number;
	name: string;
	description: string | null;
	price_kg: number;
}

export interface IngredientStock {
	ingredient_stock_id: number;
	ingredient: Ingredient;
	quantity_kg: number;
	expiration_date: Date | null;
}

export interface Product {
	product_id: number;
	name: string;
	description?: string | null;
	price: number;
}

export interface ProductStock {
	product_stock_id: number;
	product: Product;
	quantity: number;
	expiration_date?: Date;
}

export interface ProductSelect {
	name: string;
	value: string;
}

export interface ProductIngredient {
	product_ingredient_id: number;
	product_id: number;
	ingredient: Ingredient;
	quantity: number;
}

export interface ProductStockMovementPayload {
	movement_date: Date;
	quantity: number;
	movement_type: string;
	concept?: string;
	product_stock_id: number;
}

export interface SelectedIngredient {
	product_ingredient_id?: number;
	product_id: number;
	ingredient_id: number;
	name: string;
	quantity: number;
}

export type TableItems = Product[] | Ingredient[] | IngredientStock[] | ProductStock[];
export type TableItem = Ingredient | Product | IngredientStock | ProductStock;
