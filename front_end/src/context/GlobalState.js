import React, { createContext, useState } from 'react';

// Crear el contexto global
export const GlobalContext = createContext();

// Componente GlobalState: maneja el estado global de la aplicación
const GlobalState = ({ children }) => {
  const [state, setState] = useState({
    isAuthenticated: false,
    user: null,
    cart: [],
    // Define tu estado global aquí
  });

  const login = (user) => {
    setState({
      ...state,
      isAuthenticated: true,
      user
    });
  };

  const logout = () => {
    setState({
      ...state,
      isAuthenticated: false,
      user: null
    });
  };

  const addToCart = (product) => {
    const existingProduct = state.cart.find(item => item.title === product.title);
    if (existingProduct) {
      setState({
        ...state,
        cart: state.cart.map(item =>
          item.title === product.title ? { ...item, quantity: item.quantity + 1 } : item
        )
      });
    } else {
      setState({
        ...state,
        cart: [...state.cart, { ...product, quantity: 1 }]
      });
    }
  };

  const updateCartQuantity = (title, quantity) => {
    setState({
      ...state,
      cart: state.cart.map(item =>
        item.title === title ? { ...item, quantity } : item
      )
    });
  };

  const removeFromCart = (title) => {
    setState({
      ...state,
      cart: state.cart.filter(item => item.title !== title)
    });
  };

  return (
    <GlobalContext.Provider value={[state, { login, logout, addToCart, updateCartQuantity, removeFromCart }]}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;