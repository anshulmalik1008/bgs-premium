// components/categories-story/categoryData.ts

export type CategoryItem = {
  id: number;
  number: string;
  eyebrow: string;
  title: string;
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
    eyebrow: "Luxury Collection",
    title: "Luxury Flowers",
    description:
      "Imported roses, lilies and orchids handcrafted into elegant floral arrangements that transform every celebration into a timeless memory.",
    image: "/images/categories/flowers.webp",
    accent: "#D4AF37",
    background:
      "linear-gradient(135deg,#F7F2EA 0%,#EADDC8 45%,#D6BE97 100%)",
    textColor: "#1E1A16",
  },

  {
    id: 2,
    number: "02",
    eyebrow: "Celebrate Beautifully",
    title: "Designer Cakes",
    description:
      "Premium handcrafted cakes designed with artistic detail and unforgettable flavours for every special occasion.",
    image: "/images/categories/cakes.webp",
    accent: "#D98A8A",
    background:
      "linear-gradient(135deg,#FFF3F1 0%,#F3D9D6 55%,#D8AAA6 100%)",
    textColor: "#2A1B1B",
  },

  {
    id: 3,
    number: "03",
    eyebrow: "Luxury Fragrance",
    title: "Premium Perfumes",
    description:
      "Exclusive international fragrances curated for people who appreciate timeless elegance and refined luxury.",
    image: "/images/categories/perfumes.webp",
    accent: "#D4AF37",
    background:
      "linear-gradient(135deg,#050505 0%,#18130A 55%,#2A1F10 100%)",
    textColor: "#FFFFFF",
  },

  {
    id: 4,
    number: "04",
    eyebrow: "Signature Collection",
    title: "Luxury Hampers",
    description:
      "Beautifully curated premium hampers filled with gourmet delights, imported chocolates and elegant keepsakes.",
    image: "/images/categories/hampers.webp",
    accent: "#C89E54",
    background:
      "linear-gradient(135deg,#15110A 0%,#2B2217 55%,#5A4428 100%)",
    textColor: "#FFFFFF",
  },

  {
    id: 5,
    number: "05",
    eyebrow: "Business Excellence",
    title: "Corporate Gifts",
    description:
      "Premium gifting experiences crafted to strengthen relationships and leave lasting impressions with clients and teams.",
    image: "/images/categories/corporate.webp",
    accent: "#7EA4D6",
    background:
      "linear-gradient(135deg,#0B1320 0%,#17283D 55%,#28486B 100%)",
    textColor: "#FFFFFF",
  },

  {
    id: 6,
    number: "06",
    eyebrow: "Made For You",
    title: "Personalised Gifts",
    description:
      "Unique personalised gifts crafted with names, photos and thoughtful details to create unforgettable memories.",
    image: "/images/categories/personalised.webp",
    accent: "#D78AB5",
    background:
      "linear-gradient(135deg,#FFF6FB 0%,#F4D8E8 55%,#E2B4CF 100%)",
    textColor: "#24161F",
  },
];
