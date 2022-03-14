const app = require('@app');
const request = require('supertest');
const { testUser } = require('@helpers/User.js');
const pool = require('@connections');
const usersService = require('@services/database/users');
const users = new usersService();
const { TestAuthentications } = require('@helpers/Authentications');

describe('Login endpoint each http verb test', () => {
  afterAll(async () => {
    await pool.end();
  });

  describe('POST handler', () => {
    const userData = {
      firstName: 'Jane',
      lastName: 'Doe',
      username: 'janedoe',
      password: 'supersecret',
      birthDate: '2000-01-20',
    };

    afterEach(async () => {
      await testUser.deleteUser({ username: userData.username });
    });
    it('should create sesion token  if username and password matched', async () => {
      await users.addUser(userData);
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
      await users.addUser(userData);
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
      await testUser.deleteUser({ username: userData.username });
    });
    it('should create new sesion token if refreshToken valid', async () => {
      await users.addUser(userData);
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
      await users.addUser(userData);
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
});
