import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import Login from './auth/Login';
import AdminPanel from './admin/AdminPanel';
import PhoneCatalog from './PhoneCatalog';
import ProtectedRoute from './components/ProtectedRoute';
import React from 'react'; // Importação do React adicionada

export default function App() {
  return (
    <React.StrictMode>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PhoneCatalog />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </React.StrictMode>
  );
}