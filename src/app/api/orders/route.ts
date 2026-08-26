import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

type CreateOrderBody = {
  addressId?: number;

  items?: Array<{
    productId: number;
    quantity: number;
  }>;

  giftMessage?: string;

  shipping?: number;
  discount?: number;

  paymentType?: "ONLINE" | "COD";
};

export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Login required.",
        },
        {
          status: 401,
        },
      );
    }

    const orders = await prisma.order.findMany({
      where:
        session.role === "ADMIN" ||
        session.role === "AGENT"
          ? undefined
          : {
              userId: session.userId,
            },

      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },

        address: true,

        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                slug: true,
                images: true,
                price: true,
              },
            },
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(
      "GET /api/orders failed:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Orders could not be loaded.",
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(
  request: Request,
) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please sign in before placing an order.",
        },
        {
          status: 401,
        },
      );
    }

    if (session.role !== "CUSTOMER") {
      return NextResponse.json(
        {
          success: false,
          message:
            "Only customer accounts can place orders.",
        },
        {
          status: 403,
        },
      );
    }

    const body =
      (await request.json()) as CreateOrderBody;

    if (
      !body.addressId ||
      !Number.isInteger(body.addressId)
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "A valid delivery address is required.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      !Array.isArray(body.items) ||
      body.items.length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Your cart is empty.",
        },
        {
          status: 400,
        },
      );
    }

    const address =
      await prisma.address.findFirst({
        where: {
          id: body.addressId,
          userId: session.userId,
        },
      });

    if (!address) {
      return NextResponse.json(
        {
          success: false,
          message:
            "A valid delivery address could not be found.",
        },
        {
          status: 400,
        },
      );
    }

    const normalizedItems =
      body.items.map((item) => ({
        productId: Number(
          item.productId,
        ),

        quantity: Math.max(
          1,
          Math.min(
            Number(item.quantity) || 1,
            10,
          ),
        ),
      }));

    if (
      normalizedItems.some(
        (item) =>
          !Number.isInteger(
            item.productId,
          ) ||
          item.productId <= 0,
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "One or more cart items are invalid.",
        },
        {
          status: 400,
        },
      );
    }

    const productIds = [
      ...new Set(
        normalizedItems.map(
          (item) => item.productId,
        ),
      ),
    ];

    const products =
      await prisma.product.findMany({
        where: {
          id: {
            in: productIds,
          },

          isActive: true,
        },
      });

    if (
      products.length !==
      productIds.length
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "One or more products are unavailable.",
        },
        {
          status: 400,
        },
      );
    }

    let subtotal = 0;

    const orderItems =
      normalizedItems.map((item) => {
        const product =
          products.find(
            (product) =>
              product.id ===
              item.productId,
          );

        if (!product) {
          throw new Error(
            "Product not found.",
          );
        }

        if (
          product.stock <
          item.quantity
        ) {
          throw new Error(
            `${product.name} does not have enough stock.`,
          );
        }

        const price =
          Number(product.price);

        subtotal +=
          price * item.quantity;

        return {
          productId: product.id,
          quantity: item.quantity,
          price: product.price,
        };
      });

    const shipping = Math.max(
      0,
      Number(body.shipping ?? 0),
    );

    const requestedDiscount = Math.max(
      0,
      Number(body.discount ?? 0),
    );

    // Discounts should eventually be calculated
    // using a server-side coupon system.
    const discount = Math.min(
      requestedDiscount,
      subtotal,
    );

    const total = Math.max(
      0,
      subtotal +
        shipping -
        discount,
    );

    const paymentType =
      body.paymentType === "COD"
        ? "COD"
        : "ONLINE";

    const orderNumber = `BGS-${Date.now()
      .toString()
      .slice(-8)}-${Math.floor(
      Math.random() * 90 + 10,
    )}`;

    const order =
      await prisma.$transaction(
        async (tx) => {
          const createdOrder =
            await tx.order.create({
              data: {
                orderNumber,

                userId:
                  session.userId,

                addressId:
                  address.id,

                subtotal,

                shipping,

                discount,

                total,

                giftMessage:
                  body.giftMessage
                    ?.trim() ||
                  null,

                status: "PENDING",

                paymentStatus:
                  "PENDING",

                items: {
                  create:
                    orderItems,
                },
              },

              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                  },
                },

                address: true,

                items: {
                  include: {
                    product: {
                      select: {
                        id: true,
                        name: true,
                        slug: true,
                        images: true,
                        price: true,
                      },
                    },
                  },
                },
              },
            });

          // Reserve stock when the order is created.
          for (const item of orderItems) {
            await tx.product.update({
              where: {
                id: item.productId,
              },

              data: {
                stock: {
                  decrement:
                    item.quantity,
                },
              },
            });
          }

          return createdOrder;
        },
      );

    return NextResponse.json(
      {
        success: true,

        message:
          paymentType === "COD"
            ? "Order created successfully."
            : "Order created. Continue to payment.",

        paymentType,

        requiresPayment:
          paymentType === "ONLINE",

        order,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(
      "POST /api/orders failed:",
      error,
    );

    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Order could not be created.",
      },
      {
        status: 500,
      },
    );
  }
}
