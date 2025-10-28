"use server";

import prisma from "@workspace/db";

export async function checkUserInDatabase(publicKey: string) {
  try {
    if (!publicKey) throw new Error("Missing public key");

    let user = await prisma.user.findUnique({
      where: { publicKey },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          publicKey,
          isOnboarded: false,
        },
      });
    }

    // ✅ Return only user data — no redirects
    return {
      publicKey: user.publicKey,
      isOnboarded: user.isOnboarded,
    };
  } catch (error) {
    console.error("Error in checkUserInDatabase:", error);
    throw new Error("Failed to check user in database");
  }
}
