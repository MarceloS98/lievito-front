import { writable } from 'svelte/store';

// Create a writable store for ingredients
export const ingredientsStore = writable([]);

// Create a writable store for products
export const productsStore = writable([]);
