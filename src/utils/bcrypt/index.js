const bcrypt = require('bcrypt');

const PasswordManager = {
  async encode(plainPassword) {
    const hashedPassword = await bcrypt.hash(plainPassword, 12);
    return hashedPassword;
  },
  async compare(plainPassword, hashedPassword) {
    const matched = await bcrypt.compare(plainPassword, hashedPassword);
    if (matched) return true;
    return false;
  },
};

module.exports = PasswordManager;
