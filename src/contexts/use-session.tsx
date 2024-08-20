import { authUserByMagicLink } from "@/services/api/modules/auth/auth-user-by-magic-link";
import { findUserByCredential } from "@/services/api/modules/user/find-user-by-credential";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";

// Definindo o tipo para o contexto do usuário
interface UserContextType {
  user: User | undefined;
  login: (userData: User) => void;
  logout: () => void;
  revalidateUser: () => void;
}

// Criando o contexto do usuário
const UserContext = createContext<UserContextType | undefined>(undefined);

// Hook customizado para acessar o contexto do usuário
export const useSession = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useSession deve ser usado dentro de um SessionProvider");
  }
  return context;
};

// Componente provedor do contexto do usuário
export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const { query, replace, pathname } = useRouter();
  const queryClient = useQueryClient();
  const [user, setUser] = useState<User | undefined>(undefined);

  const revalidateUser = async () => {
    const { auth: token } = parseCookies();
    if (token) {
      const updatedUser = await queryClient.fetchQuery<User>({
        queryKey: ["user"],
      });
      setUser(updatedUser);
    } else {
      setUser(undefined);
    }
  };

  const { data } = useQuery<User>({
    queryKey: ["user"],
    queryFn: async () => {
      const { auth: token } = parseCookies();
      if (token) {
        const user = await findUserByCredential();
        return user;
      }
    },
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  useEffect(() => {
    async function authByMagicLink() {
      if (query.magicAuthToken) {
        try {
          const auth = await authUserByMagicLink(
            query.magicAuthToken as string
          );

          // Salva o JWT nos cookies
          setCookie(undefined, "auth", auth.content.authToken);

          // Revalida os dados do usuário
          await revalidateUser();

          // Limpa o token de autenticação da URL
          replace({
            pathname,
            query: {},
          });
        } catch (error: any) {
          console.log(error.response);
        }
      }
    }

    authByMagicLink();
  }, [query.magicAuthToken]);

  const login = (userData: User) => {
    setUser(userData);
    revalidateUser();
  };

  const logout = () => {
    destroyCookie(undefined, "auth");
    setUser(undefined);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, revalidateUser }}>
      {children}
    </UserContext.Provider>
  );
};
