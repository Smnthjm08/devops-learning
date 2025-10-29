"use server";

import prisma from "@workspace/db";
import { completeOnboardingSchema } from "../schemas/user";
import z from "zod";

export async function completeOnboarding(
  userOnboardingData: z.infer<typeof completeOnboardingSchema>,
) {
  try {
    const parsed = completeOnboardingSchema.parse(userOnboardingData);
    const user = await prisma.$transaction(async (tx) => {
      const updatedUser = await tx.user.update({
        where: { publicKey: parsed.publicKey },
        data: {
          isOnboarded: true,
          username: parsed.username,
          name: parsed.name,
          email: parsed.email,
          bio: parsed.bio,
        },
      });

      const userSocials = await tx.userSocials.create({
        data: {
          userId: updatedUser.id,
          twitter: parsed.twitter,
          github: parsed.github,
          website: parsed.website,
          discord: parsed.discord,
        },
      });

      return { ...updatedUser, socials: userSocials };
    });

    return { success: true, message: "Onboarding completed", user };
  } catch (error) {
    console.error("Error in completeOnboarding:", error);
    return { success: "error", message: "Failed to complete onboarding" };
  }
}
