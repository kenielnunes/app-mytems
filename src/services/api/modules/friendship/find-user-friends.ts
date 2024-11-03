import { Friend } from "@/types/friend";
import { api } from "../../api";

export const findUserFriends = async (): Promise<Friend[]> => {
  const { data } = await api.get(`/friendships/user`);

  return data.content;
};
