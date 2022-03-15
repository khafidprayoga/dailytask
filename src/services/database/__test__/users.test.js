const UsersServices = require('../users/');
const pool = require('@connections');
const TestUser = require('@helpers/User.js');
const InvariantError = require('@exceptions/InvariantError');
const AuthenticationError = require('@exceptions/AuthenticationError');
const PasswordManager = require('@utils/bcrypt');

describe('UsersService database', () => {
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
    await TestUser.deleteUser({ username: bodyRequest.username });
  });

  it('should have common function method', () => {
    expect(UsersServices.addUser).toBeInstanceOf(Function);
    expect(UsersServices._verifyUsername).toBeInstanceOf(Function);
    expect(UsersServices.verifyCredentials).toBeInstanceOf(Function);
  });

  describe('_verifyUsername method', () => {
    it('should throw new InvariantError when username exist', async () => {
      // Insert users to table using test helper
      await TestUser.createNewUser(bodyRequest);

      await expect(
        UsersServices._verifyUsername(bodyRequest.username)
      ).rejects.toThrow(InvariantError);
    });

    it('should not error when username available', async () => {
      await expect(
        UsersServices._verifyUsername(bodyRequest.username)
      ).resolves.not.toThrow(InvariantError);
    });
  });

  describe('addUser method', () => {
    it('should add user correctly', async () => {
      const userId = await UsersServices.addUser(bodyRequest);

      expect(userId).toBeDefined();
    });
  });

  describe('verifyCredentials method', () => {
    it('should throw Authentication when username wrong', async () => {
      // expect actual username that does not exist on DB
      await expect(
        UsersServices.verifyCredentials('johndoeeeeeeee', 'error')
      ).rejects.toThrow(AuthenticationError);
    });
    it('should throw Authentication when password wrong', async () => {
      const userData = {
        username: 'khafidprayoga12',
        password: 'supersecret',
      };
      const hashedPassword = await PasswordManager.encode(userData.password);
      TestUser.createNewUser({
        username: userData.username,
        password: hashedPassword,
      });

      await expect(
        UsersServices.verifyCredentials(userData.username, 'secretopassword')
      ).rejects.toThrow(AuthenticationError);

      await TestUser.deleteUser({ username: userData.username });
    });
    it('should return user id if user credentials match', async () => {
      const userData = {
        username: 'khafidganteng123',
        password: 'sadboy',
      };
      const hashedPassword = await PasswordManager.encode(userData.password);

      const tableHelpers = await TestUser.createNewUser({
        username: userData.username,
        password: hashedPassword,
      });

      const credentials = await UsersServices.verifyCredentials(
        userData.username,
        userData.password
      );

      expect(credentials).toEqual(tableHelpers.id);
      // clean table
      TestUser.deleteUser({ username: userData.username });
    });
  });
});
