import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import {
  createSessionToken,
  setCustomerSession,
} from "@/lib/auth";

type RegisterBody = {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
};

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RegisterBody;

    const name = body.name?.trim() ?? "";
    const email = normalizeEmail(body.email ?? "");
    const phone = body.phone?.trim() || null;
    const password = body.password ?? "";

    if (name.length < 2) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid name.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      !email ||
      !email.includes("@")
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address.",
        },
        {
          status: 400,
        },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Password must be at least 8 characters long.",
        },
        {
          status: 400,
        },
      );
    }

    const existingUser =
      await prisma.user.findFirst({
        where: {
          OR: [
            {
              email,
            },

            ...(phone
              ? [
                  {
                    phone,
                  },
                ]
              : []),
          ],
        },

        select: {
          id: true,
          email: true,
          phone: true,
        },
      });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,

          message:
            existingUser.email === email
              ? "An account already exists with this email address."
              : "An account already exists with this mobile number.",
        },
        {
          status: 409,
        },
      );
    }

    // Hash the password before storing it.
    const passwordHash =
      await bcrypt.hash(
        password,
        12,
      );

    // Create a new customer account.
    const user =
      await prisma.user.create({
        data: {
          name,
          email,
          phone,
          passwordHash,
          role: "CUSTOMER",
        },

        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
          createdAt: true,
        },
      });

    // Create the customer authentication token.
    const token =
      await createSessionToken({
        userId: user.id,
        role: user.role,
      });

    // Automatically sign in the customer after registration.
    await setCustomerSession(token);

    return NextResponse.json(
      {
        success: true,
        message:
          "Account created successfully.",
        user,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(
      "POST /api/auth/register failed:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to create your account.",
      },
      {
        status: 500,
      },
    );
  }
}
