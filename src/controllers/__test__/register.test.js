const app = require('@app');
const request = require('supertest');
const { testUser } = require('@helpers/User.js');
const connections = require('@connections');

describe('Register endpoint each http verb controllers test', () => {
  afterAll(async () => {
    await connections.end();
  });

  describe('POST handler', () => {
    afterEach(async () => {
      await testUser.deleteUser({ username: 'nikolatesla' });
    });

    it('should return userId, if user data succees inserted', async () => {
      const requestBody = {
        firstName: 'Thomas',
        lastName: 'Alva',
        username: 'nikolatesla',
        password: 'research',
        birthDate: '2003-02-28',
      };
      const response = await request(app).post('/register').send(requestBody);

      const { data } = response.body;
      expect(data.userId).toBeDefined();
    });
  });
});
