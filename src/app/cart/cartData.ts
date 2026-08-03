export type CartItem = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  quantity: number;
  gradient: string;
  message?: string;
};

export const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: "Royal Celebration Hamper",
    category: "Luxury Hampers",
    price: 3499,
    oldPrice: 3999,
    quantity: 1,
    gradient: "linear-gradient(145deg,#fffdf7,#ead7b2,#bc8834)",
    message: "Wishing you a beautiful celebration.",
  },
  {
    id: 2,
    name: "Blush Flower Story",
    category: "Premium Flowers",
    price: 2199,
    quantity: 1,
    gradient: "linear-gradient(145deg,#fffaf7,#ebd0c9,#c17f6c)",
  },
];
