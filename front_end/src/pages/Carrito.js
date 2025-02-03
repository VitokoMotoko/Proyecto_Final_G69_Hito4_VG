import React, { useContext } from 'react';
import '../styles/Carrito.css';
import { GlobalContext } from '../context/GlobalState';

const Carrito = () => {
  const [state, { updateCartQuantity, removeFromCart }] = useContext(GlobalContext);
  const { cart } = state;

  const handleQuantityChange = (title, quantity) => {
    if (quantity > 0) {
      updateCartQuantity(title, quantity);
    }
  };

  const handleRemove = (title) => {
    removeFromCart(title);
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

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
                <div><img src={`/images/${product.image}`} alt={product.title} /></div>
                <div>{product.title}</div>
                <div>${product.price}</div>
                <div className="quantity-controls">
                  <button onClick={() => handleQuantityChange(product.title, product.quantity - 1)}>-</button>
                  <span>{product.quantity}</span>
                  <button onClick={() => handleQuantityChange(product.title, product.quantity + 1)}>+</button>
                </div>
                <div>${(product.price * product.quantity).toFixed(2)}</div>
                <div><button className="btn btn-danger" onClick={() => handleRemove(product.title)}>Eliminar</button></div>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <h3>Total de la compra: ${total.toFixed(2)}</h3>
            <button className="btn btn-primary">Pagar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrito;