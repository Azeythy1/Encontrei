export default function PhoneCard({ phone }) {
  return (
    <div className="phone-card">
      <div className="phone-badge">{phone.brand}</div>
      <img 
        src={phone.image} 
        alt={`${phone.brand} ${phone.model}`}
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/300x300?text=Sem+Imagem';
        }}
      />
      
      <div className="phone-info">
        <h3>{phone.model}</h3>
        <ul className="specs-list">
          {Object.entries(phone.specs).map(([key, value]) => (
            <li key={key}>
              <span className="spec-name">{key}:</span>
              <span className="spec-value">{value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}