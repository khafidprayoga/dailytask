const TasksServices = require('../tasks');
const pool = require('@connections');
const NotFoundError = require('@exceptions/NotFoundError');
const TestTasks = require('@helpers/Tasks.js');
const TestUser = require('@helpers/User.js');
const moment = require('moment');

describe('Tasks services', () => {
  it('should have common function', () => {
    expect(TasksServices.createNewTask).toBeInstanceOf(Function);
    expect(TasksServices.verifyTaskAvailability).toBeInstanceOf(Function);
    expect(TasksServices.getDetailTaskById).toBeInstanceOf(Function);
    expect(TasksServices.getAllTasks).toBeInstanceOf(Function);
    expect(TasksServices.deleteTaskById).toBeInstanceOf(Function);
  });
  afterEach(async () => {
    await TestUser.deleteUser({ username: 'gettask' });
  });
  afterAll(async () => {
    await pool.end();
  });

  describe('createNewTasks method', () => {
    it('should create task with date today', async () => {
      const TODAY = moment().format('YYYY-MM-DD HH:mm:ss');

      const { id: userId } = await TestUser.createNewUser({
        username: 'gettask',
      });

      const taskMetadata = {
        title: 'Nonton Anime',
        description: 'Attack On Titan S4 The FInale',
        userId,
      };

      const { id: taskId, createdAt } = await TasksServices.createNewTask(
        taskMetadata
      );

      expect(taskId).toBeDefined();
      expect(createdAt).toEqual(TODAY);
      await TestTasks.deleteTask(taskId); // return true if tasks deleted successfully
    });
    it('should insert task correctly', async () => {
      const { id: userId } = await TestUser.createNewUser({
        username: 'gettask',
      });

      const taskMetadata = {
        title: 'Nonton Anime',
        description: 'Attack On Titan S4 The FInale',
        userId,
      };

      const { id: taskId } = await TasksServices.createNewTask(taskMetadata);

      const isDeleted = await TestTasks.deleteTask(taskId); // return true if tasks deleted successfully
      expect(isDeleted).toBe(true);
    });
  });

  describe('verifyTaskAvailability method', () => {
    it('should throw notfound error when task does not exist', async () => {
      const { id: userId } = await TestUser.createNewUser({
        username: 'gettask',
      });

      const taskMetadata = {
        title: 'Nonton Anime',
        description: 'Attack On Titan S4 The FInale',
        author: userId,
      };

      const taskId = await TestTasks.insertTask(taskMetadata);
      await TestTasks.deleteTask(taskId);

      await expect(
        TasksServices.verifyTaskAvailability(taskId)
      ).rejects.toThrow(NotFoundError);
    });

    it('should not thrown error when tasks exist', async () => {
      const { id: userId } = await TestUser.createNewUser({
        username: 'gettask',
      });

      const taskMetadata = {
        title: 'Nonton Anime',
        description: 'Attack On Titan S4 The FInale',
        author: userId,
      };

      const taskId = await TestTasks.insertTask(taskMetadata);

      await expect(
        TasksServices.verifyTaskAvailability(taskId)
      ).resolves.not.toThrow(NotFoundError);
    });
  });

  describe('getDetailTaskById method', () => {
    it('should show task details', async () => {
      const { id: userId } = await TestUser.createNewUser({
        username: 'gettask',
      });

      const taskId = await TestTasks.insertTask({
        title: 'A',
        description: 'B',
        author: userId,
      });

      const { title, description, author, createdAt } =
        await TasksServices.getDetailTaskById(taskId);

      expect(title).toEqual('A');
      expect(description).toEqual('B');
      expect(author).toEqual('gettask');
      expect(createdAt).toBeDefined();
    });
  });

  describe('getAllTasks method', () => {
    it('should return all tasks data expected (3)', async () => {
      const { id: userId } = await TestUser.createNewUser({
        username: 'gettask',
      });

      // Mock from test helpers
      await TestTasks.insertTask({ author: userId });
      await TestTasks.insertTask({ author: userId });
      await TestTasks.insertTask({ author: userId });

      await expect(TasksServices.getAllTasks(userId)).resolves.toHaveLength(3);
    });
  });

  describe('deleteTaskById method', () => {
    it('should delete task successfully', async () => {
      const { id: userId } = await TestUser.createNewUser({
        username: 'gettask',
      });

      // Mock from test helpers
      const taskId = await TestTasks.insertTask({ author: userId });

      await TasksServices.deleteTaskById(taskId);

      expect(TestTasks.deleteTask(taskId)).not.toBe(true);
    });
  });
});
