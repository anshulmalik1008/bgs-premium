export type Product = {
  id: number;
  name: string;
  category: string;
  occasion: string;
  price: number;
  oldPrice?: number;
  rating: number;
  badge?: string;
  gradient: string;
};

export const products: Product[] = [
  { id: 1, name: "Royal Celebration Hamper", category: "Hampers", occasion: "Birthday", price: 3499, oldPrice: 3999, rating: 4.9, badge: "Bestseller", gradient: "linear-gradient(145deg,#fffdf7,#ead7b2,#bc8834)" },
  { id: 2, name: "Blush Flower Story", category: "Flowers", occasion: "Anniversary", price: 2199, rating: 4.8, badge: "Fresh Today", gradient: "linear-gradient(145deg,#fffaf7,#ebd0c9,#c17f6c)" },
  { id: 3, name: "Personalised Memory Box", category: "Personalised", occasion: "Just Because", price: 2899, oldPrice: 3299, rating: 4.9, badge: "Made For You", gradient: "linear-gradient(145deg,#fff9f5,#e7cec4,#b97861)" },
  { id: 4, name: "Golden Celebration Cake", category: "Cakes", occasion: "Birthday", price: 1899, rating: 5, badge: "Celebration", gradient: "linear-gradient(145deg,#fffaf2,#e8dac1,#b59058)" },
  { id: 5, name: "Executive Signature Box", category: "Corporate", occasion: "Corporate", price: 4299, rating: 4.9, badge: "Executive", gradient: "linear-gradient(145deg,#fffefa,#ded8ce,#9d8a6d)" },
  { id: 6, name: "Forever Rose Keepsake", category: "Flowers", occasion: "Anniversary", price: 2499, rating: 4.8, gradient: "linear-gradient(145deg,#fff8f7,#e9cfc9,#b77b70)" },
  { id: 7, name: "Coffee & Comfort Edit", category: "Hampers", occasion: "Just Because", price: 2599, rating: 4.7, gradient: "linear-gradient(145deg,#fffaf4,#e3d4c2,#a77855)" },
  { id: 8, name: "Wedding Treasure Chest", category: "Personalised", occasion: "Wedding", price: 4999, oldPrice: 5499, rating: 4.9, badge: "Wedding Edit", gradient: "linear-gradient(145deg,#fffdf8,#eadfc4,#c5a45f)" },
  { id: 9, name: "Midnight Chocolate Vault", category: "Hampers", occasion: "Birthday", price: 3199, rating: 4.8, badge: "Limited", gradient: "linear-gradient(145deg,#f7f2ea,#9c8264,#33261e)" },
];

export const categories = ["All", "Hampers", "Flowers", "Cakes", "Personalised", "Corporate"];
export const occasions = ["All", "Birthday", "Anniversary", "Wedding", "Corporate", "Just Because"];
