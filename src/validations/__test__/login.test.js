const ValidationError = require('../../exceptions/ValidationError');
const { postValidate, putValidate } = require('../login/');
const TokenManager = require('@utils/jwt/');

describe('/login bodyRequest validations', () => {
  describe('Post validations schema', () => {
    it('should throw ValidationError if data not meet specifications', async () => {
      const bodyRequest = {
        username: '1=1',
        password: '1=1',
      };

      await expect(postValidate(bodyRequest)).rejects.toThrow(ValidationError);
    });
    it('should not thrown error if data meet the specifications', async () => {
      const bodyRequest = {
        username: 'khafid',
        password: 'supersecret',
      };

      await expect(postValidate(bodyRequest)).resolves.not.toThrow(
        ValidationError
      );
    });
  });
  describe('Put validate schema', () => {
    it('should throw validationerror when payload is empty', async () => {
      const bodyRequest = {
        refreshToken: '',
      };
      await expect(putValidate(bodyRequest)).rejects.toThrow(ValidationError);
    });
    it('should not throw error when data meet the specifications', async () => {
      const refreshToken = await TokenManager.generateRefreshToken({ id: 1 });

      await expect(putValidate({ refreshToken })).resolves.not.toThrow(
        ValidationError
      );
    });
  });
});
