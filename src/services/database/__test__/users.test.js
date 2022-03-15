const usersServices = require('../users/');
const pool = require('@connections');
const { testUser } = require('@helpers/User.js');
const InvariantError = require('@exceptions/InvariantError');
const AuthenticationError = require('@exceptions/AuthenticationError');
const { passwordManager } = require('@utils/bcrypt');

describe('usersService database', () => {
  const services = new usersServices();
  const bodyRequest = {
    firstName: 'Khafid',
    lastName: 'Prayoga',
    username: 'khafidprayoga',
    password: 'supersecret',
    birthDate: '2005-01-11',
  };

  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    // Clean table
    await testUser.deleteUser({ username: bodyRequest.username });
  });

  it('should have common function method', () => {
    expect(services.addUser).toBeInstanceOf(Function);
    expect(services._verifyUsername).toBeInstanceOf(Function);
    expect(services.verifyCredentials).toBeInstanceOf(Function);
  });

  describe('_verifyUsername method', () => {
    it('should throw new InvariantError when username exist', async () => {
      // Insert users to table using test helper
      await testUser.createNewUser(bodyRequest);

      await expect(
        services._verifyUsername(bodyRequest.username)
      ).rejects.toThrow(InvariantError);
    });

    it('should not error when username available', async () => {
      await expect(
        services._verifyUsername(bodyRequest.username)
      ).resolves.not.toThrow(InvariantError);
    });
  });

  describe('addUser method', () => {
    it('should add user correctly', async () => {
      const userId = await services.addUser(bodyRequest);

      expect(userId).toBeDefined();
    });
  });

  describe('verifyCredentials method', () => {
    it('should throw Authentication when username wrong', async () => {
      // expect actual username that does not exist on DB
      await expect(
        services.verifyCredentials('johndoeeeeeeee', 'error')
      ).rejects.toThrow(AuthenticationError);
    });
    it('should throw Authentication when password wrong', async () => {
      const userData = {
        username: 'khafidprayoga12',
        password: 'supersecret',
      };
      const hashedPassword = await passwordManager.encode(userData.password);
      testUser.createNewUser({
        username: userData.username,
        password: hashedPassword,
      });

      await expect(
        services.verifyCredentials(userData.username, 'secretopassword')
      ).rejects.toThrow(AuthenticationError);

      await testUser.deleteUser({ username: userData.username });
    });
    it('should return user id if user credentials match', async () => {
      const userData = {
        username: 'khafidganteng123',
        password: 'sadboy',
      };
      const hashedPassword = await passwordManager.encode(userData.password);

      const tableHelpers = await testUser.createNewUser({
        username: userData.username,
        password: hashedPassword,
      });

      const credentials = await services.verifyCredentials(
        userData.username,
        userData.password
      );

      expect(credentials).toEqual(tableHelpers.id);
      // clean table
      testUser.deleteUser({ username: userData.username });
    });
  });
});
