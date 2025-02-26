import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';
import '../styles/Pago.css';

const Pago = () => {
  const [tipoTarjeta, setTipoTarjeta] = useState('');
  const [nombreTarjeta, setNombreTarjeta] = useState('');
  const [numeroTarjeta, setNumeroTarjeta] = useState('');
  const [cuotas, setCuotas] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [state] = useContext(GlobalContext);
  const { cart, user } = state;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      setMensaje('Debes iniciar sesión para realizar el pago.');
      navigate('/login');
    }
  }, [user, navigate]);

  const handlePago = async () => {
    if (!user) {
      setMensaje('Debes iniciar sesión para realizar el pago.');
      return;
    }

    // Simulación de validación de pago
    if (!tipoTarjeta || !nombreTarjeta || !numeroTarjeta || (tipoTarjeta === 'credito' && !cuotas)) {
      setMensaje('Por favor, completa todos los campos.');
      return;
    }

    // Simulación de pago exitoso
    setMensaje('Pago exitoso. Redirigiendo al home...');
    
    // Guardar la transacción en la base de datos
    const response = await fetch('http://localhost:4000/api/users/compra', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        id_user: user.id,
        cart,
        tipoTarjeta,
        numeroTarjeta,
        tipoPago: tipoTarjeta,
        cuotas: tipoTarjeta === 'credito' ? cuotas : null
      })
    });

    if (response.ok) {
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } else {
      setMensaje('Error al procesar el pago. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="pago-container">
      <h1>Pago</h1>
      <div className="form-group">
        <label htmlFor="tipoTarjeta">Tipo de Tarjeta</label>
        <select id="tipoTarjeta" value={tipoTarjeta} onChange={(e) => setTipoTarjeta(e.target.value)} className="form-control">
          <option value="">Selecciona una opción</option>
          <option value="debito">Tarjeta de Débito</option>
          <option value="credito">Tarjeta de Crédito</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="nombreTarjeta">Nombre en la Tarjeta</label>
        <input
          type="text"
          id="nombreTarjeta"
          value={nombreTarjeta}
          onChange={(e) => setNombreTarjeta(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="numeroTarjeta">Número de Tarjeta</label>
        <input
          type="text"
          id="numeroTarjeta"
          value={numeroTarjeta}
          onChange={(e) => setNumeroTarjeta(e.target.value)}
          className="form-control"
        />
      </div>
      {tipoTarjeta === 'credito' && (
        <div className="form-group">
          <label htmlFor="cuotas">Cuotas</label>
          <select id="cuotas" value={cuotas} onChange={(e) => setCuotas(e.target.value)} className="form-control">
            <option value="">Selecciona una opción</option>
            <option value="1">1 cuota</option>
            <option value="3">3 cuotas</option>
            <option value="6">6 cuotas</option>
            <option value="12">12 cuotas</option>
          </select>
        </div>
      )}
      <button onClick={handlePago} className="btn btn-primary">Pagar</button>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default Pago;