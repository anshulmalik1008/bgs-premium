import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const orderNumber =
      searchParams.get("orderNumber")?.trim();

    const email =
      searchParams
        .get("email")
        ?.trim()
        .toLowerCase();

    if (!orderNumber || !email) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Order number and email are required.",
        },
        {
          status: 400,
        },
      );
    }

    // Find the order only when both the order number
    // and customer email match.
    const order = await prisma.order.findFirst({
      where: {
        orderNumber,

        user: {
          email,
        },
      },

      select: {
        id: true,
        orderNumber: true,
        status: true,
        paymentStatus: true,

        subtotal: true,
        shipping: true,
        discount: true,
        total: true,

        giftMessage: true,

        createdAt: true,
        updatedAt: true,

        user: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },

        address: {
          select: {
            fullName: true,
            phone: true,
            line1: true,
            line2: true,
            city: true,
            state: true,
            postalCode: true,
            country: true,
          },
        },

        items: {
          select: {
            id: true,
            quantity: true,
            price: true,

            product: {
              select: {
                id: true,
                name: true,
                slug: true,
                images: true,
              },
            },
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message:
            "No order was found with these details.",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error(
      "GET /api/orders/track failed:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Order tracking information could not be loaded.",
      },
      {
        status: 500,
      },
    );
  }
}
