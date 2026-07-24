export type PremiumCategory = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  badge?: string;
};

export const premiumCategories: PremiumCategory[] = [
  {
    id: 1,
    title: "Luxury Flowers",
    subtitle: "Elegant floral arrangements",
    image: "/images/premium/flowers.jpg",
    badge: "Popular",
  },
  {
    id: 2,
    title: "Premium Hampers",
    subtitle: "Curated luxury experiences",
    image: "/images/premium/hampers.jpg",
    badge: "Exclusive",
  },
  {
    id: 3,
    title: "Fine Chocolates",
    subtitle: "Rich handcrafted indulgence",
    image: "/images/premium/chocolates.jpg",
  },
  {
    id: 4,
    title: "Luxury Watches",
    subtitle: "Timeless premium gifting",
    image: "/images/premium/watches.jpg",
  },
  {
    id: 5,
    title: "Personalised Gifts",
    subtitle: "Made especially for them",
    image: "/images/premium/personalised.jpg",
    badge: "Custom",
  },
  {
    id: 6,
    title: "Corporate Gifts",
    subtitle: "Premium business impressions",
    image: "/images/premium/corporate.jpg",
  },
  {
    id: 7,
    title: "Designer Cakes",
    subtitle: "Beautifully crafted celebrations",
    image: "/images/premium/cakes.jpg",
  },
  {
    id: 8,
    title: "Luxury Fragrances",
    subtitle: "Signature scents and elegance",
    image: "/images/premium/fragrances.jpg",
  },
];
