import React, { useContext } from 'react';
import '../styles/Carrito.css';
import { GlobalContext } from '../context/GlobalState';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../utils'; // Importa la función de formateo

const Carrito = () => {
  const [state, { updateCartQuantity, removeFromCart }] = useContext(GlobalContext);
  const { cart } = state;
  const navigate = useNavigate();

  const handleQuantityChange = (title, quantity) => {
    if (quantity > 0) {
      updateCartQuantity(title, quantity);
    }
  };

  const handleRemove = (title) => {
    removeFromCart(title);
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePagar = () => {
    navigate('/pago');
  };

  return (
    <div className="carrito-container">
      <h1>Carrito de Compras</h1>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div className="cart-items-container">
          <div className="cart-header">
            <div>Foto</div>
            <div>Producto</div>
            <div>Precio Unidad</div>
            <div>Cantidad</div>
            <div>Total</div>
            <div>Eliminar</div>
          </div>
          <div className="cart-items">
            {cart.map((product, index) => (
              <div key={index} className="cart-item">
                <div><img src={product.image} alt={product.title} /></div> {/* Usa la ruta de la imagen desde la base de datos */}
                <div>{product.title}</div>
                <div>{formatPrice(product.price)}</div> {/* Usa la función de formateo */}
                <div className="quantity-controls">
                  <button onClick={() => handleQuantityChange(product.title, product.quantity - 1)}>-</button>
                  <span>{product.quantity}</span>
                  <button onClick={() => handleQuantityChange(product.title, product.quantity + 1)}>+</button>
                </div>
                <div>{formatPrice(product.price * product.quantity)}</div> {/* Usa la función de formateo */}
                <div><button className="btn btn-danger" onClick={() => handleRemove(product.title)}>Eliminar</button></div>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <h3>Total de la compra: {formatPrice(total)}</h3> {/* Usa la función de formateo */}
            <button className="btn btn-primary" onClick={handlePagar}>Pagar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrito;