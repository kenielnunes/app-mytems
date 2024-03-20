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
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser deve ser usado dentro de um UserProvider");
  }
  return context;
};

// Componente provedor do contexto do usuário
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

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
