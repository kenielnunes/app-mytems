import { api } from "../../api";

export const userAuth = async (email: string) => {
  const urlParams = new URLSearchParams({
    email: email,
  });

  const { data } = await api.post(`/auth/send-magic-link?${urlParams}`);

  return data;
};
