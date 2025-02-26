import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import '../styles/Home.css';

const Productos = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/products')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div className="home-container">
      <aside className="menu-container">
        <ul className="list-group">
          <li className="list-group-item">Categoría 1</li>
          <li className="list-group-item">Categoría 2</li>
          <li className="list-group-item">Categoría 3</li>
        </ul>
      </aside>
      <main className="products-container">
        <div className="row justify-content-center">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              id={product.id_producto}
              image={product.image}
              title={product.nombre}
              price={product.precio}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Productos;