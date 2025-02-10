// front_end/src/Export.js
import React from 'react';

const Export = () => {
  const exportToCSV = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const csvContent = "data:text/csv;charset=utf-8," 
      + users.map(user => Object.values(user).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "users.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div>
      <button onClick={exportToCSV}>Exportar Datos</button>
    </div>
  );
};

export default Export;