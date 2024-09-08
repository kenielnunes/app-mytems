import { api } from "../../api";

type UpdateUser = Omit<User, "profileImageUrl"> & {
  profileImg: any;
};

export const updateUserProfileImage = async (
  userData: FormData
): Promise<User> => {
  const { data } = await api.put("/users", userData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data.content;
};
