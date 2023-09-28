// export interface Product {
// 	id: number;
// 	nombre: string;
// 	cantidad_disponible: number;
// 	precio: number;
// 	fecha_vencimiento: Date;
// }

export interface Product {
	id: number;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
	rating: {
		rate: number;
		count: number;
	};
}
