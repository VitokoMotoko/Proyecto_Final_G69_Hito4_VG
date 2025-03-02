import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import '../styles/Home.css'; // Asegúrate de que los estilos de Home.css se apliquen aquí también

const Productos = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      let url = 'http://localhost:4000/api/products';
      if (selectedCategory === 'recientes') {
        url = 'http://localhost:4000/api/products/recent';
      } else if (selectedCategory === 'vendidos') {
        url = 'http://localhost:4000/api/products/best-selling';
      } else if (selectedCategory === 'valorados') {
        url = 'http://localhost:4000/api/products/top-rated';
      }

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
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
        return 'Todos los Productos';
    }
  };

  return (
    <div className="home-container">
      <aside className="menu-container">
        <ul className="list-group">
          <li className={`list-group-item ${selectedCategory === 'todos' ? 'active' : ''}`} onClick={() => setSelectedCategory('todos')}>Todos los Productos</li>
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

export default Productos;