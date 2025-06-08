import { createContext, useState, useCallback, useMemo } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [adminPassword, setAdminPassword] = useState('admin');

  // useCallback para memoizar as funções e evitar recriações desnecessárias
  const login = useCallback((username, password) => {
    if (username === 'admin' && password === adminPassword) {
      const userData = { 
        username,
        isAdmin: true // Adicionei uma flag para identificar admins
      };
      setUser(userData);
      return Promise.resolve(true); // Retornando uma Promise para simular async
    }
    return Promise.reject(new Error('Credenciais inválidas'));
  }, [adminPassword]);

  const changePassword = useCallback((newPassword) => {
    setAdminPassword(newPassword);
    return Promise.resolve(true);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  // useMemo para otimizar o valor do contexto
  const contextValue = useMemo(() => ({
    user,
    login,
    logout,
    changePassword,
    isAuthenticated: !!user // Adicionei uma flag booleana para verificação simples
  }), [user, login, logout, changePassword]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};