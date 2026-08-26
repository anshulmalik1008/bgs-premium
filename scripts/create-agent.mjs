import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const name =
    process.env.AGENT_NAME || "BGS Agent";

  const email =
    process.env.AGENT_EMAIL?.trim().toLowerCase();

  const password =
    process.env.AGENT_PASSWORD;

  if (!email) {
    throw new Error(
      "AGENT_EMAIL is missing in .env",
    );
  }

  if (!password || password.length < 8) {
    throw new Error(
      "AGENT_PASSWORD must be at least 8 characters long",
    );
  }

  // Hash the password before saving it to the database.
  const passwordHash = await bcrypt.hash(
    password,
    12,
  );

  // Create the agent or update the existing account.
  const agent = await prisma.user.upsert({
    where: {
      email,
    },

    update: {
      name,
      passwordHash,
      role: "AGENT",
    },

    create: {
      name,
      email,
      passwordHash,
      role: "AGENT",
    },

    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  console.log("");
  console.log("Agent account ready:");
  console.log(agent);
  console.log("");
}

main()
  .catch((error) => {
    console.error(
      "Failed to create agent:",
      error,
    );

    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
  