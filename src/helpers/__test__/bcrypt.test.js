const { passwordManager } = require('../bcrypt');

describe('bcrypt helpers password encode and decode', () => {
  const plainPassword = 'supersecret';
  let hashedPassword;

  it('should encode password correctly', async () => {
    hashedPassword = await passwordManager.encode(plainPassword);

    expect(hashedPassword).toBeDefined();
  });
  it('should return false if compared password not match ', async () => {
    const isValid = await passwordManager.compare('secret', hashedPassword);
    expect(isValid).toEqual(false);
  });
  it('should compare plain and hashed password correctly', async () => {
    const isValid = await passwordManager.compare(
      plainPassword,
      hashedPassword
    );
    expect(isValid).toEqual(true);
  });
});
