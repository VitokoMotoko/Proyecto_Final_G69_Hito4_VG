import React from 'react';
import ReactDOM from 'react-dom'; // Asegúrate de importar ReactDOM
import { createRoot } from 'react-dom/client';
import App from './App';
import GlobalState from './context/GlobalState';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

// Crear el root y renderizar la aplicación
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <GlobalState>
    <App />
  </GlobalState>
);