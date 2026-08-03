
export type ProductDetail = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  badge: string;
  description: string;
  story: string;
  gradient: string;
  accent: string;
  features: string[];
  includes: string[];
  gallery: string[];
};

export const products: ProductDetail[] = [
  {
    id: 1,
    name: "Royal Celebration Hamper",
    category: "Luxury Hampers",
    price: 3499,
    oldPrice: 3999,
    rating: 4.9,
    reviews: 248,
    badge: "Bestseller",
    description:
      "A premium assortment of gourmet treats, elegant keepsakes and signature presentation.",
    story:
      "Designed for meaningful celebrations, this signature hamper brings together refined flavours, beautiful objects and personalised details in one unforgettable gifting experience.",
    gradient:
      "linear-gradient(145deg,#fffdf7 0%,#ead7b2 46%,#bc8834 100%)",
    accent: "#9d7028",
    features: [
      "Luxury presentation box",
      "Personal message card",
      "Premium ribbon finish",
      "Pan-India delivery",
    ],
    includes: [
      "Gourmet chocolates",
      "Signature candle",
      "Keepsake box",
      "Personal note card",
    ],
    gallery: ["01", "02", "03", "04"],
  },
];

export function getProduct(id: number) {
  return products.find((product) => product.id === id) ?? products[0];
}
