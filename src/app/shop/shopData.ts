export type Product = {
  id: number;
  name: string;
  category: string;
  occasion: string;
  price: number;
  oldPrice?: number;
  rating: number;
  badge?: string;
  image: string;
};

export const categories = [
  "All",
  "Luxury Hampers",
  "Flowers",
  "Cakes",
  "Personalised",
  "Corporate",
  "Chocolates",
  "Plants",
];

export const occasions = [
  "All",
  "Birthday",
  "Anniversary",
  "Wedding",
  "Corporate",
  "Just Because",
  "Congratulations",
];

export const products: Product[] = [
  { id: 1, name: "Royal Celebration Hamper", category: "Luxury Hampers", occasion: "Birthday", price: 3499, oldPrice: 3999, rating: 4.9, badge: "Bestseller", image: "/images/products/royal-celebration-hamper.webp" },
  { id: 2, name: "Blush Flower Story", category: "Flowers", occasion: "Anniversary", price: 2199, rating: 4.8, badge: "Fresh Today", image: "/images/products/blush-flower-story.webp" },
  { id: 3, name: "Personalised Memory Box", category: "Personalised", occasion: "Just Because", price: 2899, oldPrice: 3299, rating: 4.9, badge: "Made For You", image: "/images/products/personalised-memory-box.webp" },
  { id: 4, name: "Golden Celebration Cake", category: "Cakes", occasion: "Birthday", price: 1899, rating: 5, badge: "Celebration", image: "/images/products/golden-celebration-cake.webp" },
  { id: 5, name: "Executive Signature Box", category: "Corporate", occasion: "Corporate", price: 4299, rating: 4.9, badge: "Executive Edit", image: "/images/products/executive-signature-box.webp" },
  { id: 6, name: "Forever Rose Keepsake", category: "Flowers", occasion: "Anniversary", price: 2499, oldPrice: 2799, rating: 4.8, image: "/images/products/forever-rose-keepsake.webp" },
  { id: 7, name: "Coffee & Comfort Edit", category: "Luxury Hampers", occasion: "Just Because", price: 2599, rating: 4.7, image: "/images/products/coffee-comfort-edit.webp" },
  { id: 8, name: "Wedding Treasure Chest", category: "Personalised", occasion: "Wedding", price: 4999, oldPrice: 5499, rating: 4.9, badge: "Wedding Edit", image: "/images/products/wedding-treasure-chest.webp" },
  { id: 9, name: "Midnight Chocolate Vault", category: "Chocolates", occasion: "Birthday", price: 3199, rating: 4.8, badge: "Limited", image: "/images/products/midnight-chocolate-vault.webp" },
  { id: 10, name: "Calm Green Plant Duo", category: "Plants", occasion: "Congratulations", price: 1499, oldPrice: 1699, rating: 4.7, badge: "New", image: "/images/products/calm-green-plant-duo.webp" },
  { id: 11, name: "Rose Gold Anniversary Cake", category: "Cakes", occasion: "Anniversary", price: 2399, rating: 4.9, image: "/images/products/rose-gold-anniversary-cake.webp" },
  { id: 12, name: "Luxury Chocolate & Rose Box", category: "Chocolates", occasion: "Anniversary", price: 2799, oldPrice: 3099, rating: 4.8, badge: "Romantic Edit", image: "/images/products/luxury-chocolate-rose-box.webp" },
];
