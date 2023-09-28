import { writable } from 'svelte/store';

import type { Ingredient, Product, ProductSelect } from '$lib/interfaces';

export const items = writable<ProductSelect[]>([]);

items.set([
	{ value: 'Almidon de mandioca', name: 'Almidon de mandioca' },
	{ value: 'Harina de arroz', name: 'Harina de arroz' },
	{ value: 'Harina de maiz', name: 'Harina de maiz' }
]);

export const ingredients = writable<Ingredient[]>([]);

ingredients.set([
	{
		id: crypto.randomUUID(),
		name: 'Grasa Vegetal',
		quantity: 0.23
	},
	{
		id: crypto.randomUUID(),
		name: 'Cacao en polvo',
		quantity: 0.12
	},
	{
		id: crypto.randomUUID(),
		name: 'Goma Xántica',
		quantity: 0.68
	},
	{
		id: crypto.randomUUID(),
		name: 'Esencia de banana',
		quantity: 0.47
	}
]);

export const products = writable<Product[]>([]);
