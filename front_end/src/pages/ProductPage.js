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
    fetch(`http://localhost:4000/api/products/${id}`)
      .then(response => response.json())
      .then(data => {
        if (isMounted) setProduct(data);
      });

    fetch(`http://localhost:4000/api/products/${id}/comments`)
      .then(response => response.json())
      .then(data => {
        if (isMounted) setComments(data);
      });

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

    const response = await fetch(`http://localhost:4000/api/products/${id}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comentario: newComment, calificacion: rating }),
    });

    if (response.ok) {
      const newComment = await response.json();
      setComments([...comments, newComment]);
      setNewComment('');
      setRating(0);
    }
  };

  return (
    <div className="product-page">
      {product && (
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
                <select value={rating} onChange={(e) => setRating(e.target.value)}>
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
      )}
    </div>
  );
};

export default ProductPage;