import React, { useContext, useState } from 'react';
import '../styles/MiPerfil.css';
import { GlobalContext } from '../context/GlobalState';

const MiPerfil = () => {
  const [state] = useContext(GlobalContext);
  const { user } = state;
  const [activeSection, setActiveSection] = useState('datos');

  return (
    <div className="mi-perfil-container">
      <aside className="menu-container">
        <ul className="list-group">
          <li className={`list-group-item ${activeSection === 'datos' ? 'active' : ''}`} onClick={() => setActiveSection('datos')}>Mis Datos</li>
          <li className={`list-group-item ${activeSection === 'compras' ? 'active' : ''}`} onClick={() => setActiveSection('compras')}>Mis Compras</li>
          <li className={`list-group-item ${activeSection === 'valoraciones' ? 'active' : ''}`} onClick={() => setActiveSection('valoraciones')}>Mis Valoraciones</li>
        </ul>
      </aside>
      <main className="profile-container">
        <h1>Mi Perfil</h1>
        {activeSection === 'datos' && (
          <div className="profile-section">
            <h2>Mis Datos</h2>
            <p><strong>Nombre:</strong> {user.nombre}</p>
            <p><strong>Apellido:</strong> {user.apellido}</p>
            <p><strong>Nickname:</strong> {user.nickname}</p>
            <p><strong>Fecha de Nacimiento:</strong> {user.fechaNacimiento}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        )}
        {activeSection === 'compras' && (
          <div className="profile-section">
            <h2>Mis Compras</h2>
            {/* Aquí puedes agregar el listado de compras */}
          </div>
        )}
        {activeSection === 'valoraciones' && (
          <div className="profile-section">
            <h2>Mis Valoraciones</h2>
            {/* Aquí puedes agregar el listado de valoraciones */}
          </div>
        )}
      </main>
    </div>
  );
};

export default MiPerfil;