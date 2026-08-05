import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

function parseProductId(value: string) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

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

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { id: rawId } = await context.params;
    const id = parseProductId(rawId);

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Invalid product ID." },
        { status: 400 },
      );
    }

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product nahi mila." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      product: serializeProduct(product),
    });
  } catch (error) {
    console.error("GET /api/products/[id] failed:", error);

    return NextResponse.json(
      { success: false, message: "Product load nahi ho paaya." },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { id: rawId } = await context.params;
    const id = parseProductId(rawId);

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Invalid product ID." },
        { status: 400 },
      );
    }

    const body = (await request.json()) as {
      name?: string;
      description?: string;
      shortDesc?: string | null;
      price?: number;
      oldPrice?: number | null;
      stock?: number;
      images?: string[];
      badge?: string | null;
      occasion?: string | null;
      isFeatured?: boolean;
      isActive?: boolean;
      categoryId?: number;
    };

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...(body.name !== undefined ? { name: body.name.trim() } : {}),
        ...(body.description !== undefined
          ? { description: body.description.trim() }
          : {}),
        ...(body.shortDesc !== undefined
          ? { shortDesc: body.shortDesc?.trim() ?? null }
          : {}),
        ...(body.price !== undefined ? { price: body.price } : {}),
        ...(body.oldPrice !== undefined
          ? { oldPrice: body.oldPrice }
          : {}),
        ...(body.stock !== undefined ? { stock: body.stock } : {}),
        ...(body.images !== undefined ? { images: body.images } : {}),
        ...(body.badge !== undefined
          ? { badge: body.badge?.trim() ?? null }
          : {}),
        ...(body.occasion !== undefined
          ? { occasion: body.occasion?.trim() ?? null }
          : {}),
        ...(body.isFeatured !== undefined
          ? { isFeatured: body.isFeatured }
          : {}),
        ...(body.isActive !== undefined
          ? { isActive: body.isActive }
          : {}),
        ...(body.categoryId !== undefined
          ? { categoryId: body.categoryId }
          : {}),
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json({
      success: true,
      product: serializeProduct(product),
    });
  } catch (error) {
    console.error("PATCH /api/products/[id] failed:", error);

    return NextResponse.json(
      { success: false, message: "Product update nahi ho paaya." },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const { id: rawId } = await context.params;
    const id = parseProductId(rawId);

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Invalid product ID." },
        { status: 400 },
      );
    }

    await prisma.product.update({
      where: { id },
      data: {
        isActive: false,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Product deactivate ho gaya.",
    });
  } catch (error) {
    console.error("DELETE /api/products/[id] failed:", error);

    return NextResponse.json(
      { success: false, message: "Product delete nahi ho paaya." },
      { status: 500 },
    );
  }
}
