export type CategoryItem = {
  id: number;
  number: string;
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  accent: string;
  background: string;
  textColor: string;
};

export const categoryData: CategoryItem[] = [
  {
    id: 1,
    number: "01",
    title: "Luxury Flowers",
    eyebrow: "Handcrafted Elegance",
    description:
      "Imported blooms and thoughtfully designed arrangements created for unforgettable moments.",
    image: "/images/categories/flowers.webp",
    accent: "#b68a4a",
    background:
      "linear-gradient(135deg, #f5efe6 0%, #eee1cf 50%, #d9c2a2 100%)",
    textColor: "#1d1812",
  },
  {
    id: 2,
    number: "02",
    title: "Designer Cakes",
    eyebrow: "Made To Celebrate",
    description:
      "Beautifully crafted cakes where elegant design meets memorable flavour.",
    image: "/images/categories/cakes.webp",
    accent: "#b87373",
    background:
      "linear-gradient(135deg, #f8eceb 0%, #ecd4d1 52%, #cfa4a0 100%)",
    textColor: "#261819",
  },
  {
    id: 3,
    number: "03",
    title: "Premium Perfumes",
    eyebrow: "Timeless Fragrances",
    description:
      "Refined scents curated for people who appreciate quiet confidence and lasting impressions.",
    image: "/images/categories/perfumes.webp",
    accent: "#d4af37",
    background:
      "linear-gradient(135deg, #050505 0%, #17130c 50%, #2c2110 100%)",
    textColor: "#ffffff",
  },
  {
    id: 4,
    number: "04",
    title: "Luxury Watches",
    eyebrow: "Designed Beyond Time",
    description:
      "Statement timepieces selected to celebrate ambition, milestones and meaningful achievements.",
    image: "/images/categories/watches.webp",
    accent: "#c89e54",
    background:
      "linear-gradient(135deg, #0f1418 0%, #17232c 50%, #30414d 100%)",
    textColor: "#ffffff",
  },
  {
    id: 5,
    number: "05",
    title: "Belgian Chocolates",
    eyebrow: "Indulgence, Curated",
    description:
      "Rich handcrafted chocolates presented with the care every celebration deserves.",
    image: "/images/categories/chocolates.webp",
    accent: "#c29465",
    background:
      "linear-gradient(135deg, #22140d 0%, #3a2115 52%, #69452e 100%)",
    textColor: "#ffffff",
  },
  {
    id: 6,
    number: "06",
    title: "Indoor Plants",
    eyebrow: "Gifts That Keep Growing",
    description:
      "Elegant greens that bring calm, character and lasting warmth into every space.",
    image: "/images/categories/plants.webp",
    accent: "#91a577",
    background:
      "linear-gradient(135deg, #e9eee2 0%, #cad5bb 52%, #9dad8c 100%)",
    textColor: "#182015",
  },
];