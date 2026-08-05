import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function serializeProduct<T extends { price: unknown; oldPrice?: unknown }>(
  product: T,
) {
  return {
    ...product,
    price: Number(product.price),
    oldPrice:
      product.oldPrice === null || product.oldPrice === undefined
        ? null
        : Number(product.oldPrice),
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search")?.trim() ?? "";
    const category = searchParams.get("category")?.trim() ?? "";
    const featured = searchParams.get("featured");

    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        ...(search
          ? {
              OR: [
                { name: { contains: search } },
                { description: { contains: search } },
                { occasion: { contains: search } },
              ],
            }
          : {}),
        ...(category
          ? {
              category: {
                slug: category,
              },
            }
          : {}),
        ...(featured === "true" ? { isFeatured: true } : {}),
      },
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      products: products.map(serializeProduct),
    });
  } catch (error) {
    console.error("GET /api/products failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Products load nahi ho paaye.",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      slug?: string;
      description?: string;
      shortDesc?: string;
      price?: number;
      oldPrice?: number | null;
      stock?: number;
      sku?: string;
      images?: string[];
      badge?: string;
      occasion?: string;
      isFeatured?: boolean;
      categoryId?: number;
    };

    if (
      !body.name ||
      !body.slug ||
      !body.description ||
      typeof body.price !== "number" ||
      !body.sku ||
      !Array.isArray(body.images) ||
      typeof body.categoryId !== "number"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Required product fields missing hain.",
        },
        { status: 400 },
      );
    }

    const product = await prisma.product.create({
      data: {
        name: body.name.trim(),
        slug: body.slug.trim(),
        description: body.description.trim(),
        shortDesc: body.shortDesc?.trim(),
        price: body.price,
        oldPrice: body.oldPrice ?? null,
        stock: body.stock ?? 0,
        sku: body.sku.trim(),
        images: body.images,
        badge: body.badge?.trim(),
        occasion: body.occasion?.trim(),
        isFeatured: body.isFeatured ?? false,
        categoryId: body.categoryId,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        product: serializeProduct(product),
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/products failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Product create nahi ho paaya.",
      },
      { status: 500 },
    );
  }
}
