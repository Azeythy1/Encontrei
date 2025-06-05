// src/components/SpecsList.jsx
export default function SpecsList({ specs }) {
  return (
    <ul style={{
      listStyle: 'none',
      padding: '10px 0',
      textAlign: 'left',
      margin: '10px 0'
    }}>
      {Object.entries(specs || {}).map(([key, value]) => (
        <li key={key} style={{ marginBottom: '5px' }}>
          <strong style={{ color: '#555' }}>{key}:</strong> {value}
        </li>
      ))}
    </ul>
  );
}