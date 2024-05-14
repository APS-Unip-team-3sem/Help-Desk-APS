import React, { ReactNode, createContext, useContext, useState } from 'react';

// Defina a interface UserData (se ainda não estiver definida)

interface UserData {
  nome: ReactNode;
  user: string;
  senha: string;
  // Adicione outras propriedades conforme necessário
}

// Crie o contexto de autenticação
const AuthContext = createContext<{ user: UserData | null; login: (userData: UserData) => void; logout: () => void } | null>(null);

// Provedor de autenticação
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);

  // Função para fazer login
  const login = (userData: UserData) => {
    setUser(userData);
  };

  // Função para fazer logout
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar o contexto de autenticação
export const useAuth = () => {
  return useContext(AuthContext);
};