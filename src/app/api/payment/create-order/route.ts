import { NextResponse } from "next/server";
import Razorpay from "razorpay";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

type CreatePaymentBody = {
  orderId?: number;
};

export async function POST(request: Request) {
  try {
    // Verify the authenticated customer.
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

    if (session.role !== "CUSTOMER") {
      return NextResponse.json(
        {
          success: false,
          message:
            "Only customers can initiate payments.",
        },
        {
          status: 403,
        },
      );
    }

    const body =
      (await request.json()) as CreatePaymentBody;

    const orderId = Number(body.orderId);

    if (
      !Number.isInteger(orderId) ||
      orderId <= 0
    ) {
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

    // Load the BGS order directly from the database.
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        userId: session.userId,
      },

      select: {
        id: true,
        orderNumber: true,
        total: true,
        paymentStatus: true,
        paymentId: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: "Order not found.",
        },
        {
          status: 404,
        },
      );
    }

    if (order.paymentStatus === "PAID") {
      return NextResponse.json(
        {
          success: false,
          message: "This order is already paid.",
        },
        {
          status: 400,
        },
      );
    }

    if (Number(order.total) <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid order amount.",
        },
        {
          status: 400,
        },
      );
    }

    const keyId =
      process.env.RAZORPAY_KEY_ID;

    const keySecret =
      process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      console.error(
        "Razorpay environment variables are missing.",
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Payment service is not configured.",
        },
        {
          status: 500,
        },
      );
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    // Razorpay expects the amount in paise.
    const amountInPaise = Math.round(
      Number(order.total) * 100,
    );

    const razorpayOrder =
      await razorpay.orders.create({
        amount: amountInPaise,
        currency: "INR",

        receipt: order.orderNumber.slice(
          0,
          40,
        ),

        notes: {
          bgsOrderId: String(order.id),
          bgsOrderNumber:
            order.orderNumber,
          userId: String(
            session.userId,
          ),
        },
      });

    return NextResponse.json({
      success: true,

      payment: {
        keyId,

        razorpayOrderId:
          razorpayOrder.id,

        amount:
          razorpayOrder.amount,

        currency:
          razorpayOrder.currency,

        bgsOrderId: order.id,

        bgsOrderNumber:
          order.orderNumber,
      },
    });
  } catch (error) {
    console.error(
      "POST /api/payment/create-order failed:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Payment could not be initiated.",
      },
      {
        status: 500,
      },
    );
  }
}
