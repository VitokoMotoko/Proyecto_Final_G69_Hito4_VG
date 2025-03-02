import React, { useContext, useState, useEffect } from 'react';
import '../styles/MiPerfil.css';
import { GlobalContext } from '../context/GlobalState';

const MiPerfil = () => {
    const [state] = useContext(GlobalContext);
    const { user } = state;
    const [activeSection, setActiveSection] = useState('datos');
    const [additionalData, setAdditionalData] = useState({ direccion: '', telefono: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (user) {
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

    useEffect(() => {
        if (user && user.role === 'admin') {
            fetch('http://localhost:4000/api/products')
                .then(response => response.json())
                .then(data => setProducts(data))
                .catch(error => console.error('Error al obtener productos:', error));

            fetch('http://localhost:4000/api/users')
                .then(response => response.json())
                .then(data => setUsers(data))
                .catch(error => console.error('Error al obtener usuarios:', error));
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

    const handleRoleChange = async (id, newRole) => {
        const token = localStorage.getItem('token');

        const response = await fetch(`http://localhost:4000/api/users/${id}/role`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ role: newRole })
        });

        if (response.ok) {
            setUsers(users.map(user => user.id === id ? { ...user, role: newRole } : user));
        } else {
            console.error('Error al cambiar rol del usuario:', response.statusText);
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
                    {user.role === 'admin' ? (
                        <>
                            <li className={`list-group-item ${activeSection === 'eliminar-productos' ? 'active' : ''}`} onClick={() => setActiveSection('eliminar-productos')}>Eliminar Productos</li>
                            <li className={`list-group-item ${activeSection === 'administrar-usuarios' ? 'active' : ''}`} onClick={() => setActiveSection('administrar-usuarios')}>Administrar Usuarios</li>
                            <li className={`list-group-item ${activeSection === 'crear-productos' ? 'active' : ''}`} onClick={() => setActiveSection('crear-productos')}>Crear Productos</li>
                        </>
                    ) : (
                        <>
                            <li className={`list-group-item ${activeSection === 'compras' ? 'active' : ''}`} onClick={() => setActiveSection('compras')}>Mis Compras</li>
                            <li className={`list-group-item ${activeSection === 'valoraciones' ? 'active' : ''}`} onClick={() => setActiveSection('valoraciones')}>Mis Valoraciones</li>
                        </>
                    )}
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
                {activeSection === 'eliminar-productos' && (
                    <div className="profile-section">
                        <h2>Eliminar Productos</h2>
                        <div className="products-grid">
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
                )}
                {activeSection === 'administrar-usuarios' && (
                    <div className="profile-section">
                        <h2>Administrar Usuarios</h2>
                        <div className="users-grid">
                            {users.map(user => (
                                <div key={user.id} className="user-item">
                                    <p><strong>{user.nombre} {user.apellido}</strong></p>
                                    <p>Email: {user.email}</p>
                                    <p>Rol: {user.role}</p>
                                    <button className="btn btn-primary" onClick={() => handleRoleChange(user.id, user.role === 'admin' ? 'user' : 'admin')}>
                                        {user.role === 'admin' ? 'Convertir a Usuario' : 'Convertir a Admin'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {activeSection === 'crear-productos' && (
                    <div className="profile-section">
                        <h2>Crear Productos</h2>
                        {/* Aquí puedes reutilizar el formulario de creación de productos */}
                    </div>
                )}
            </main>
        </div>
    );
};

export default MiPerfil;