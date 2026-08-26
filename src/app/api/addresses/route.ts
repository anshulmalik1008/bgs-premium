import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

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

    const addresses = await prisma.address.findMany({
      where: {
        userId: session.userId,
      },

      orderBy: [
        {
          isDefault: "desc",
        },
        {
          createdAt: "desc",
        },
      ],
    });

    return NextResponse.json({
      success: true,
      addresses,
    });
  } catch (error) {
    console.error(
      "GET /api/addresses failed:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message: "Addresses could not be loaded.",
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(
  request: NextRequest,
) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please sign in before checkout.",
        },
        {
          status: 401,
        },
      );
    }

    const body = await request.json();

    const fullName =
      typeof body.fullName === "string"
        ? body.fullName.trim()
        : "";

    const phone =
      typeof body.phone === "string"
        ? body.phone.trim()
        : "";

    const line1 =
      typeof body.line1 === "string"
        ? body.line1.trim()
        : "";

    const line2 =
      typeof body.line2 === "string"
        ? body.line2.trim()
        : "";

    const city =
      typeof body.city === "string"
        ? body.city.trim()
        : "";

    const state =
      typeof body.state === "string"
        ? body.state.trim()
        : "";

    const postalCode =
      typeof body.postalCode === "string"
        ? body.postalCode.trim()
        : "";

    const country =
      typeof body.country === "string" &&
      body.country.trim()
        ? body.country.trim()
        : "India";

    const label =
      typeof body.label === "string" &&
      body.label.trim()
        ? body.label.trim()
        : "Delivery";

    if (
      !fullName ||
      !phone ||
      !line1 ||
      !city ||
      !state ||
      !postalCode
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please complete all required delivery details.",
        },
        {
          status: 400,
        },
      );
    }

    if (!/^[1-9][0-9]{5}$/.test(postalCode)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please enter a valid 6-digit PIN code.",
        },
        {
          status: 400,
        },
      );
    }

    const addressCount =
      await prisma.address.count({
        where: {
          userId: session.userId,
        },
      });

    const address =
      await prisma.address.create({
        data: {
          fullName,
          phone,
          line1,
          line2: line2 || null,
          city,
          state,
          postalCode,
          country,
          label,
          isDefault: addressCount === 0,
          userId: session.userId,
        },
      });

    return NextResponse.json(
      {
        success: true,
        message:
          "Delivery address saved successfully.",
        address,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(
      "POST /api/addresses failed:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Delivery address could not be saved.",
      },
      {
        status: 500,
      },
    );
  }
}