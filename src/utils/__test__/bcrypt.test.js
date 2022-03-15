const PasswordManager = require('../bcrypt');

describe('bcrypt helpers password encode and decode', () => {
  const plainPassword = 'supersecret';
  let hashedPassword;

  it('should encode password correctly', async () => {
    hashedPassword = await PasswordManager.encode(plainPassword);

    expect(hashedPassword).toBeDefined();
  });
  it('should return false if compared password not match ', async () => {
    const isValid = await PasswordManager.compare('secret', hashedPassword);
    expect(isValid).toEqual(false);
  });
  it('should compare plain and hashed password correctly', async () => {
    const isValid = await PasswordManager.compare(
      plainPassword,
      hashedPassword
    );
    expect(isValid).toEqual(true);
  });
});
