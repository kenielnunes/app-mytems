import { api } from "../../api";

export const userAuth = async (mail: string) => {
  const urlParams = new URLSearchParams({
    mail: mail,
  });

  const { data } = await api.post(`/auth?${urlParams}`);

  return data;
};
