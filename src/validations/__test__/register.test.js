const { postValidate } = require('../register');
const ValidationError = require('../../exceptions/ValidationError');

describe('/register bodyRequest schema validations', () => {
  it('should have postValidate validator', () => {
    expect(postValidate).toBeInstanceOf(Function);
  });
  describe('Bad request', () => {
    it('should error if all required field not filled', async () => {
      const bodyRequest = {
        firstName: 'Khafid',
        lastName: 'Prayoga',
        username: 'khafidprayoga',
        password: 'CBwGD8x8z',
      };

      await expect(postValidate(bodyRequest)).rejects.toThrow(ValidationError);
    });
    it('should throw error if filled field too larger', async () => {
      const bodyRequest = {
        firstName: 'KhafidKhafidKhafidKhafidKhafidKhafidKhafid',
        lastName: 'Prayoga',
        username: 'khafidprayoga',
        password: 'CBwGD8x8z',
        birthDate: '2000-01-31',
      };

      await expect(postValidate(bodyRequest)).rejects.toThrow(ValidationError);
    });
    it('should error if password length lower than actual (8 char)', async () => {
      const bodyRequest = {
        firstName: 'Khafidd',
        lastName: 'Prayoga',
        username: 'khafidprayoga',
        password: 'CBwGD8',
        birthDate: '1-1-2005',
      };

      await expect(postValidate(bodyRequest)).rejects.toThrow(ValidationError);
    });
  });

  it('should not error if all schema are valid', async () => {
    const bodyRequest = {
      firstName: 'Khafid',
      lastName: 'Prayoga',
      username: 'khafidprayoga',
      password: 'CBwGD8x8z',
      birthDate: '2000-01-31',
    };

    await expect(() => postValidate(bodyRequest)).not.toThrowError(
      ValidationError
    );
  });
});
