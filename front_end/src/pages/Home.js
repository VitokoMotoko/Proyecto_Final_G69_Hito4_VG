import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import '../styles/Home.css';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('recientes');
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      let url = 'http://localhost:4000/api/products/recent';
      if (selectedCategory === 'vendidos') {
        url = 'http://localhost:4000/api/products/best-selling';
      } else if (selectedCategory === 'valorados') {
        url = 'http://localhost:4000/api/products/top-rated';
      }

      try {
        console.log('Realizando solicitud a:', url);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        console.log('Datos recibidos:', data);
        setProducts(data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
        setError(error.message);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

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
        {error ? (
          <div className="error-message">Error: {error}</div>
        ) : !Array.isArray(products) || products.length === 0 ? (
          <div className="no-products-message">No se encontraron productos.</div>
        ) : (
          <div className="products-grid">
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
        )}
      </main>
    </div>
  );
};

export default Home;