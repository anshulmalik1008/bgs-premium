import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const CUSTOMER_COOKIE = "bgs_session";
const AGENT_COOKIE = "bgs_agent_session";

const SESSION_AGE_SECONDS = 60 * 60 * 24 * 7;

export type SessionRole =
  | "CUSTOMER"
  | "ADMIN"
  | "AGENT";

export type SessionPayload = {
  userId: number;
  role: SessionRole;
};

function getSecret() {
  const secret = process.env.AUTH_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error(
      "AUTH_SECRET missing. Add minimum 32 characters in .env",
    );
  }

  return new TextEncoder().encode(secret);
}

export async function createSessionToken(
  payload: SessionPayload,
) {
  return new SignJWT({
    userId: payload.userId,
    role: payload.role,
  })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime(
      `${SESSION_AGE_SECONDS}s`,
    )
    .sign(getSecret());
}

export async function verifySessionToken(
  token: string,
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(
      token,
      getSecret(),
    );

    if (
      typeof payload.userId !== "number"
    ) {
      return null;
    }

    if (
      payload.role !== "CUSTOMER" &&
      payload.role !== "ADMIN" &&
      payload.role !== "AGENT"
    ) {
      return null;
    }

    return {
      userId: payload.userId,
      role: payload.role,
    };
  } catch {
    return null;
  }
}

/* ---------- Customer Session ---------- */

export async function setCustomerSession(
  token: string,
) {
  const cookieStore = await cookies();

  cookieStore.set(
    CUSTOMER_COOKIE,
    token,
    {
      httpOnly: true,
      secure:
        process.env.NODE_ENV ===
        "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_AGE_SECONDS,
    },
  );
}

export async function clearCustomerSession() {
  const cookieStore = await cookies();

  cookieStore.set(
    CUSTOMER_COOKIE,
    "",
    {
      httpOnly: true,
      secure:
        process.env.NODE_ENV ===
        "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    },
  );
}

export async function getCustomerSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();

  const token =
    cookieStore.get(CUSTOMER_COOKIE)?.value;

  if (!token) {
    return null;
  }

  const session =
    await verifySessionToken(token);

  if (!session) {
    return null;
  }

  return session.role === "CUSTOMER"
    ? session
    : null;
}

/* ---------- Agent/Admin Session ---------- */

export async function setAgentSession(
  token: string,
) {
  const cookieStore = await cookies();

  cookieStore.set(
    AGENT_COOKIE,
    token,
    {
      httpOnly: true,
      secure:
        process.env.NODE_ENV ===
        "production",
      sameSite: "lax",
      path: "/agent",
      maxAge: SESSION_AGE_SECONDS,
    },
  );
}

export async function clearAgentSession() {
  const cookieStore = await cookies();

  cookieStore.set(
    AGENT_COOKIE,
    "",
    {
      httpOnly: true,
      secure:
        process.env.NODE_ENV ===
        "production",
      sameSite: "lax",
      path: "/agent",
      maxAge: 0,
    },
  );
}

export async function getAgentSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();

  const token =
    cookieStore.get(AGENT_COOKIE)?.value;

  if (!token) {
    return null;
  }

  const session =
    await verifySessionToken(token);

  if (!session) {
    return null;
  }

  return session.role === "AGENT" ||
    session.role === "ADMIN"
    ? session
    : null;
}

/* ---------- Backward Compatibility ---------- */

export const getSession =
  getCustomerSession;

export const setSessionCookie =
  setCustomerSession;

export const clearSessionCookie =
  clearCustomerSession;