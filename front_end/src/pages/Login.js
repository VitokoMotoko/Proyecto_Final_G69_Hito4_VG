import React, { useState, useContext } from 'react';
import '../styles/Login.css';
import { getUserByEmailAndPassword } from '../BD_Temporal';
import { GlobalContext } from '../context/GlobalState';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [state, { login }] = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = getUserByEmailAndPassword(email, password);

    if (user) {
      login(user);
      alert('Inicio de sesión exitoso');
      navigate('/mi-perfil');
    } else {
      alert('Email o contraseña incorrectos');
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
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;