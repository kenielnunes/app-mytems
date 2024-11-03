export type Friend = {
  id: string;
  status: "ACCEPTED" | "REJECTED" | "PENDING" | "BLOCKED";
  createdAt: string;
  updatedAt: string;
  friend: {
    name: string;
    profileImageUrl: string;
    id: string;
  };
};
