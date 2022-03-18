const app = require('@app');
const request = require('supertest');
const TestUser = require('@helpers/User.js');
const connections = require('@connections');
const TestTasks = require('../../__test__/Tasks');

describe('Register endpoint each http verb controllers test', () => {
  const credentials = {
    firstName: 'Khafid',
    lastName: 'Prayoga',
    username: 'inserttask',
    password: 'secretpass',
    birthDate: '2000-01-01',
  };

  const credentials_others = {
    firstName: 'Khafid',
    lastName: 'Prayoga',
    username: 'othersinserter',
    password: 'secretpass',
    birthDate: '2000-01-01',
  };

  let userId;
  let refreshToken;
  let userId_others;
  let refreshToken_others;

  beforeAll(async () => {
    const registerReponse = await request(app)
      .post('/register')
      .send(credentials);

    const loginResponse = await request(app).post('/login').send({
      username: credentials.username,
      password: credentials.password,
    });

    refreshToken = loginResponse.body.data.refreshToken;
    userId = registerReponse.body.data.userId;

    const registerReponse_others = await request(app)
      .post('/register')
      .send(credentials_others);

    const loginResponse_others = await request(app).post('/login').send({
      username: credentials_others.username,
      password: credentials_others.password,
    });

    refreshToken_others = loginResponse_others.body.data.refreshToken;
    userId_others = registerReponse_others.body.data.userId;
  });

  afterAll(async () => {
    await TestUser.deleteUser({ username: credentials.username });
    await TestUser.deleteUser({ username: credentials_others.username });
    await connections.end();
  });

  describe('POST handler', () => {
    it('should success insert data and return task data', async () => {
      const renewToken = await request(app)
        .put('/login')
        .send({ refreshToken });

      const { accessToken } = renewToken.body.data;
      const requestBody = {
        title: 'Belajar Ngoding',
        description: 'Express.js and Node.js',
      };

      const taskResponse = await request(app)
        .post('/task')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(requestBody);

      const { status, data } = taskResponse.body;

      expect(status).toEqual('success');
      expect(data.id).toBeDefined();

      //   Clean data on table
      const isDeleted = await TestTasks.deleteTask(data.id);
      expect(isDeleted).toBe(true);
    });
  });
  describe('GET handler', () => {
    it('should blocked to get details task because not owner', async () => {
      const renewToken = await request(app)
        .put('/login')
        .send({ refreshToken });

      const { accessToken } = renewToken.body.data;

      const requestBody = {
        title: 'Belajar Ngoding',
        description: 'Express.js and Node.js',
      };

      // insert task USER 1
      const taskResponse = await request(app)
        .post('/task')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(requestBody);

      const taskId = taskResponse.body.data.id;

      const getDetails = await request(app)
        .get(`/task/${taskId}`)
        .set('Authorization', `Bearer ${accessToken}`);

      // GET DETAILS ON USER OTHERS
      const renewToken_others = await request(app)
        .put('/login')
        .send({ refreshToken: refreshToken_others });
      const accessToken_others = renewToken_others.body.data.accessToken;

      const getDetails_others = await request(app)
        .get(`/task/${taskId}`) /// taskId from users 1
        .set('Authorization', `Bearer ${accessToken_others}`);
      const { status, message } = getDetails_others.body;

      expect(getDetails_others.statusCode).toEqual(403);
      expect(status).toEqual('failed');
      expect(message).toEqual('Not allowed to access this resource');

      //   Clean data on table
      await TestTasks.deleteTask(taskId);
    });

    it('should get task details', async () => {
      const renewToken = await request(app)
        .put('/login')
        .send({ refreshToken });

      const { accessToken } = renewToken.body.data;
      const requestBody = {
        title: 'Belajar Ngoding',
        description: 'Express.js and Node.js',
      };
      // insert task
      const taskResponse = await request(app)
        .post('/task')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(requestBody);

      const { id: taskId } = taskResponse.body.data;
      expect(taskId).toBeDefined();

      const getDetails = await request(app)
        .get(`/task/${taskId}`)
        .set('Authorization', `Bearer ${accessToken}`);

      const { title, description, author, createdAt } = getDetails.body.data;

      expect(title).toEqual(requestBody.title);
      expect(description).toEqual(requestBody.description);
      expect(author).toBeDefined();
      expect(createdAt).toBeDefined();

      //   Clean data on table
      const isDeleted = await TestTasks.deleteTask(taskId);
      expect(isDeleted).toBe(true);
    });
  });
  describe('DELETE handler', () => {
    it('should delete task false (403) because not task owner', async () => {
      const renewToken = await request(app)
        .put('/login')
        .send({ refreshToken });

      const { accessToken } = renewToken.body.data;
      const requestBody = {
        title: 'Belajar Ngoding',
        description: 'Express.js and Node.js',
      };

      // insert task for user 1
      const taskResponse = await request(app)
        .post('/task')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(requestBody);

      // task for user 1
      const { id: taskId } = taskResponse.body.data;

      //   user 2 try to delete  task
      const renewToken2 = await request(app)
        .put('/login')
        .send({ refreshToken: refreshToken_others });

      const accessToken2 = renewToken2.body.data.accessToken;

      const deleteResponse = await request(app)
        .delete(`/task/${taskId}`)
        .set('Authorization', `Bearer ${accessToken2}`);

      expect(deleteResponse.statusCode).toEqual(403);
    });

    it('should delete task correctly', async () => {
      const renewToken = await request(app)
        .put('/login')
        .send({ refreshToken });

      const { accessToken } = renewToken.body.data;
      const requestBody = {
        title: 'Belajar Ngoding',
        description: 'Express.js and Node.js',
      };

      // insert task
      const taskResponse = await request(app)
        .post('/task')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(requestBody);

      const { id: taskId } = taskResponse.body.data;
      expect(taskId).toBeDefined();

      const deleteResponse = await request(app)
        .delete(`/task/${taskId}`)
        .set('Authorization', `Bearer ${accessToken}`);
      const { status, message } = deleteResponse.body;

      expect(status).toEqual('success');
      expect(message).toBeDefined();
    });
  });
});
