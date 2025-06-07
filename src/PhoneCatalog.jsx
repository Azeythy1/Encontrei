import { useState, useEffect, useContext } from 'react';
import PhoneCard from './components/PhoneCard';
import { AuthContext } from './auth/AuthContext';
import './PhoneCatalog.css';

export default function PhoneCatalog() {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await import('./phonesData');
        
        // Validação dos dados
        if (!Array.isArray(response?.default)) {
          throw new Error('Formato de dados inválido');
        }

        const validProducts = response.default.filter(product => 
          product && 
          typeof product === 'object' && 
          product.brand && 
          product.model
        );

        setProducts(validProducts);
      } catch (err) {
        console.error('Erro ao carregar produtos:', err);
        setError('Erro ao carregar os produtos');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return <div className="loading">Carregando produtos...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="phone-catalog">
      {user && <p className="welcome-message">Bem-vindo, {user.username}!</p>}
      
      <div className="products-grid">
        {products.length > 0 ? (
          products.map(product => (
            <PhoneCard key={product.id || Math.random()} product={product} />
          ))
        ) : (
          <p className="no-products">Nenhum produto disponível</p>
        )}
      </div>
    </div>
  );
}