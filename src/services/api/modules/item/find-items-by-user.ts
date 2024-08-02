import { api } from "../../api";

export const findItemsByUser = async () => {
  const request = await api.get("/items/user");

  return request.data;
};
