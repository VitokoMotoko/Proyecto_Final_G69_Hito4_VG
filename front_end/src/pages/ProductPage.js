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
        console.log('Respuesta del servidor (producto):', text); // Agrega esta línea para depuración
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
        console.log('Respuesta del servidor (comentarios):', text); // Agrega esta línea para depuración
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
      const response = await fetch(`http://localhost:4000/api/products/${id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
          <h1>{product.nombre}</h1>
          <img src={`/images/${product.image}`} alt={product.nombre} />
          <p>{product.descripcion}</p>
          <p>Precio: ${product.precio}</p>
          <p>Stock: {product.stock}</p>

          <h2>Comentarios</h2>
          {comments.map(comment => (
            <div key={comment.id_comentario} className="comment">
              <p>{'⭐'.repeat(comment.calificacion)}</p>
              <p>{comment.comentario}</p>
            </div>
          ))}

          {isAuthenticated && (
            <form onSubmit={handleCommentSubmit}>
              <div>
                <label>Calificación:</label>
                <select value={rating} onChange={(e) => setRating(parseInt(e.target.value))}>
                  <option value="0">Selecciona una calificación</option>
                  <option value="1">1 estrella</option>
                  <option value="2">2 estrellas</option>
                  <option value="3">3 estrellas</option>
                  <option value="4">4 estrellas</option>
                  <option value="5">5 estrellas</option>
                </select>
              </div>
              <div>
                <label>Comentario:</label>
                <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} />
              </div>
              <button type="submit">Enviar</button>
            </form>
          )}
        </>
      ) : (
        <p>Cargando producto...</p>
      )}
    </div>
  );
};

export default ProductPage;