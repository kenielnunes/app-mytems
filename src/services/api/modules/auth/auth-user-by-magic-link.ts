import { api } from "../../api";

type AuthUserByMagicLinkOutput = {
  message: string;
  content: {
    authToken: string;
    user: User;
  };
};

export const authUserByMagicLink = async (
  token: string
): Promise<AuthUserByMagicLinkOutput> => {
  const urlParams = new URLSearchParams({
    token: token,
  });

  const { data } = await api.post(`/auth?${urlParams}`);

  return data;
};
