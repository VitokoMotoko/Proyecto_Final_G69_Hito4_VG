import React from 'react';
import ProductCard from '../components/ProductCard';
import '../styles/Home.css';

const Productos = () => {
  const products = [
    { image: 'AB.jpg', title: 'Victorinox AB', price: 10.00 },
    { image: 'Guantes_Pesca.jpg', title: 'Guantes de Pesca', price: 20.00 },
    { image: 'H_Camo.jpg', title: 'Victorinox Huntsman Camo', price: 30.00 },
    { image: 'Hunter_red.jpg', title: 'Victorinox Hunter Red', price: 40.00 },
    { image: 'KIT_SOS.jpg', title: 'Kit SOS', price: 50.00 },
    { image: 'NClip.jpg', title: 'Victorinox Nail Clip 580', price: 60.00 },
    { image: 'Hunter_red.jpg', title: 'Victorinox Hunter Red', price: 40.00 },
    { image: 'KIT_SOS.jpg', title: 'Kit SOS', price: 50.00 },
    { image: 'NClip.jpg', title: 'Victorinox Nail Clip 580', price: 60.00 },
    // Agrega más productos aquí
  ];

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
              image={product.image}
              title={product.title}
              price={product.price}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Productos;