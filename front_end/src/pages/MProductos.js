import React, { useState } from 'react';
import '../styles/MProductos.css';

const MProductos = () => {
  const [newProduct, setNewProduct] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: 100,
    image: '',
    fecha_creacion: new Date().toISOString().split('T')[0] // Fecha actual por defecto
  });

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
      setNewProduct({ nombre: '', descripcion: '', precio: '', stock: 100, image: '', fecha_creacion: new Date().toISOString().split('T')[0] });
    } else {
      console.error('Error al agregar producto:', response.statusText);
    }
  };

  return (
    <div className="mproductos-container">
      <h1>Crear Producto</h1>
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
        <div className="form-group">
          <label htmlFor="fecha_creacion">Fecha de Creación</label>
          <input
            type="date"
            id="fecha_creacion"
            name="fecha_creacion"
            className="form-control"
            value={newProduct.fecha_creacion}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Agregar Producto</button>
      </form>
    </div>
  );
};

export default MProductos;