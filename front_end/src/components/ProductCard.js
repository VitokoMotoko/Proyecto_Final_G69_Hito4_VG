import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const ProductCard = ({ image, title, price }) => {
  const [, { addToCart }] = useContext(GlobalContext); // Eliminar 'state' si no se usa

  const handleAddToCart = () => {
    const product = { image, title, price };
    addToCart(product);
  };

  return (
    <div className="col-md-4 d-flex justify-content-center">
      <div className="card">
        <img src={`/images/${image}`} className="card-img-top" alt={title} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">${price}</p>
          <button className="btn btn-primary" onClick={handleAddToCart}>Comprar</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;