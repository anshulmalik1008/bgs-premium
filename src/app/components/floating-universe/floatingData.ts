export type FloatingCardItem = {
  id: number;
  title: string;
  category: string;
  image: string;
  badge?: string;

  desktop: {
    left: string;
    top: string;
    width: number;
    height: number;
    rotateX: number;
    rotateY: number;
    rotateZ: number;
    depth: number;
    scale: number;
  };
};

export const floatingCards: FloatingCardItem[] = [
  {
    id: 1,
    title: "Royal Roses",
    category: "Luxury Flowers",
    image: "/images/floating/flowers.webp",
    badge: "Signature",
    desktop: {
      left: "3%",
      top: "9%",
      width: 170,
      height: 210,
      rotateX: 4,
      rotateY: 12,
      rotateZ: -4,
      depth: 90,
      scale: 0.92,
    },
  },
  {
    id: 2,
    title: "Golden Cake",
    category: "Designer Cakes",
    image: "/images/floating/cake.webp",
    badge: "Exclusive",
    desktop: {
      left: "20%",
      top: "4%",
      width: 185,
      height: 230,
      rotateX: -5,
      rotateY: -8,
      rotateZ: 3,
      depth: 140,
      scale: 1,
    },
  },
  {
    id: 3,
    title: "Midnight",
    category: "Premium Perfume",
    image: "/images/floating/perfume.webp",
    desktop: {
      left: "39%",
      top: "8%",
      width: 165,
      height: 205,
      rotateX: 5,
      rotateY: 10,
      rotateZ: -2,
      depth: 60,
      scale: 0.9,
    },
  },
  {
    id: 4,
    title: "Celebration Edit",
    category: "Luxury Hampers",
    image: "/images/floating/hamper.webp",
    badge: "Bestseller",
    desktop: {
      left: "57%",
      top: "3%",
      width: 195,
      height: 238,
      rotateX: -4,
      rotateY: -12,
      rotateZ: 3,
      depth: 155,
      scale: 1.02,
    },
  },
  {
    id: 5,
    title: "Belgian Bliss",
    category: "Luxury Chocolates",
    image: "/images/floating/chocolate.webp",
    desktop: {
      left: "78%",
      top: "10%",
      width: 170,
      height: 215,
      rotateX: 3,
      rotateY: 9,
      rotateZ: -3,
      depth: 80,
      scale: 0.93,
    },
  },
  {
    id: 6,
    title: "Executive",
    category: "Corporate Gifts",
    image: "/images/floating/corporate.webp",
    badge: "Business",
    desktop: {
      left: "7%",
      top: "49%",
      width: 180,
      height: 220,
      rotateX: -5,
      rotateY: 11,
      rotateZ: 4,
      depth: 130,
      scale: 0.96,
    },
  },
  {
    id: 7,
    title: "Made For You",
    category: "Personalised",
    image: "/images/floating/personalised.webp",
    desktop: {
      left: "25%",
      top: "43%",
      width: 165,
      height: 205,
      rotateX: 5,
      rotateY: -9,
      rotateZ: -2,
      depth: 55,
      scale: 0.9,
    },
  },
  {
    id: 8,
    title: "Serene Green",
    category: "Living Gifts",
    image: "/images/floating/plant.webp",
    badge: "Eco Luxury",
    desktop: {
      left: "43%",
      top: "47%",
      width: 190,
      height: 230,
      rotateX: -4,
      rotateY: 10,
      rotateZ: 2,
      depth: 150,
      scale: 1,
    },
  },
  {
    id: 9,
    title: "Timeless",
    category: "Luxury Watches",
    image: "/images/floating/watch.webp",
    desktop: {
      left: "63%",
      top: "42%",
      width: 168,
      height: 208,
      rotateX: 4,
      rotateY: -10,
      rotateZ: -3,
      depth: 70,
      scale: 0.92,
    },
  },
  {
    id: 10,
    title: "Festive Grandeur",
    category: "Festive Gifts",
    image: "/images/floating/festive.webp",
    badge: "Limited",
    desktop: {
      left: "81%",
      top: "49%",
      width: 180,
      height: 220,
      rotateX: -5,
      rotateY: 8,
      rotateZ: 3,
      depth: 125,
      scale: 0.96,
    },
  },
  {
    id: 11,
    title: "The Proposal",
    category: "Romantic Gifts",
    image: "/images/floating/romantic.webp",
    desktop: {
      left: "29%",
      top: "73%",
      width: 165,
      height: 198,
      rotateX: 4,
      rotateY: 12,
      rotateZ: -3,
      depth: 45,
      scale: 0.88,
    },
  },
  {
    id: 12,
    title: "Signature Box",
    category: "Luxury Collection",
    image: "/images/floating/luxury-box.webp",
    badge: "Premium",
    desktop: {
      left: "58%",
      top: "72%",
      width: 185,
      height: 215,
      rotateX: -4,
      rotateY: -11,
      rotateZ: 3,
      depth: 135,
      scale: 0.98,
    },
  },
];
