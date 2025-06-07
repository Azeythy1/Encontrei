import { useState } from 'react';
import './PhoneCard.css';

export default function PhoneCard({ product }) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Verificação segura do produto
  if (!product || typeof product !== 'object') {
    return (
      <div className="phone-card error">
        <p>Produto inválido ou não disponível</p>
      </div>
    );
  }

  return (
    <div 
      className={`phone-card ${isFlipped ? 'flipped' : ''}`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className="phone-card-inner">
        {/* Lado da Frente (Foto) */}
        <div className="phone-card-front">
          {product.image ? (
            <img 
              src={product.image} 
              alt={`${product.brand || 'Marca desconhecida'} ${product.model || 'Modelo desconhecido'}`}
              className="phone-image"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x300?text=Imagem+Não+Disponível';
              }}
            />
          ) : (
            <div className="image-placeholder">
              <span>+ Adicionar Foto</span>
            </div>
          )}
          <h3>{product.brand || 'Marca'} {product.model || 'Modelo'}</h3>
        </div>

        {/* Lado de Trás (Especificações) */}
        <div className="phone-card-back">
          <h3>{product.brand || 'Marca'} {product.model || 'Modelo'}</h3>
          <ul className="specs-list">
            {product.specs && Object.entries(product.specs).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value || 'N/A'}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}