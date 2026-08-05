import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const hampers = await prisma.category.upsert({
    where: { slug: "luxury-hampers" },
    update: {},
    create: {
      name: "Luxury Hampers",
      slug: "luxury-hampers",
      description: "Premium curated gift hampers.",
    },
  });

  const flowers = await prisma.category.upsert({
    where: { slug: "flowers" },
    update: {},
    create: {
      name: "Flowers",
      slug: "flowers",
      description: "Premium floral arrangements.",
    },
  });

  await prisma.product.upsert({
    where: { slug: "royal-celebration-hamper" },
    update: {},
    create: {
      name: "Royal Celebration Hamper",
      slug: "royal-celebration-hamper",
      description:
        "A premium assortment of gourmet treats and elegant keepsakes.",
      shortDesc: "A luxury hamper for unforgettable celebrations.",
      price: 3499,
      oldPrice: 3999,
      stock: 25,
      sku: "BGS-HAMPER-001",
      images: [
        "/images/products/royal-hamper-1.webp",
        "/images/products/royal-hamper-2.webp",
      ],
      badge: "Bestseller",
      occasion: "Birthday",
      isFeatured: true,
      categoryId: hampers.id,
    },
  });

  await prisma.product.upsert({
    where: { slug: "blush-flower-story" },
    update: {},
    create: {
      name: "Blush Flower Story",
      slug: "blush-flower-story",
      description:
        "Soft blooms arranged with signature wrapping and graceful details.",
      shortDesc: "A refined floral story for meaningful moments.",
      price: 2199,
      stock: 15,
      sku: "BGS-FLOWER-001",
      images: [
        "/images/products/blush-flower-1.webp",
        "/images/products/blush-flower-2.webp",
      ],
      badge: "Fresh Today",
      occasion: "Anniversary",
      isFeatured: true,
      categoryId: flowers.id,
    },
  });

  console.log("BGS seed completed.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
