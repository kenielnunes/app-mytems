import { api } from "../../api";

type CreateUser = {
  name: string;
  email: string;
  origin: UserOrigin;
  biography?: string;
  birthday?: Date | string;
};

export const createUser = async (userData: FormData): Promise<User> => {
  const { data } = await api.post("/users", userData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data.content;
};
