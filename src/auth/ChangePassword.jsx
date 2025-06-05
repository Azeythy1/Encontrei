import { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';

export default function ChangePassword() {
  const { changePassword } = useContext(AuthContext);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setMessage('As novas senhas não coincidem');
      return;
    }
    
    if (changePassword(newPassword)) {
      setMessage('Senha alterada com sucesso!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setMessage('Erro ao alterar senha');
    }
  };

  return (
    <div className="change-password-form">
      <h3>Alterar Senha Admin</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Senha Atual:</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Nova Senha:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength="6"
          />
        </div>
        
        <div className="form-group">
          <label>Confirmar Nova Senha:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        
        {message && <div className="message">{message}</div>}
        
        <button type="submit" className="change-password-btn">
          Alterar Senha
        </button>
      </form>
    </div>
  );
}