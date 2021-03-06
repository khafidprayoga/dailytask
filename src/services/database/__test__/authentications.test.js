const AuthenticationsServices = require('../authentications');
const TestAuthentications = require('@helpers/Authentications');
const InvariantError = require('@exceptions/InvariantError');
const pool = require('@connections');

describe('Authentications service for manage refresh Token', () => {
  afterAll(async () => {
    await pool.end();
  });

  it('should have three management feature', async () => {
    await expect(AuthenticationsServices.addRefreshToken).toBeInstanceOf(
      Function
    );
    await expect(AuthenticationsServices.verifyRefreshToken).toBeInstanceOf(
      Function
    );
    await expect(AuthenticationsServices.deleteRefreshToken).toBeInstanceOf(
      Function
    );
  });

  describe('addRefreshToken function', () => {
    it('should add refreshToken correctly', async () => {
      const token = 'add';
      await AuthenticationsServices.addRefreshToken(token);

      const isInserted = await TestAuthentications.verifyToken(token);
      expect(isInserted).toBe(true);

      //   clean test table
      TestAuthentications.deleteToken(token);
    });
  });

  describe('verifyRefreshToken function', () => {
    it('should verify token correctly', async () => {
      const token = 'verify';
      await TestAuthentications.insertToken(token);

      await expect(
        AuthenticationsServices.verifyRefreshToken(token)
      ).resolves.not.toThrow(InvariantError);

      //   clean test table
      TestAuthentications.deleteToken(token);
    });
    it('should throw invariant error when refreshtoken not found', async () => {
      await expect(
        AuthenticationsServices.verifyRefreshToken('error')
      ).rejects.toThrow(InvariantError);

      //   clean test table
      TestAuthentications.deleteToken('error');
    });
  });

  describe('daleteRefreshToken function', () => {
    it('should delete token correctly', async () => {
      const token = 'delete';
      await TestAuthentications.insertToken(token);
      await AuthenticationsServices.deleteRefreshToken(token);

      const isDeleted = await TestAuthentications.deleteToken(token);
      expect(isDeleted).toBe(true);
    });
  });
});
