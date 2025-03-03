import React, { useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import '../styles/MisCompras.css';
import { formatPrice } from '../utils'; // Importa la función de formateo

const MisCompras = () => {
  const [state] = useContext(GlobalContext);
  const { user } = state;
  const [compras, setCompras] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompras = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/users/${user.id}/compras`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) {
          throw new Error('Error al obtener las compras');
        }
        const data = await response.json();
        setCompras(data);
      } catch (error) {
        setError(error.message);
      }
    };

    if (user) {
      fetchCompras();
    }
  }, [user]);

  return (
    <div className="mis-compras-container">
      <h2>Mis Compras</h2>
      {error ? (
        <div className="error-message">Error: {error}</div>
      ) : compras.length === 0 ? (
        <div className="no-compras-message">No has realizado ninguna compra.</div>
      ) : (
        <div className="compras-grid">
          {compras.map((compra) => (
            <div key={compra.id_transaccion} className="compra-item">
              <h3>Compra #{compra.id_transaccion}</h3>
              <p>Fecha: {new Date(compra.fecha_transaccion).toLocaleDateString()}</p>
              <p>Total: {formatPrice(compra.total)}</p> {/* Usa la función de formateo */}
              <ul>
                {compra.productos.map((producto) => (
                  <li key={producto.id_producto}>
                    {producto.nombre} - {producto.cantidad} x {formatPrice(producto.precio_unitario)} {/* Usa la función de formateo */}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MisCompras;