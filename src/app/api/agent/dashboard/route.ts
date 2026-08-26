import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    // Verify the current authenticated session.
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Authentication required.",
        },
        {
          status: 401,
        },
      );
    }

    // Only agents and administrators can access this endpoint.
    if (
      session.role !== "AGENT" &&
      session.role !== "ADMIN"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Agent access required.",
        },
        {
          status: 403,
        },
      );
    }

    // Fetch dashboard statistics in parallel.
    const [
      totalOrders,
      pendingOrders,
      processingOrders,
      deliveredOrders,
      customers,
      salesResult,
      recentOrders,
    ] = await Promise.all([
      prisma.order.count(),

      prisma.order.count({
        where: {
          status: "PENDING",
        },
      }),

      prisma.order.count({
        where: {
          status: "PROCESSING",
        },
      }),

      prisma.order.count({
        where: {
          status: "DELIVERED",
        },
      }),

      prisma.user.count({
        where: {
          role: "CUSTOMER",
        },
      }),

      prisma.order.aggregate({
        where: {
          status: {
            not: "CANCELLED",
          },
        },

        _sum: {
          total: true,
        },
      }),

      prisma.order.findMany({
        take: 5,

        orderBy: {
          createdAt: "desc",
        },

        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },

          items: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      }),
    ]);

    const totalSales = Number(
      salesResult._sum.total ?? 0,
    );

    return NextResponse.json({
      success: true,

      stats: {
        totalOrders,
        totalSales,
        customers,
        pendingOrders,
        processingOrders,
        deliveredOrders,
      },

      recentOrders,
    });
  } catch (error) {
    console.error(
      "GET /api/agent/dashboard failed:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Dashboard data could not be loaded.",
      },
      {
        status: 500,
      },
    );
  }
}
