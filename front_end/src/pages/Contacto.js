import React from 'react';
import '../styles/Contacto.css';

const Contacto = () => {
  return (
    <div className="contacto-container">
      <h1>Contacto</h1>
      <form className="contacto-form">
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input type="text" id="nombre" className="form-control" placeholder="Tu nombre" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" className="form-control" placeholder="Tu email" required />
        </div>
        <div className="form-group">
          <label htmlFor="mensaje">Mensaje</label>
          <textarea id="mensaje" className="form-control" rows="5" placeholder="Tu mensaje" required></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Enviar</button>
      </form>
    </div>
  );
};

export default Contacto;