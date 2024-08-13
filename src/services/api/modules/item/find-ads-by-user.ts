import { api } from "../../api";

export const findAdsByUser = async () => {
  const request = await api.get("/ads/user");

  return request.data;
};
