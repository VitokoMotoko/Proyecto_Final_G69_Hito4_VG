import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [, { login }] = useContext(GlobalContext); // Eliminar 'state' si no se usa
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Email o contraseña incorrectos');
      }

      const data = await response.json();
      login(data.user); // Iniciar sesión con los datos del usuario
      navigate('/mi-perfil');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login-container">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;