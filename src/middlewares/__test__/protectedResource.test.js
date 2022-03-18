const app = require('@app');
const request = require('supertest');
const TokenManager = require('@utils/jwt/');
const TestUser = require('@helpers/User');
const TestTasks = require('@helpers/Tasks');
const pool = require('@connections');

describe('protectedResource middleware ', () => {
  afterAll(async () => {
    await pool.end();
  });
  it('should throw internal server error when header not bearer', async () => {
    const response = await request(app)
      .get('/task')
      .set({ Authorization: 'Basic userandpassword' });

    const { status, message } = response.body;

    expect(response.statusCode).toEqual(500);
    expect(status).toEqual('failed');
    expect(message).toEqual('Server only support Bearer Auth Scheme');
  });
  it('should throw Auth error when header bearer, but token invalid', async () => {
    const accessToken = 'HEADER.PAYLOAD.SCHEMA';

    const response = await request(app)
      .get('/task')
      .set({ Authorization: `Bearer ${accessToken}` });

    const { status, message } = response.body;
    expect(response.statusCode).toEqual(401);
    expect(status).toEqual('failed');
    expect(message).toEqual('JWT token invalid');
  });
  it('should not error when token valid', async () => {
    const { id } = await TestUser.createNewUser({
      username: 'insert',
    });

    const accessToken = await TokenManager.generateAccessToken({ id });
    const taskId = await TestTasks.insertTask({ author: id });

    const response = await request(app)
      .get('/task')
      .set({ Authorization: `Bearer ${accessToken}` });
    const { data } = response.body;

    expect(data.allTask).toBeDefined();
    expect(response.statusCode).toEqual(200);

    // Cleanup
    await TestTasks.deleteTask(taskId);
    await TestUser.deleteUser({ username: 'insert' });
  });
});
