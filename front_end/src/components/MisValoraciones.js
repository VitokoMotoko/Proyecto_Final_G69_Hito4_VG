import React, { useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import '../styles/MisValoraciones.css';

const MisValoraciones = () => {
  const [state] = useContext(GlobalContext);
  const { user } = state;
  const [valoraciones, setValoraciones] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchValoraciones = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/users/${user.id}/valoraciones`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) {
          throw new Error('Error al obtener las valoraciones');
        }
        const data = await response.json();
        setValoraciones(data);
      } catch (error) {
        setError(error.message);
      }
    };

    if (user) {
      fetchValoraciones();
    }
  }, [user]);

  return (
    <div className="mis-valoraciones-container">
      <h2>Mis Valoraciones</h2>
      {error ? (
        <div className="error-message">Error: {error}</div>
      ) : valoraciones.length === 0 ? (
        <div className="no-valoraciones-message">No has realizado ninguna valoración.</div>
      ) : (
        <div className="valoraciones-grid">
          {valoraciones.map((valoracion) => (
            <div key={valoracion.id_comentario} className="valoracion-item">
              <h3>Producto: {valoracion.nombre_producto}</h3>
              <p>Fecha: {new Date(valoracion.fecha_comentario).toLocaleDateString()}</p>
              <p>Calificación: {'⭐'.repeat(valoracion.calificacion)}</p>
              <p>Comentario: {valoracion.comentario}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MisValoraciones;