import React from 'react';
import ProductCard from '../components/ProductCard';
import '../styles/Home.css';

const Home = () => {
  const products = [
    { image: 'AB.jpg', title: 'Victorinox AB', price: 10.00 },
    { image: 'Guantes_Pesca.jpg', title: 'Guantes de Pesca', price: 20.00 },
    { image: 'H_Camo.jpg', title: 'Victorinox Huntsman Camo', price: 30.00 },
    { image: 'Hunter_red.jpg', title: 'Victorinox Hunter Red', price: 40.00 },
    { image: 'KIT_SOS.jpg', title: 'Kit SOS', price: 50.00 },
    { image: 'NClip.jpg', title: 'Victorinox Nail Clip 580', price: 60.00 },
    // Agrega más productos aquí
  ];

  // Mostrar solo los últimos 6 productos
  const latestProducts = products.slice(-6);

  return (
    <div className="home-container">
      <aside className="menu-container">
        <ul className="list-group">
          <li className="list-group-item">Categoría 1</li>
          <li className="list-group-item">Categoría 2</li>
          <li className="list-group-item">Categoría 3</li>
        </ul>
      </aside>
      {/* Esto es temporal.. según diseño aún no sé si lo dejaré */}

      <main className="products-container">
        <h2>PRODUCTOS MÁS VENDIDOS</h2>
        <div className="products-grid">
          {latestProducts.map((product, index) => (
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

export default Home;