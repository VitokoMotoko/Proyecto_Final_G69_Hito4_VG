import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import '../styles/Home.css';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('recientes');

  const products = [
    { image: 'AB.jpg', title: 'Victorinox AB', price: 10.00, sold: 50, rating: 4.5, date: '2025-01-01' },
    { image: 'Guantes_Pesca.jpg', title: 'Guantes de Pesca', price: 20.00, sold: 30, rating: 4.0, date: '2025-02-01' },
    { image: 'H_Camo.jpg', title: 'Victorinox Huntsman Camo', price: 30.00, sold: 70, rating: 4.8, date: '2025-03-01' },
    { image: 'Hunter_red.jpg', title: 'Victorinox Hunter Red', price: 40.00, sold: 20, rating: 3.5, date: '2025-04-01' },
    { image: 'KIT_SOS.jpg', title: 'Kit SOS', price: 50.00, sold: 90, rating: 4.9, date: '2025-05-01' },
    { image: 'NClip.jpg', title: 'Victorinox Nail Clip 580', price: 60.00, sold: 10, rating: 3.0, date: '2025-06-01' },
    // Agrega más productos aquí
  ];

  const getSortedProducts = () => {
    switch (selectedCategory) {
      case 'recientes':
        return products.sort((a, b) => new Date(b.date) - new Date(a.date));
      case 'vendidos':
        return products.sort((a, b) => b.sold - a.sold);
      case 'valorados':
        return products.sort((a, b) => b.rating - a.rating);
      default:
        return products;
    }
  };

  const sortedProducts = getSortedProducts();

  const getTitle = () => {
    switch (selectedCategory) {
      case 'recientes':
        return 'Productos Recientes';
      case 'vendidos':
        return 'Más Vendidos';
      case 'valorados':
        return 'Mejor Valorados';
      default:
        return 'Productos';
    }
  };

  return (
    <div className="home-container">
      <aside className="menu-container">
        <ul className="list-group">
          <li className={`list-group-item ${selectedCategory === 'recientes' ? 'active' : ''}`} onClick={() => setSelectedCategory('recientes')}>Productos Recientes</li>
          <li className={`list-group-item ${selectedCategory === 'vendidos' ? 'active' : ''}`} onClick={() => setSelectedCategory('vendidos')}>Más Vendidos</li>
          <li className={`list-group-item ${selectedCategory === 'valorados' ? 'active' : ''}`} onClick={() => setSelectedCategory('valorados')}>Mejor Valorados</li>
        </ul>
      </aside>
      <main className="products-container">
        <h2>{getTitle()}</h2>
        <div className="products-grid">
          {sortedProducts.map((product, index) => (
            <ProductCard
              key={index}
              id={product.id}
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

export default Home;