import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import ChangePassword from '../auth/ChangePassword';

export default function AdminPanel() {
    const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('list');
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    specs: {
      'Armazenamento': '',
      'Memória RAM': '',
      'Rede': '',
      'Câmera Principal': '',
      'Câmera Frontal': '',
      'Tela': '',
      'Processador': '',
      'Bateria': '',
      'Carregador': '',
      'NFC': '',
      'E-SIM': ''
    },
    image: ''
  });

  // Carregar produtos (simulando chamada API)
  const loadProducts = () => {
    import('../phonesData')
      .then(module => setProducts(module.default))
      .catch(err => console.error('Erro ao carregar produtos:', err));
  };

  // Carregar produtos ao montar o componente
  useState(() => {
    loadProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name in formData.specs) {
      setFormData(prev => ({
        ...prev,
        specs: {
          ...prev.specs,
          [name]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (currentProduct) {
      // Lógica para editar produto
      setProducts(products.map(p => 
        p.id === currentProduct.id ? { ...formData, id: currentProduct.id } : p
      ));
    } else {
      // Lógica para adicionar novo produto
      const newProduct = {
        ...formData,
        id: Date.now() // ID temporário
      };
      setProducts([...products, newProduct]);
    }
    
    resetForm();
    setActiveTab('list');
  };

  const editProduct = (product) => {
    setCurrentProduct(product);
    setFormData({
      brand: product.brand,
      model: product.model,
      specs: { ...product.specs },
      image: product.image
    });
    setActiveTab('add');
  };

  const deleteProduct = (productId) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  const resetForm = () => {
    setFormData({
      brand: '',
      model: '',
      specs: {
        'Armazenamento': '',
        'Memória RAM': '',
        'Rede': '',
        'Câmera Principal': '',
        'Câmera Frontal': '',
        'Tela': '',
        'Processador': '',
        'Bateria': '',
        'Carregador': '',
        'NFC': '',
        'E-SIM': ''
      },
      image: ''
    });
    setCurrentProduct(null);
  };
  const goToHome = () => {
  // Substitui a entrada no histórico de navegação
  navigate('/', { replace: true });
};

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Painel Administrativo</h1>
        <p>Bem-vindo, {user?.username}!</p>
      </div>
      
      <div className="admin-tabs">
        <button 
          className={activeTab === 'list' ? 'active' : ''}
          onClick={() => {
            setActiveTab('list');
            resetForm();
          }}
        >
          Lista de Produtos
        </button>
        <button 
          className={activeTab === 'add' ? 'active' : ''}
          onClick={() => {
            setActiveTab('add');
            setCurrentProduct(null);
          }}
        >
          {currentProduct ? 'Editar Produto' : 'Adicionar Produto'}
        </button>
      </div>
        
      <div className="admin-actions">
        <button onClick={goToHome} className="home-btn">
         Página Inicial
        </button>
        <button 
          onClick={() => setShowChangePassword(!showChangePassword)}
          className="change-password-toggle"
        >
          {showChangePassword ? 'Cancelar' : 'Alterar Senha'}
        </button>
       
        
      </div>

      {showChangePassword && <ChangePassword />}

      {activeTab === 'list' ? (
        <div className="product-list">
          {products.length === 0 ? (
            <p>Nenhum produto cadastrado</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Marca</th>
                  <th>Modelo</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td>{product.brand}</td>
                    <td>{product.model}</td>
                    <td className="actions">
                      <button 
                        onClick={() => editProduct(product)}
                        className="edit-btn"
                      >
                        Editar
                      </button>
                      <button 
                        onClick={() => deleteProduct(product.id)}
                        className="delete-btn"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="product-form">
          <h2>{currentProduct ? 'Editar Produto' : 'Novo Produto'}</h2>
          
          <div className="form-section">
            <h3>Informações Básicas</h3>
            <div className="form-group">
              <label>Marca:</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Modelo:</label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>URL da Imagem:</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Especificações Técnicas</h3>
            <div className="specs-grid">
              {Object.entries(formData.specs).map(([key, value]) => (
                <div key={key} className="form-group">
                  <label>{key}:</label>
                  <input
                    type="text"
                    name={key}
                    value={value}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              onClick={() => {
                setActiveTab('list');
                resetForm();
              }}
              className="cancel-btn"
            >
              Cancelar
            </button>
            <button type="submit" className="save-btn">
              {currentProduct ? 'Atualizar' : 'Salvar'} Produto
            </button>
          </div>
        </form>
      )}

      <button onClick={logout} className="logout-btn">
        Sair
      </button>
    </div>
  );
}