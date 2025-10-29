import * as z from "zod";

export const userProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email").optional(),
  bio: z.string().max(200, "Max 200 characters").optional(),
});

export const userSocialsSchema = z.object({
  github: z.string().optional(),
  twitter: z.string().optional(),
  discord: z.string().optional(),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
});

export const completeOnboardingSchema = userProfileSchema
  .merge(userSocialsSchema)
  .extend({
    publicKey: z.string().min(1, "Missing public key"),
  });

export type UserProfileData = z.infer<typeof userProfileSchema>;
export type UserSocialsData = z.infer<typeof userSocialsSchema>;
export type CompleteOnboardingData = z.infer<typeof completeOnboardingSchema>;
