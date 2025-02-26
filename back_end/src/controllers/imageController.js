const fs = require('fs');
const path = require('path');

const getImages = (req, res) => {
  const imagesDir = path.join(__dirname, '../../front_end/public/images');
  fs.readdir(imagesDir, (err, files) => {
    if (err) {
      console.error('Error al leer el directorio de imágenes:', err);
      return res.status(500).json({ error: 'Error al leer el directorio de imágenes' });
    }
    res.json(files);
  });
};

module.exports = { getImages };