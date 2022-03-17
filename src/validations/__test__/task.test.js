const ValidationError = require('@exceptions/ValidationError');
const { postValidate, getValidate, deleteValidate } = require('../task');

describe('/task bodyRequest validations', () => {
  describe('POST validations schema', () => {
    it('should throw ValidationError if data not meet specifications', async () => {
      const bodyRequest = {
        title: 'add',
        description: '',
      };

      await expect(postValidate(bodyRequest)).rejects.toThrow(ValidationError);
    });
    it('should not thrown error if data meet the specifications', async () => {
      const bodyRequest = {
        title: 'Membaca Buku',
        description: 'Buku berjudul Laskar Pelangi',
      };

      await expect(postValidate(bodyRequest)).resolves.not.toThrow(
        ValidationError
      );
    });
  });
  describe('GET validations schema', () => {
    it('should throw ValidationError if data not meet specifications', async () => {
      const bodyRequest = {
        taskId: '',
      };

      await expect(getValidate(bodyRequest)).rejects.toThrow(ValidationError);
    });

    it('should not thrown error if data meet the specifications', async () => {
      const bodyRequest = {
        taskId: '4415bc50-7799-490a-9b23-99dc9d8397b9',
      };

      await expect(getValidate(bodyRequest)).resolves.not.toThrow(
        ValidationError
      );
    });
  });
  describe('DELETE validations schema', () => {
    it('should throw ValidationError if data not meet specifications', async () => {
      const bodyRequest = {
        taskId: '',
      };

      await expect(deleteValidate(bodyRequest)).rejects.toThrow(
        ValidationError
      );
    });

    it('should not thrown error if data meet the specifications', async () => {
      const bodyRequest = {
        taskId: '4415bc50-7799-490a-9b23-99dc9d8397b9',
      };

      await expect(deleteValidate(bodyRequest)).resolves.not.toThrow(
        ValidationError
      );
    });
  });
});
