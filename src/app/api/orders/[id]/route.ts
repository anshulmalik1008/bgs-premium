import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

type UpdateOrderBody = {
  status?:
    | "PENDING"
    | "CONFIRMED"
    | "PROCESSING"
    | "SHIPPED"
    | "DELIVERED"
    | "CANCELLED";

  paymentStatus?:
    | "PENDING"
    | "PAID"
    | "FAILED"
    | "REFUNDED";

  paymentId?: string;
};

export async function GET(
  request: Request,
  context: RouteContext,
) {
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

    const { id } = await context.params;

    const orderId = Number(id);

    if (!Number.isInteger(orderId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid order ID.",
        },
        {
          status: 400,
        },
      );
    }

    const order = await prisma.order.findFirst({
      where:
        session.role === "ADMIN"
          ? {
              id: orderId,
            }
          : {
              id: orderId,
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
    });

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: "Order nahi mila.",
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
    console.error("GET /api/orders/[id] failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Order load nahi ho paaya.",
      },
      {
        status: 500,
      },
    );
  }
}

export async function PATCH(
  request: Request,
  context: RouteContext,
) {
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

    if (
  session.role !== "ADMIN" &&
  session.role !== "AGENT"
) {
      return NextResponse.json(
        {
          success: false,
          message: "Admin access required.",
        },
        {
          status: 403,
        },
      );
    }

    const { id } = await context.params;

    const orderId = Number(id);

    if (!Number.isInteger(orderId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid order ID.",
        },
        {
          status: 400,
        },
      );
    }

    const body =
      (await request.json()) as UpdateOrderBody;

    const validStatuses = [
      "PENDING",
      "CONFIRMED",
      "PROCESSING",
      "SHIPPED",
      "DELIVERED",
      "CANCELLED",
    ] as const;

    const validPaymentStatuses = [
      "PENDING",
      "PAID",
      "FAILED",
      "REFUNDED",
    ] as const;

    if (
      body.status &&
      !validStatuses.includes(body.status)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid order status.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      body.paymentStatus &&
      !validPaymentStatuses.includes(
        body.paymentStatus,
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid payment status.",
        },
        {
          status: 400,
        },
      );
    }

    const existingOrder =
      await prisma.order.findUnique({
        where: {
          id: orderId,
        },
      });

    if (!existingOrder) {
      return NextResponse.json(
        {
          success: false,
          message: "Order nahi mila.",
        },
        {
          status: 404,
        },
      );
    }

    const order = await prisma.order.update({
      where: {
        id: orderId,
      },

      data: {
        ...(body.status && {
          status: body.status,
        }),

        ...(body.paymentStatus && {
          paymentStatus: body.paymentStatus,
        }),

        ...(body.paymentId !== undefined && {
          paymentId:
            body.paymentId.trim() || null,
        }),
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
            product: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Order successfully update ho gaya.",
      order,
    });
  } catch (error) {
    console.error(
      "PATCH /api/orders/[id] failed:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message: "Order update nahi ho paaya.",
      },
      {
        status: 500,
      },
    );
  }
}
