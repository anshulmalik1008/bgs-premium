import crypto from "crypto";
import Razorpay from "razorpay";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getCustomerSession } from "@/lib/auth";

type VerifyPaymentBody = {
  bgsOrderId?: number;

  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
};

export async function POST(
  request: Request,
) {
  try {
    const session =
      await getCustomerSession();

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Authentication required.",
        },
        { status: 401 },
      );
    }

    const body =
      (await request.json()) as VerifyPaymentBody;

    const bgsOrderId =
      Number(body.bgsOrderId);

    const razorpayOrderId =
      body.razorpay_order_id?.trim();

    const razorpayPaymentId =
      body.razorpay_payment_id?.trim();

    const razorpaySignature =
      body.razorpay_signature?.trim();

    if (
      !Number.isInteger(bgsOrderId) ||
      !razorpayOrderId ||
      !razorpayPaymentId ||
      !razorpaySignature
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Payment verification data is incomplete.",
        },
        { status: 400 },
      );
    }

    const keyId =
      process.env.RAZORPAY_KEY_ID;

    const keySecret =
      process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Payment service is not configured.",
        },
        { status: 500 },
      );
    }

    const order =
      await prisma.order.findFirst({
        where: {
          id: bgsOrderId,
          userId: session.userId,
        },
      });

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: "Order not found.",
        },
        { status: 404 },
      );
    }

    if (order.paymentStatus === "PAID") {
      return NextResponse.json({
        success: true,
        order,
      });
    }

    // Verify the Razorpay signature.
    const expectedSignature =
      crypto
        .createHmac(
          "sha256",
          keySecret,
        )
        .update(
          `${razorpayOrderId}|${razorpayPaymentId}`,
        )
        .digest("hex");

    if (
      expectedSignature !==
      razorpaySignature
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid payment signature.",
        },
        { status: 400 },
      );
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    // Fetch the Razorpay order again on the server.
    const razorpayOrder =
      await razorpay.orders.fetch(
        razorpayOrderId,
      );

    const expectedAmount =
      Math.round(
        Number(order.total) * 100,
      );

    if (
      Number(razorpayOrder.amount) !==
      expectedAmount
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Payment amount verification failed.",
        },
        { status: 400 },
      );
    }

    const noteOrderId =
      Number(
        razorpayOrder.notes?.bgsOrderId,
      );

    if (noteOrderId !== order.id) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Payment order verification failed.",
        },
        { status: 400 },
      );
    }

    // Mark the BGS order as paid only after verification.
    const updatedOrder =
      await prisma.order.update({
        where: {
          id: order.id,
        },

        data: {
          paymentStatus: "PAID",
          paymentId:
            razorpayPaymentId,
          status: "CONFIRMED",
        },
      });

    return NextResponse.json({
      success: true,
      message:
        "Payment verified successfully.",
      order: updatedOrder,
    });
  } catch (error) {
    console.error(
      "Payment verification failed:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Payment could not be verified.",
      },
      { status: 500 },
    );
  }
}