import { authUserByMagicLink } from "@/services/api/modules/auth/auth-user-by-magic-link";
import { findUserByCredential } from "@/services/api/modules/user/find-user-by-credential";
import { useRouter } from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import React, { createContext, ReactNode, useContext, useState } from "react";

// Definindo o tipo para o contexto do usuário
interface UserContextType {
  user: User | undefined;
  login: (userData: User) => void;
  logout: () => void;
}

// Criando o contexto do usuário
const UserContext = createContext<UserContextType | undefined>(undefined);

// Hook customizado para acessar o contexto do usuário
export const useSession = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser deve ser usado dentro de um UserProvider");
  }
  return context;
};

// Componente provedor do contexto do usuário
export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>();

  const { query, replace, pathname } = useRouter();

  React.useEffect(() => {
    async function authByMagicLink() {
      if (query.magicAuthToken) {
        try {
          const auth = await authUserByMagicLink(
            query.magicAuthToken as string
          );

          // salva o jwt nos cookies
          setCookie(undefined, "auth", auth.content.authToken);

          // salva os dados do usuario no context
          setUser(auth.content.user);

          // limpa o token de autenticação da url
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

    const { auth: token } = parseCookies();

    async function recoverUserInfo() {
      if (token) {
        const user = await findUserByCredential();

        setUser(user);
      }
    }

    recoverUserInfo();
  }, [query.magicAuthToken]);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(undefined);
    destroyCookie(undefined, "auth");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
