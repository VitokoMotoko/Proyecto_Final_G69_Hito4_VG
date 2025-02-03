import { useState, useEffect } from 'react';

// Hook personalizado: ejemplo de cómo manejar un estado y un efecto
const useCustomHook = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulación de una llamada a una API
    setTimeout(() => {
      setData("Datos cargados");
    }, 2000);
  }, []);

  return data;
};

export default useCustomHook;