import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [adminPassword, setAdminPassword] = useState('admin'); // Senha padrão inicial

  const login = (username, password) => {
    if (username === 'admin' && password === adminPassword) {
      setUser({ username });
      return true;
    }
    return false;
  };

  const changePassword = (newPassword) => {
    setAdminPassword(newPassword);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout,
      changePassword 
    }}>
      {children}
    </AuthContext.Provider>
  );
};