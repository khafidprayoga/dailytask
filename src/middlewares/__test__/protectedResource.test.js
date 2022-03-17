const app = require('@app');
const request = require('supertest');
const TokenManager = require('@utils/jwt/');

describe('protectedResource middleware ', () => {
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
    const accessToken = await TokenManager.generateAccessToken({ id: 999 });

    const response = await request(app)
      .get('/task')
      .set({ Authorization: `Bearer ${accessToken}` });

    expect(response.statusCode).not.toEqual(401);
    expect(response.statusCode).not.toEqual(500);
    expect(response.statusCode).toEqual(200);
  });
});
