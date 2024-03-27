import { api } from "../../api";

type CreateUser = {
  name: string;
  email: string;
  origin: UserOrigin;
};

export const createUser = async (userData: CreateUser): Promise<User> => {
  const { data } = await api.post("/users", userData);

  return data.content;
};
