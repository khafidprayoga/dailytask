const app = require('@app');
const request = require('supertest');
const TestUser = require('@helpers/User.js');
const pool = require('@connections');
const UsersServices = require('@services/database/users');
const TestAuthentications = require('@helpers/Authentications');

describe('Login endpoint each http verb test', () => {
  afterAll(async () => {
    await pool.end();
  });

  describe('POST handler', () => {
    const userData = {
      firstName: 'Jane',
      lastName: 'Doe',
      username: 'janedoe123',
      password: 'supersecret',
      birthDate: '2000-01-20',
    };

    afterEach(async () => {
      await TestUser.deleteUser({ username: userData.username });
    });
    it('should create sesion token  if username and password matched', async () => {
      await UsersServices.addUser(userData);
      const response = await request(app)
        .post('/login')
        .send({ username: userData.username, password: userData.password });

      const { status, message, data } = response.body;

      expect(response.statusCode).toEqual(201);
      expect(status).toEqual('success');
      expect(message).toBeDefined();
      expect(data.accessToken).toBeDefined();
      expect(data.refreshToken).toBeDefined();
    });

    it('should throw authentication error (401) if username and password not matched ', async () => {
      await UsersServices.addUser(userData);

      const response = await request(app)
        .post('/login')
        .send({ username: userData.username, password: 'somerrorpw' });

      const { status } = response.body;
      expect(status).toEqual('failed');
      expect(response.statusCode).toEqual(401);
    });
  });
  describe('PUT handler', () => {
    const userData = {
      firstName: 'Jane',
      lastName: 'Doe',
      username: 'janedoe',
      password: 'supersecret',
      birthDate: '2000-01-20',
    };

    afterEach(async () => {
      await TestUser.deleteUser({ username: userData.username });
    });
    it('should create new sesion token if refreshToken valid', async () => {
      await UsersServices.addUser(userData);
      const postResponse = await request(app)
        .post('/login')
        .send({ username: userData.username, password: userData.password });

      const { refreshToken } = postResponse.body.data;
      const putResponse = await request(app)
        .put('/login')
        .send({ refreshToken });

      const { status, message, data } = putResponse.body;

      expect(status).toEqual('success');
      expect(message).toBeDefined();
      expect(data.accessToken).toBeDefined();
    });

    it('should throw invarianterror (400) if refreshToken not exist on DB', async () => {
      await UsersServices.addUser(userData);
      const postResponse = await request(app)
        .post('/login')
        .send({ username: userData.username, password: userData.password });

      const { refreshToken } = postResponse.body.data;
      await TestAuthentications.deleteToken(refreshToken);

      const putResponse = await request(app)
        .put('/login')
        .send({ refreshToken });
      const { status, message } = putResponse.body;

      expect(putResponse.statusCode).toEqual(400);
      expect(status).toEqual('failed');
      expect(message).toEqual('Refresh Token invalid!');
    });
  });
  describe('DELETE handler', () => {
    const userData = {
      firstName: 'Jane',
      lastName: 'Doe',
      username: 'janedoe',
      password: 'supersecret',
      birthDate: '2000-01-20',
    };

    afterEach(async () => {
      await TestUser.deleteUser({ username: userData.username });
    });

    it('should delete session token if refreshToken valid and exist', async () => {
      await UsersServices.addUser(userData);
      const postResponse = await request(app)
        .post('/login')
        .send({ username: userData.username, password: userData.password });

      const { refreshToken } = postResponse.body.data;
      const deleteResponse = await request(app)
        .delete('/login')
        .send({ refreshToken });

      const { status, message } = deleteResponse.body;

      expect(deleteResponse.statusCode).toEqual(200);
      expect(status).toEqual('success');
      expect(message).toEqual('Session token destroyed');
    });

    it('should throw invarianterror (400) if refreshToken not exist on DB', async () => {
      await UsersServices.addUser(userData);
      const postResponse = await request(app)
        .post('/login')
        .send({ username: userData.username, password: userData.password });

      const { refreshToken } = postResponse.body.data;
      await TestAuthentications.deleteToken(refreshToken);

      const deleteResponse = await request(app)
        .delete('/login')
        .send({ refreshToken });
      const { status, message } = deleteResponse.body;

      expect(deleteResponse.statusCode).toEqual(400);
      expect(status).toEqual('failed');
      expect(message).toEqual('Refresh Token invalid!');
    });
  });
});
