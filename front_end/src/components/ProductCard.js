import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';
import { formatPrice } from '../utils'; // Importa la función de formateo

const ProductCard = ({ id, image, title, price }) => {
  const [, { addToCart }] = useContext(GlobalContext);

  const handleAddToCart = () => {
    const product = { id, image, title, price };
    addToCart(product);
  };

  return (
    <div className="col-md-4 d-flex justify-content-center">
      <div className="card">
        <Link to={`/productos/${id}`}>
          <img src={image} className="card-img-top" alt={title} />
        </Link>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{formatPrice(price)}</p> {/* Usa la función de formateo */}
          <button className="btn btn-primary" onClick={handleAddToCart}>Comprar</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;