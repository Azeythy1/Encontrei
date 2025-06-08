import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext'; // Alterar importação

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext); // Modificado para usar useContext
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;