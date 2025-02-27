import React from 'react';
import '../styles/QuienesSomos.css';

const QuienesSomos = () => {
  return (
    <div className="quienes-somos-container">
      <h1>Quienes Somos</h1>
      <p>Somos una tienda web dedicada a la venta de productos al por menor, con distribución a lo largo de todo el territorio chileno. Nos enorgullece ofrecer una amplia gama de productos de alta calidad.</p>
      <p>Trabajamos con marcas reconocidas a nivel mundial, garantizando la calidad y el respaldo que cada una de ellas ofrece. Nuestro compromiso es brindar a nuestros clientes una experiencia de compra excepcional, con productos que cumplen con los más altos estándares de calidad y servicio.</p>
      <img src="/images/Multi_Marcas_Trans.png" alt="Multi Marcas" className="quienes-somos-image" />
    </div>
  );
};

export default QuienesSomos;