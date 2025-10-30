"use server";

import prisma from "@workspace/db";

// Enhanced: fetch user details including email and discord
export async function getUserDetailsByPublicKey(publicKey: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { publicKey },
      include: { notifications: true, socials: true }, // include socials for discord
    });

    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      discord: user.socials?.discord ?? "",
      notifications: user.notifications,
    };
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

// Enhanced: also support updating discord info
export async function updateNotificationPreferences(
  publicKey: string,
  preferences: {
    emailNotifications: boolean;
    discordNotifications: boolean;
    email?: string;
    discord?: string;
  },
) {
  try {
    const user = await prisma.user.findUnique({ where: { publicKey } });
    if (!user) throw new Error("User not found");

    // Update email if changed
    if (preferences.email && preferences.email !== user.email) {
      await prisma.user.update({
        where: { id: user.id },
        data: { email: preferences.email },
      });
    }

    // Update discord if changed
    if (preferences.discord !== undefined) {
      // upsert socials (discord stored in UserSocials)
      const existingSocials = await prisma.userSocials.findUnique({ where: { userId: user.id } });
      if (existingSocials) {
        await prisma.userSocials.update({
          where: { userId: user.id },
          data: { discord: preferences.discord },
        });
      } else {
        await prisma.userSocials.create({
          data: { userId: user.id, discord: preferences.discord },
        });
      }
    }

    // Update or create notification preference
    const result = await prisma.notificationPreference.upsert({
      where: { userId: user.id },
      update: {
        emailNotifications: preferences.emailNotifications,
        discordNotifications: preferences.discordNotifications,
      },
      create: {
        userId: user.id,
        emailNotifications: preferences.emailNotifications,
        discordNotifications: preferences.discordNotifications,
      },
    });

    return result;
  } catch (error) {
    console.error("Error updating preferences:", error);
    throw error;
  }
}
