// app/(platform)/settings/actions.ts
"use server";

import prisma from "@workspace/db";

export async function getUserDetailsByPublicKey(publicKey: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { publicKey },
      include: {
        notifications: true,
      },
    });

    if (!user) {
      return { error: "User not found" };
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      notifications: user.notifications || null,
    };
  } catch (error) {
    console.error("Error fetching user:", error);
    return { error: "Internal server error" };
  }
}
