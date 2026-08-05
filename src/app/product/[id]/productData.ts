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
    gallery: [
      "/images/premium/hampers.jpg",
      "/images/products/royal-celebration-hamper.webp",
      "/images/products/coffee-comfort-edit.webp",
      "/images/products/wedding-treasure-chest.webp",
    ],
  },
  {
    id: 2,
    name: "Luxury Flowers",
    category: "Flowers",
    price: 2199,
    oldPrice: 2499,
    rating: 4.8,
    reviews: 196,
    badge: "Fresh Today",
    description:
      "Elegant fresh flowers arranged with refined wrapping for meaningful celebrations.",
    story:
      "This floral edit is created for graceful gifting, combining premium blooms, elegant tones and a presentation designed to feel timeless.",
    gradient:
      "linear-gradient(145deg,#fffaf7 0%,#ead0c9 48%,#c17f6c 100%)",
    accent: "#a65d50",
    features: [
      "Fresh premium flowers",
      "Luxury wrapping",
      "Personal note card",
      "Carefully hand arranged",
    ],
    includes: [
      "Seasonal premium blooms",
      "Decorative foliage",
      "Signature wrapping",
      "Message card",
    ],
    gallery: [
      "/images/premium/flowers.jpg",
      "/images/products/blush-flower-story.webp",
      "/images/products/forever-rose-keepsake.webp",
      "/images/hero-phone/luxury-flowers.webp",
    ],
  },
  {
    id: 3,
    name: "Personalised Gifts",
    category: "Personalised",
    price: 2899,
    oldPrice: 3299,
    rating: 4.9,
    reviews: 171,
    badge: "Made For You",
    description:
      "A meaningful personalised gifting experience created with names, memories and thoughtful details.",
    story:
      "Made to feel truly personal, this collection turns special memories into a polished keepsake that can be treasured long after the celebration.",
    gradient:
      "linear-gradient(145deg,#fff9f5 0%,#e7cec4 48%,#b97861 100%)",
    accent: "#9d5f49",
    features: [
      "Custom name or message",
      "Premium keepsake finish",
      "Gift-ready presentation",
      "Personal approval before production",
    ],
    includes: [
      "Personalised keepsake",
      "Printed memory card",
      "Luxury gift box",
      "Premium ribbon",
    ],
    gallery: [
      "/images/premium/personalised.jpg",
      "/images/products/personalised-memory-box.webp",
      "/images/products/wedding-treasure-chest.webp",
      "/images/hero-phone/executive-gift.webp",
    ],
  },
  {
    id: 4,
    name: "Designer Cakes",
    category: "Cakes",
    price: 1899,
    rating: 4.9,
    reviews: 221,
    badge: "Celebration",
    description:
      "A premium designer cake crafted for birthdays, anniversaries and elegant celebrations.",
    story:
      "Created to become the centrepiece of a celebration, this cake pairs refined flavours with an elegant luxury finish.",
    gradient:
      "linear-gradient(145deg,#fffaf2 0%,#e8dac1 48%,#b59058 100%)",
    accent: "#9d7737",
    features: [
      "Premium ingredients",
      "Designer finish",
      "Celebration message",
      "Freshly prepared",
    ],
    includes: [
      "Designer cake",
      "Cake topper",
      "Greeting card",
      "Luxury packaging",
    ],
    gallery: [
      "/images/premium/cakes.jpg",
      "/images/products/golden-celebration-cake.webp",
      "/images/products/rose-gold-anniversary-cake.webp",
      "/images/hero-phone/luxury-hamper.webp",
    ],
  },
  {
    id: 5,
    name: "Corporate Gifts",
    category: "Corporate",
    price: 4299,
    rating: 4.9,
    reviews: 137,
    badge: "Executive Edit",
    description:
      "A sophisticated corporate gifting box designed to create a refined business impression.",
    story:
      "Built for premium business gifting, this executive edit combines polished presentation, useful keepsakes and carefully selected gourmet items.",
    gradient:
      "linear-gradient(145deg,#fffefa 0%,#ded8ce 48%,#9d8a6d 100%)",
    accent: "#76664e",
    features: [
      "Corporate branding option",
      "Bulk order support",
      "Premium executive box",
      "Pan-India delivery",
    ],
    includes: [
      "Executive notebook",
      "Premium pen",
      "Gourmet selection",
      "Corporate message card",
    ],
    gallery: [
      "/images/premium/corporate.jpg",
      "/images/products/executive-signature-box.webp",
      "/images/hero-phone/executive-gift.webp",
      "/images/products/coffee-comfort-edit.webp",
    ],
  },
  {
    id: 9,
    name: "Fine Chocolates",
    category: "Chocolates",
    price: 2799,
    oldPrice: 3099,
    rating: 4.8,
    reviews: 189,
    badge: "Limited",
    description:
      "A refined collection of handcrafted chocolates created for premium gifting.",
    story:
      "This chocolate collection brings together rich flavours, polished presentation and indulgent details for an elevated gifting moment.",
    gradient:
      "linear-gradient(145deg,#fffaf4 0%,#e3d4c2 48%,#8d5e3d 100%)",
    accent: "#744729",
    features: [
      "Handcrafted chocolates",
      "Premium cocoa",
      "Luxury presentation box",
      "Gift message included",
    ],
    includes: [
      "Dark chocolate selection",
      "Milk chocolate pralines",
      "Chocolate truffles",
      "Premium gift box",
    ],
    gallery: [
      "/images/premium/chocolates.jpg",
      "/images/products/midnight-chocolate-vault.webp",
      "/images/products/luxury-chocolate-rose-box.webp",
      "/images/hero-phone/fine-chocolates.webp",
    ],
  },
  {
    id: 13,
    name: "Luxury Watches",
    category: "Luxury Watches",
    price: 6999,
    oldPrice: 7999,
    rating: 4.8,
    reviews: 112,
    badge: "Timeless",
    description:
      "A polished premium watch presented as a timeless gifting statement.",
    story:
      "Designed for those who appreciate refined detail, this watch combines clean styling, premium presentation and everyday elegance.",
    gradient:
      "linear-gradient(145deg,#f9f9f7 0%,#d8d5cf 48%,#77746e 100%)",
    accent: "#5f5c56",
    features: [
      "Premium watch finish",
      "Elegant presentation case",
      "Adjustable strap",
      "Gift-ready packaging",
    ],
    includes: [
      "Luxury watch",
      "Presentation case",
      "Care cloth",
      "Warranty card",
    ],
    gallery: [
      "/images/premium/watches.jpg",
      "/images/premium/watches.jpg",
      "/images/premium/watches.jpg",
      "/images/premium/watches.jpg",
    ],
  },
  {
    id: 14,
    name: "Luxury Fragrances",
    category: "Fragrances",
    price: 3999,
    oldPrice: 4499,
    rating: 4.8,
    reviews: 146,
    badge: "Signature Scent",
    description:
      "A refined premium fragrance created for elegant and memorable gifting.",
    story:
      "This fragrance edit is built around a sophisticated signature scent and a presentation that feels polished from the first impression.",
    gradient:
      "linear-gradient(145deg,#fffdf8 0%,#e6d8c8 48%,#9f8062 100%)",
    accent: "#806143",
    features: [
      "Premium fragrance blend",
      "Elegant glass bottle",
      "Luxury outer box",
      "Gift-ready presentation",
    ],
    includes: [
      "Signature fragrance",
      "Premium bottle",
      "Luxury presentation box",
      "Message card",
    ],
    gallery: [
      "/images/premium/fragrances.jpg",
      "/images/premium/fragrances.jpg",
      "/images/premium/fragrances.jpg",
      "/images/premium/fragrances.jpg",
    ],
  },
];

export function getProduct(id: number) {
  return products.find((product) => product.id === id);
}
