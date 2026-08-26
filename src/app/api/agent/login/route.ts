import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import {
  createSessionToken,
  setSessionCookie,
} from "@/lib/auth";

type LoginBody = {
  email?: string;
  password?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LoginBody;

    const email = body.email?.trim().toLowerCase();
    const password = body.password?.trim();

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email aur password required hain.",
        },
        {
          status: 400,
        },
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        passwordHash: true,
        role: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email ya password.",
        },
        {
          status: 401,
        },
      );
    }

    if (user.role !== "AGENT" && user.role !== "ADMIN") {
      return NextResponse.json(
        {
          success: false,
          message:
            "Is account ko Agent Portal access nahi hai.",
        },
        {
          status: 403,
        },
      );
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.passwordHash,
    );

    if (!passwordMatch) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email ya password.",
        },
        {
          status: 401,
        },
      );
    }

    const token = await createSessionToken({
      userId: user.id,
      role: user.role,
    });

    await setSessionCookie(token);

    return NextResponse.json({
      success: true,
      message: "Agent login successful.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(
      "POST /api/agent/login failed:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message: "Agent login nahi ho paaya.",
      },
      {
        status: 500,
      },
    );
  }
}
