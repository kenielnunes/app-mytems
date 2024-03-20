type User = {
  id?: string;
  name: string;
  email: string;
  profileImageUrl?: string;
  originProfileUrl?: string | null;
  origin: UserOrigin;
  createdAt?: Date;
  updatedAt?: Date;
};
