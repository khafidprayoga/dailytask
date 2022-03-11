const usersServices = require('../users/');
const pool = require('@connections');
const { testUser } = require('@helpers/User.js');
const InvariantError = require('@exceptions/InvariantError');

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
});
