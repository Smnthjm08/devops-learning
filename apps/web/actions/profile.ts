"use server";

import prisma from "@workspace/db";

export async function getUserProfileByPublicKey(publicKey: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { publicKey },
      include: { socials: true },
    });
    if (!user) return null;

    return {
      id: user.id,
      name: user.name ?? "",
      username: user.username ?? "",
      bio: user.bio ?? "",
      email: user.email ?? "",
      socials: {
        github: user.socials?.github ?? "",
        twitter: user.socials?.twitter ?? "",
        discord: user.socials?.discord ?? "",
        website: user.socials?.website ?? "",
      },
    };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
}

export async function updateUserProfile(
  publicKey: string,
  data: {
    name?: string;
    username?: string;
    bio?: string;
    email?: string;
    socials?: {
      github?: string;
      twitter?: string;
      discord?: string;
      website?: string;
    };
  }
) {
  try {
    const user = await prisma.user.findUnique({ where: { publicKey } });
    if (!user) throw new Error("User not found");

    return await prisma.$transaction(async (tx) => {
      // Update User main fields
      await tx.user.update({
        where: { id: user.id },
        data: {
          name: data.name,
          username: data.username,
          bio: data.bio,
          email: data.email,
        },
      });

      // Upsert socials
      if (data.socials) {
        const existingSocials = await tx.userSocials.findUnique({ where: { userId: user.id } });
        if (existingSocials) {
          await tx.userSocials.update({
            where: { userId: user.id },
            data: data.socials,
          });
        } else {
          await tx.userSocials.create({
            data: {
              userId: user.id,
              ...data.socials,
            },
          });
        }
      }

      return true;
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
}
