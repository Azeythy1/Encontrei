import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import './AdminPanel.css';

// Configuração dos campos por categoria
const categoryFields = {
  Smartphone: {
    required: ['brand', 'model', 'image', 'Armazenamento', 'Memória RAM', 'Tela', 'Processador', 'Bateria'],
    specs: {
      'Armazenamento': { type: 'text', placeholder: 'ex: 256GB' },
      'Memória RAM': { type: 'text', placeholder: 'ex: 8GB' },
      'Tela': { type: 'text', placeholder: 'ex: 6.5" AMOLED' },
      'Processador': { type: 'text', placeholder: 'ex: Snapdragon 888' },
      'Bateria': { type: 'text', placeholder: 'ex: 5000mAh' },
      'Rede': { type: 'text', placeholder: 'ex: 5G' },
      'Carregador': { type: 'text', placeholder: 'ex: 67W' }
    }
  },
  Notebook: {
    required: ['brand', 'model', 'image', 'Armazenamento', 'Memória RAM', 'Tela', 'Processador', 'GPU'],
    specs: {
      'Armazenamento': { type: 'text', placeholder: 'ex: 1TB SSD' },
      'Memória RAM': { type: 'text', placeholder: 'ex: 16GB' },
      'Tela': { type: 'text', placeholder: 'ex: 15.6" FHD' },
      'Processador': { type: 'text', placeholder: 'ex: Intel Core i7' },
      'GPU': { type: 'text', placeholder: 'ex: NVIDIA RTX 3060' }
    }
  }
};

export default function AdminPanel() {
  const { logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('list');
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({
    category: 'Smartphone',
    brand: '',
    model: '',
    image: '',
    specs: {}
  });

  // Carrega produtos (simulando API)
  useEffect(() => {
    // Substitua por sua lógica de carregamento real
    const loadProducts = async () => {
      try {
        const response = await import('../phonesData');
        setProducts(response.default || []);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    };
    loadProducts();
  }, []);

  // Atualiza campos do formulário quando a categoria muda
  useEffect(() => {
    if (formData.category) {
      const newSpecs = {};
      Object.keys(categoryFields[formData.category].specs).forEach(key => {
        newSpecs[key] = currentProduct?.specs[key] || '';
      });
      setFormData(prev => ({ ...prev, specs: newSpecs }));
    }
  }, [formData.category, currentProduct]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSpecChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      specs: { ...prev.specs, [field]: value }
    }));
  };
  const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  if (file) {
    // Simulando upload - na prática, use uma API
    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData(prev => ({
        ...prev,
        image: event.target.result
      }));
    };
    reader.readAsDataURL(file);
  }
};

  const handleSubmit = (e) => {
    e.preventDefault();

    
    // Validação
    const requiredFields = categoryFields[formData.category].required;
    for (const field of requiredFields) {
      if (!formData[field] && !formData.specs[field]) {
        alert(`O campo "${field}" é obrigatório!`);
        return;
      }
    }

    const productToSave = {
      ...formData,
      id: currentProduct?.id || Date.now()
    };

    setProducts(prev =>
      currentProduct
        ? prev.map(p => p.id === currentProduct.id ? productToSave : p)
        : [...prev, productToSave]
    );

    setActiveTab('list');
    setCurrentProduct(null);
  };

  const editProduct = (product) => {
    setCurrentProduct(product);
    setFormData({
      category: product.category,
      brand: product.brand,
      model: product.model,
      image: product.image,
      specs: { ...product.specs }
    });
    setActiveTab('form');
  };

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Painel Administrativo</h1>
      </div>

      <div className="admin-tabs">
        <button
          className={activeTab === 'list' ? 'active' : ''}
          onClick={() => setActiveTab('list')}
        >
          Lista de Produtos
        </button>
        <button
          className={activeTab === 'form' ? 'active' : ''}
          onClick={() => {
            setCurrentProduct(null);
            setFormData({
              category: 'Smartphone',
              brand: '',
              model: '',
              image: '',
              specs: {}
            });
            setActiveTab('form');
          }}
        >
          {currentProduct ? 'Editar Produto' : 'Adicionar Produto'}
        </button>
      </div>

      {activeTab === 'list' ? (
        <div className="product-list">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <h3>{product.brand} {product.model}</h3>
              <p>Categoria: {product.category}</p>
              <button 
                className="btn btn-secondary"
                onClick={() => editProduct(product)}
              >
                Editar
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="form-container">
          <form onSubmit={handleSubmit} className="dynamic-form">
            <div className="form-section">
              <h3>Informações Básicas</h3>
              
              <div className="form-group">
                <label>Categoria</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  {Object.keys(categoryFields).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Marca</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  required
                />
              </div>

               <div className="form-group">
                <label>Modelo</label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  required
                />
              </div>

               <div className="form-group">
              <label>Imagem do Produto</label>
               <input
                type="file"
                accept="image/*"
                 onChange={handleImageUpload}
              />
                 {formData.image && (
                <img 
                 src={formData.image} 
                 alt="Preview" 
                 style={{ maxWidth: '100px', marginTop: '10px' }}
                />
                 )}
            </div>
              
          </div>

            <div className="form-section">
              <h3>Especificações Técnicas</h3>
              {formData.category && Object.entries(categoryFields[formData.category].specs).map(([field, config]) => (
                <div key={field} className="form-group">
                  <label>{field}</label>
                  <input
                    type={config.type || 'text'}
                    value={formData.specs[field] || ''}
                    onChange={(e) => handleSpecChange(field, e.target.value)}
                    placeholder={config.placeholder}
                    required={categoryFields[formData.category].required.includes(field)}
                  />
                </div>
              ))}
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => setActiveTab('list')}
              >
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                {currentProduct ? 'Atualizar' : 'Salvar'} Produto
              </button>
            </div>
          </form>
        </div>
      )}

      <button className="btn btn-secondary" onClick={logout} style={{ marginTop: '2rem' }}>
        Sair
      </button>
    </div>
  );
}