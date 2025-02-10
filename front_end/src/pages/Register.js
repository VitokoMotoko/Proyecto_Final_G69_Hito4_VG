import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    nickname: '',
    fechaNacimiento: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const registerUser = async (userData) => {
    try {
      const response = await fetch('http://localhost:4000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrors(errorData);
        return;
      }

      const data = await response.json();
      console.log('Usuario registrado:', data);
      setErrors({});
      
      // Mostrar mensaje de éxito y redirigir al home
      alert('Cuenta creada exitosamente');
      navigate('/');
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData);
  };

  return (
    <div className="register-container">
      <h1>Registrarse</h1>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            className="form-control"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="apellido">Apellido</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            className="form-control"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="nickname">Nickname</label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            className="form-control"
            value={formData.nickname}
            onChange={handleChange}
            required
          />
          {errors.nickname && <p className="error">{errors.nickname}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
          <input
            type="date"
            id="fechaNacimiento"
            name="fechaNacimiento"
            className="form-control"
            value={formData.fechaNacimiento}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;