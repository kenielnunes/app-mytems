import { authUserByMagicLink } from "@/services/api/modules/auth/auth-user-by-magic-link";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import React, { createContext, ReactNode, useContext, useState } from "react";

// Definindo o tipo para o contexto do usuário
interface UserContextType {
  user: User | null;
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
  const [user, setUser] = useState<User | null>(null);
  const { query, replace, pathname } = useRouter();

  React.useEffect(() => {
    async function authByMagicLink() {
      if (query.magicAuthToken) {
        try {
          const auth = await authUserByMagicLink(query.magicAuthToken as any);

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
  }, [query.magicAuthToken]);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
