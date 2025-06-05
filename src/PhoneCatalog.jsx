// src/PhoneCatalog.jsx
import { useState, useEffect, useContext } from 'react'; // Importação corrigida
import PhoneCard from './components/PhoneCard';
import { AuthContext } from './auth/AuthContext';
import './index.css';

export default function PhoneCatalog() {
  const { user } = useContext(AuthContext);
  const [phones, setPhones] = useState([]); // Agora funcionará

  useEffect(() => {
    import('./phonesData')
      .then(module => setPhones(module.default))
      .catch(err => console.error('Erro ao carregar dados:', err));
  }, []);

  return (
    <div className="app">
      {user && <p className="welcome-message">Bem-vindo, {user.username}!</p>}
      
      <div className="phones-grid">
        {phones.map(phone => (
          <PhoneCard key={phone.id} phone={phone} />
        ))}
      </div>
    </div>
  );
}