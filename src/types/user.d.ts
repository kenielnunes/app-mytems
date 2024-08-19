type User = {
  id?: string;
  name: string;
  email: string;
  birthday: string;
  biography: string;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  stripePriceId: string;
  profileImageUrl?: string;
  originProfileUrl?: string | null;
  origin: UserOrigin;
  createdAt?: Date;
  updatedAt?: Date;
};

type UserOrigin = "STEAM" | "GOOGLE" | "PERSONAL_MAIL";
