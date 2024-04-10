import { parseCookies } from "nookies";
import { api } from "../../api";

export const findUserByCredential = async () => {
  const { auth: token } = parseCookies();

  api.defaults.headers["Authorization"] = `Bearer ${token}`;

  const { data } = await api.get("/users");

  return await data.content;
};
