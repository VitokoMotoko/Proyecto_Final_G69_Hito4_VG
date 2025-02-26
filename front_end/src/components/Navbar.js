import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import { GlobalContext } from '../context/GlobalState';


const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [state, { logout }] = useContext(GlobalContext);
  const { isAuthenticated, user, cart } = state;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
      <Link className="navbar-brand ml-auto" to="/">
  <img src="/images/LOGO.png" alt="Mi Logo" style={{ height: '15px' }} />
</Link>        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            {location.pathname !== '/' && (
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
            )}
            {location.pathname !== '/productos' && (
              <li className="nav-item">
                <Link className="nav-link" to="/productos">Productos</Link>
              </li>
            )}
            {isAuthenticated && user.role === 'admin' ? (
              <>
                {location.pathname !== '/admin/productos' && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin/productos">Crear Productos</Link>
                  </li>
                )}
              </>
            ) : (
              <>
                {location.pathname !== '/quienes-somos' && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/quienes-somos">Quienes Somos</Link>
                  </li>
                )}
                {location.pathname !== '/contacto' && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/contacto">Contacto</Link>
                  </li>
                )}
                {location.pathname !== '/carrito' && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/carrito">Carrito ({cart.length})</Link>
                  </li>
                )}
              </>
            )}
          </ul>
          <form className="form-inline my-2 my-lg-0 mx-3">
            <input className="form-control mr-sm-2" type="search" placeholder="Buscar" aria-label="Buscar" />
          </form>
          <ul className="navbar-nav ml-auto">
            {!isAuthenticated ? (
              <>
                <li className="nav-item d-none d-lg-block">
                  <Link className="btn btn-light mx-1" to="/login">Iniciar Sesión</Link>
                </li>
                <li className="nav-item d-none d-lg-block">
                  <Link className="btn btn-light mx-1" to="/register">Registrarse</Link>
                </li>
                <li className="nav-item d-lg-none">
                  <Link className="nav-link" to="/login">Iniciar Sesión</Link>
                </li>
                <li className="nav-item d-lg-none">
                  <Link className="nav-link" to="/register">Registrarse</Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button className="btn btn-light mx-1" onClick={handleLogout}>Cerrar Sesión</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;