"use server";

import prisma from "@workspace/db";


export async function checkUserByPublicKey(publicKey: string) {
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

    return {
      publicKey: user.publicKey,
      isOnboarded: user.isOnboarded,
    };
  } catch (error: any) {
    console.error("Error in checkUserByPublicKey:", error);
    throw error;
  }
}


