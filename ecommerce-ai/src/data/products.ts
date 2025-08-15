export type Product = {
	id: number;
	name: string;
	description: string;
	price: number;
	image: string;
};

export const products: Product[] = [
	{
		id: 1,
		name: "AI T-Shirt",
		description: "A stylish t-shirt for AI enthusiasts.",
		price: 25.99,
		image: "https://via.placeholder.com/200x200?text=AI+T-Shirt",
	},
	{
		id: 2,
		name: "Smart Mug",
		description: "A mug that keeps your drink at the perfect temperature.",
		price: 39.99,
		image: "https://via.placeholder.com/200x200?text=Smart+Mug",
	},
	{
		id: 3,
		name: "Robot Toy",
		description: "A fun robot toy for all ages.",
		price: 49.99,
		image: "https://via.placeholder.com/200x200?text=Robot+Toy",
	},
];
