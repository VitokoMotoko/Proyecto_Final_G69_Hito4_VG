import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';
import '../styles/ProductPage.css';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0);
  const [state] = useContext(GlobalContext);
  const { isAuthenticated } = state;

  useEffect(() => {
    let isMounted = true;

    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/products/${id}`);
        const text = await response.text();
        console.log('Respuesta del servidor (producto):', text);
        if (!response.ok) {
          throw new Error('Error al obtener el producto');
        }
        if (text) {
          const data = JSON.parse(text);
          if (isMounted) setProduct(data);
        } else {
          console.error('Respuesta vacía del servidor');
        }
      } catch (error) {
        console.error('Error al obtener el producto:', error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/products/${id}/comments`);
        const text = await response.text();
        console.log('Respuesta del servidor (comentarios):', text);
        if (!response.ok) {
          throw new Error('Error al obtener los comentarios');
        }
        if (text) {
          const data = JSON.parse(text);
          if (isMounted) setComments(data);
        } else {
          console.error('Respuesta vacía del servidor');
        }
      } catch (error) {
        console.error('Error al obtener los comentarios:', error);
      }
    };

    fetchProduct();
    fetchComments();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Debes iniciar sesión para dejar un comentario.');
      return;
    }
  
    if (!newComment.trim() || rating <= 0) {
      alert('Por favor, ingresa un comentario y una calificación válida.');
      return;
    }
  
    try {
      const token = localStorage.getItem('token'); // Obtener el token del localStorage
      const response = await fetch(`http://localhost:4000/api/products/${id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Incluir el token en la solicitud
        },
        body: JSON.stringify({ comentario: newComment, calificacion: rating }),
      });
  
      if (!response.ok) {
        throw new Error('Error al enviar el comentario');
      }
  
      const newCommentData = await response.json();
      setComments([...comments, newCommentData]);
      setNewComment('');
      setRating(0);
    } catch (error) {
      console.error('Error al enviar el comentario:', error);
    }
  };

  return (
    <div className="product-page">
      {product ? (
        <>
          <div className="product-card">
            <h1>{product.nombre}</h1>
            <img src={product.image} alt={product.nombre} className="product-image" />
            <p className="product-description">{product.descripcion}</p>
            <p className="product-price">Precio: ${product.precio}</p>
            <p className="product-stock">Stock: {product.stock}</p>
          </div>

          <div className="comments-card">
            <h2>Comentarios</h2>
            {comments.map(comment => (
              <div key={comment.id_comentario} className="comment">
                <p>{'⭐'.repeat(comment.calificacion)}</p>
                <p>{comment.comentario}</p>
              </div>
            ))}

            {isAuthenticated && (
              <form onSubmit={handleCommentSubmit} className="comment-form">
                <div className="form-group">
                  <label>Calificación:</label>
                  <select value={rating} onChange={(e) => setRating(parseInt(e.target.value))} className="form-control">
                    <option value="0">Selecciona una calificación</option>
                    <option value="1">1 estrella</option>
                    <option value="2">2 estrellas</option>
                    <option value="3">3 estrellas</option>
                    <option value="4">4 estrellas</option>
                    <option value="5">5 estrellas</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Comentario:</label>
                  <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Enviar</button>
              </form>
            )}
          </div>
        </>
      ) : (
        <p>Cargando producto...</p>
      )}
    </div>
  );
};

export default ProductPage;