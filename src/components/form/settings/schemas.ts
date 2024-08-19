import * as z from "zod";

export const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  birthday: z.string().optional(),
});

export const biographySchema = z.object({
  biography: z.string().optional(),
});

export const accountSchema = z.object({
  id: z.string(),
  stripeCustomerId: z.string(),
  stripeSubscriptionId: z.string(),
});

export const profileImgSchema = z.object({
  profileImg: z.any().optional(), // A imagem pode ser opcional
});
