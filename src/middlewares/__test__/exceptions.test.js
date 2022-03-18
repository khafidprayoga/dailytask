const app = require('@app');
const request = require('supertest');

describe('exceptions middleware ', () => {
  it('should throw clientError', async () => {
    const response = await request(app).post('/register').send({});

    const { status } = response.body;

    expect(response.statusCode).toEqual(400);
    expect(status).toEqual('failed');
    expect(response.clientError).toBe(true);
  });
});
