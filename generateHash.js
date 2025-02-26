const bcrypt = require('bcryptjs');

const password = 'sa123';
bcrypt.hash(password, 10, (err, hash) => {
  if (err) throw err;
  console.log('Contraseña encriptada:', hash);
});