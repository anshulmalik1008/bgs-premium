import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { createSessionToken, setSessionCookie } from "@/lib/auth";

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
        { success: false, message: "Valid name enter karo." },
        { status: 400 },
      );
    }

    if (!email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "Valid email enter karo." },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message: "Password minimum 8 characters ka hona chahiye.",
        },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          ...(phone ? [{ phone }] : []),
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
              ? "Is email se account already bana hua hai."
              : "Is mobile number se account already bana hua hai.",
        },
        { status: 409 },
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        passwordHash,
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

    const token = await createSessionToken({
      userId: user.id,
      role: user.role,
    });

    await setSessionCookie(token);

    return NextResponse.json(
      {
        success: true,
        message: "Account successfully create ho gaya.",
        user,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/auth/register failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Account create nahi ho paaya.",
      },
      { status: 500 },
    );
  }
}
