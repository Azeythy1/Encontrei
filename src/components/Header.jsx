
import React, { useContext } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import './Header.css';

const Header = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Redireciona para home após logout
  };

  return (
    <header className="header">
      
      <nav className="nav">
        <ul className="nav-list">
          
          {isAuthenticated && user?.isAdmin && (
            <li className="nav-item">
              <Link to="/admin" className="nav-link">Admin</Link>
            </li>
          )}
        </ul>
      </nav>

      <div className="auth-section">
        {isAuthenticated ? (
          <div className="user-info">
            <span className="username">Olá, {user.username}</span>
            <button onClick={handleLogout} className="logout-button">Sair</button>
          </div>
        ) : (
          <Link to="/login" className="login-button">Login</Link>
        )}
      </div>
    </header>
  );
};

export default Header;