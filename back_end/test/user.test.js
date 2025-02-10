const request = require('supertest');
const app = require('../src/app');
const pool = require('../src/db');
const faker = require('faker');

beforeEach(async () => {
  await pool.query('DELETE FROM users');
});

describe('Pruebas de la API REST', () => {
  it('Debería registrar un nuevo usuario', async () => {
    const email = faker.internet.email();
    const nickname = faker.internet.userName();

    const res = await request(app)
      .post('/api/users/register')
      .send({
        nombre: faker.name.firstName(),
        apellido: faker.name.lastName(),
        nickname: nickname,
        fechaNacimiento: '2000-01-01',
        email: email,
        password: 'password123'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
  });

  it('Debería rechazar el registro si el email ya existe', async () => {
    const email = faker.internet.email();
    const nickname = faker.internet.userName();

    // Registrar un usuario con el mismo email
    await request(app)
      .post('/api/users/register')
      .send({
        nombre: faker.name.firstName(),
        apellido: faker.name.lastName(),
        nickname: nickname,
        fechaNacimiento: '2000-01-01',
        email: email,
        password: 'password123'
      });

    const res = await request(app)
      .post('/api/users/register')
      .send({
        nombre: faker.name.firstName(),
        apellido: faker.name.lastName(),
        nickname: faker.internet.userName(),
        fechaNacimiento: '2000-01-01',
        email: email, // Mismo email
        password: 'password123'
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('email', 'El email ya está en uso');
  });

  it('Debería rechazar el registro si el nickname ya existe', async () => {
    const email = faker.internet.email();
    const nickname = faker.internet.userName();

    // Registrar un usuario con el mismo nickname
    await request(app)
      .post('/api/users/register')
      .send({
        nombre: faker.name.firstName(),
        apellido: faker.name.lastName(),
        nickname: nickname,
        fechaNacimiento: '2000-01-01',
        email: email,
        password: 'password123'
      });

    const res = await request(app)
      .post('/api/users/register')
      .send({
        nombre: faker.name.firstName(),
        apellido: faker.name.lastName(),
        nickname: nickname, // Mismo nickname
        fechaNacimiento: '2000-01-01',
        email: faker.internet.email(),
        password: 'password123'
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('nickname', 'El nickname ya está en uso');
  });

  it('Debería iniciar sesión con credenciales correctas', async () => {
    const email = faker.internet.email();
    const nickname = faker.internet.userName();

    // Registrar un usuario
    await request(app)
      .post('/api/users/register')
      .send({
        nombre: faker.name.firstName(),
        apellido: faker.name.lastName(),
        nickname: nickname,
        fechaNacimiento: '2000-01-01',
        email: email,
        password: 'password123'
      });

    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: email,
        password: 'password123'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('Debería rechazar el inicio de sesión con credenciales incorrectas', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: 'nonexistent@example.com',
        password: 'wrongpassword'
      });
    expect(res.statusCode).toEqual(401);
  });
});