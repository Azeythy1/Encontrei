import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import Login from './auth/Login';
import AdminPanel from './components/AdminPanel';
import PhoneCatalog from './PhoneCatalog';
import ProtectedRoute from './components/ProtectedRoute';
import React from 'react';

export default function App() {
  return (
     <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rota pública */}
          <Route path="/" element={<PhoneCatalog />} />
          
          {/* Rotas protegidas */}
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          } />
          
          {/* Redirecionamento para 404 */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}