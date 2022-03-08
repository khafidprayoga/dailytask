const { postValidate } = require('../register');
const ValidationError = require('../../exceptions/ValidationError');

describe('/register bodyRequest schema validations', () => {
  it('should have postValidate validator', () => {
    expect(postValidate).toBeInstanceOf(Function);
  });

  it('should error if all required field not filled', () => {
    const bodyRequest = {
      firstName: 'Khafid',
      lastName: 'Prayoga',
      username: 'khafidprayoga',
      password: 'CBwGD8x8z',
    };

    expect(() => postValidate(bodyRequest)).toThrowError(ValidationError);
  });
  xit('should error if password pattern not match', () => {});
  it('should pass if all schema are valid', () => {
    const bodyRequest = {
      firstName: 'Khafid',
      lastName: 'Prayoga',
      username: 'khafidprayoga',
      password: 'CBwGD8x8z',
      birthDate: '1-1-2005',
    };

    expect(() => postValidate(bodyRequest)).not.toThrowError(ValidationError);
  });
});
