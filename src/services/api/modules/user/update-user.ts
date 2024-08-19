import { api } from "../../api";

type UpdateUser = Omit<User, "profileImageUrl"> & {
  profileImg: any;
};

export const updateUser = async (userData: Partial<User>): Promise<User> => {
  const { data } = await api.put("/users", userData);

  return data.content;
};
