const ValidationError = require('../../exceptions/ValidationError');
const { postValidate } = require('../login/');

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

      await expect(() => postValidate(bodyRequest)).not.toThrow(
        ValidationError
      );
    });
  });
});
