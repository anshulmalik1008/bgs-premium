export type CollectionItem = {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  badge?: string;
};

export const collectionData: CollectionItem[] = [
  {
    id: 1,
    title: "Royal Rose Box",
    category: "Luxury Flowers",
    image: "/images/collections/rose-box.webp",
    description: "Premium roses arranged inside an elegant signature box.",
    badge: "Bestseller",
  },
  {
    id: 2,
    title: "Golden Celebration",
    category: "Luxury Hampers",
    image: "/images/collections/golden-hamper.webp",
    description: "An indulgent hamper crafted for unforgettable celebrations.",
    badge: "Exclusive",
  },
  {
    id: 3,
    title: "Midnight Essence",
    category: "Premium Perfumes",
    image: "/images/collections/midnight-perfume.webp",
    description: "A timeless fragrance with a bold and refined character.",
  },
  {
    id: 4,
    title: "Chocolate Symphony",
    category: "Belgian Chocolates",
    image: "/images/collections/chocolate-box.webp",
    description: "A curated assortment of rich handcrafted chocolates.",
    badge: "Popular",
  },
  {
    id: 5,
    title: "Signature Cake",
    category: "Designer Cakes",
    image: "/images/collections/signature-cake.webp",
    description: "An artistic cake designed to become the celebration centrepiece.",
  },
  {
    id: 6,
    title: "Executive Collection",
    category: "Corporate Gifts",
    image: "/images/collections/executive-gift.webp",
    description: "A refined business gift made for meaningful relationships.",
    badge: "Corporate",
  },
  {
    id: 7,
    title: "Memory Frame",
    category: "Personalised Gifts",
    image: "/images/collections/memory-frame.webp",
    description: "A personalised keepsake created for precious memories.",
  },
  {
    id: 8,
    title: "Blossom & Bliss",
    category: "Flowers & Chocolates",
    image: "/images/collections/blossom-bliss.webp",
    description: "Elegant flowers paired with luxurious chocolate delights.",
  },
  {
    id: 9,
    title: "Serene Green",
    category: "Indoor Plants",
    image: "/images/collections/serene-plant.webp",
    description: "A beautiful living gift that brings calm into every space.",
    badge: "Eco Luxury",
  },
  {
    id: 10,
    title: "Timeless Style",
    category: "Luxury Watches",
    image: "/images/collections/luxury-watch.webp",
    description: "A statement timepiece created for meaningful milestones.",
  },
  {
    id: 11,
    title: "Festive Grandeur",
    category: "Festive Gifts",
    image: "/images/collections/festive-hamper.webp",
    description: "A grand festive collection filled with premium surprises.",
    badge: "Limited",
  },
  {
    id: 12,
    title: "The Proposal Edit",
    category: "Romantic Gifts",
    image: "/images/collections/proposal-gift.webp",
    description: "A thoughtfully curated gift for life's unforgettable questions.",
  },
];
