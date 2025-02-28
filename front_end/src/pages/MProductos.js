import React, { useState, useEffect } from 'react';
import '../styles/MProductos.css';

const MProductos = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: 100,
    image: ''
  });

  useEffect(() => {
    fetch('http://localhost:4000/api/products')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    const response = await fetch('http://localhost:4000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(newProduct),
    });

    if (response.ok) {
      const product = await response.json();
      setProducts([...products, product]);
      setNewProduct({ nombre: '', descripcion: '', precio: '', stock: 100, image: '' });
    } else {
      console.error('Error al agregar producto:', response.statusText);
    }
  };

  const handleDeleteProduct = async (id) => {
    const token = localStorage.getItem('token');

    const response = await fetch(`http://localhost:4000/api/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      setProducts(products.filter(product => product.id_producto !== id));
    } else {
      console.error('Error al eliminar producto:', response.statusText);
    }
  };

  return (
    <div className="mproductos-container">
      <h1>Administrar Productos</h1>
      <form onSubmit={handleAddProduct} className="add-product-form">
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            className="form-control"
            value={newProduct.nombre}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            className="form-control"
            value={newProduct.descripcion}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="precio">Precio</label>
          <input
            type="number"
            id="precio"
            name="precio"
            className="form-control"
            value={newProduct.precio}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            id="stock"
            name="stock"
            className="form-control"
            value={newProduct.stock}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">URL de la Imagen</label>
          <input
            type="text"
            id="image"
            name="image"
            className="form-control"
            value={newProduct.image}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Agregar Producto</button>
      </form>
      <div className="product-list">
        {products.map(product => (
          <div key={product.id_producto} className="product-item">
            <p><strong>{product.nombre}</strong></p>
            <p>{product.descripcion}</p>
            <p>Precio: ${product.precio}</p>
            <img src={product.image} alt={product.nombre} />
            <button className="btn btn-danger" onClick={() => handleDeleteProduct(product.id_producto)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MProductos;