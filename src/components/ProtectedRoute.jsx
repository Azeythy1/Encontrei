import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  
  // Se não tem usuário, redireciona para login
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // Se tem usuário, mostra o conteúdo
  return children || <Outlet />;
}