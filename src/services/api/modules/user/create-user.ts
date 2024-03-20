import { api } from "../../api";

export const createUser = async (userData: User): Promise<User> => {
  const { data } = await api.post("/users", userData);

  return data.content;
};
