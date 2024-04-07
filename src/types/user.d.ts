type User = {
  id?: string;
  name: string;
  email: string;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  stripePriceId: string;
  profileImageUrl?: string;
  originProfileUrl?: string | null;
  origin: UserOrigin;
  createdAt?: Date;
  updatedAt?: Date;
};
