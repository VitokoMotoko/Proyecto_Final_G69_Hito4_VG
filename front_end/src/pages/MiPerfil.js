import React, { useContext, useState, useEffect } from 'react';
import '../styles/MiPerfil.css';
import { GlobalContext } from '../context/GlobalState';

const MiPerfil = () => {
    const [state] = useContext(GlobalContext);
    const { user } = state;
    const [activeSection, setActiveSection] = useState('datos');
    const [compras, setCompras] = useState([]);
    const [additionalData, setAdditionalData] = useState({ direccion: '', telefono: '' });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (user) {
          fetch(`http://localhost:4000/api/users/${user.id}/compras`)
            .then(response => response.json())
            .then(data => setCompras(data))
            .catch(error => console.error('Error al obtener compras:', error));
      
          fetch(`http://localhost:4000/api/users/${user.id}/details`)
            .then(response => {
              if (!response.ok) {
                throw new Error('Error al obtener detalles del usuario');
              }
              return response.json();
            })
            .then(data => {
              if (data) {
                setAdditionalData({ direccion: data.direccion, telefono: data.telefono });
              }
            })
            .catch(error => console.error('Error al obtener detalles del usuario:', error));
        }
      }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAdditionalData({ ...additionalData, [name]: value });
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/users/${user.id}/details`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(additionalData),
            });

            if (response.ok) {
                alert('Datos guardados exitosamente');
                setIsEditing(false);
            } else {
                alert('Error al guardar los datos');
            }
        } catch (error) {
            console.error('Error al guardar los datos:', error);
        }
    };

    // Función para formatear la fecha
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('es-CL', options);
    };

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
                        <p><strong>Fecha de Nacimiento:</strong> {formatDate(user.fechanacimiento)}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Fecha de Creación:</strong> {formatDate(user.fecha_creacion)}</p>
                        <h2>Datos Adicionales</h2>
                        <div className="form-group">
                            <label htmlFor="direccion">Dirección de Envío</label>
                            <input
                                type="text"
                                id="direccion"
                                name="direccion"
                                className="form-control"
                                value={additionalData.direccion}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="telefono">Teléfono</label>
                            <input
                                type="text"
                                id="telefono"
                                name="telefono"
                                className="form-control"
                                value={additionalData.telefono}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                        </div>
                        {isEditing ? (
                            <button className="btn btn-primary" onClick={handleSave}>Guardar</button>
                        ) : (
                            <button className="btn btn-secondary" onClick={() => setIsEditing(true)}>Editar</button>
                        )}
                    </div>
                )}
                {activeSection === 'compras' && (
                    <div className="profile-section">
                        <h2>Mis Compras</h2>
                        {compras.length === 0 ? (
                            <p>No has realizado ninguna compra.</p>
                        ) : (
                            <ul>
                                {compras.map(compra => (
                                    <li key={compra.id_transaccion}>
                                        <p><strong>Fecha:</strong> {new Date(compra.fecha_transaccion).toLocaleDateString()}</p>
                                        <p><strong>Total:</strong> ${compra.total}</p>
                                        <p><strong>Productos:</strong></p>
                                        <ul>
                                            {compra.productos.map(producto => (
                                                <li key={producto.id_producto}>
                                                    {producto.nombre} - ${producto.precio_unitario} x {producto.cantidad}
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        )}
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