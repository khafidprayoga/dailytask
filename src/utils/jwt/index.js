require('dotenv').config();
const jwt = require('jsonwebtoken');
const InvariantError = require('../../exceptions/InvariantError');

const { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } = process.env;
const OPTIONS_FOR_ACCESS_TOKEN = {
  algorithm: 'HS256',
  expiresIn: '1 days',
};

const OPTIONS_FOR_REFRESH_TOKEN = {
  algorithm: 'HS512',
  expiresIn: '7 days',
};

const TokenManager = {
  async generateAccessToken(payload) {
    const accessToken = jwt.sign(
      payload,
      ACCESS_TOKEN_KEY,
      OPTIONS_FOR_ACCESS_TOKEN
    );
    return accessToken;
  },
  async generateRefreshToken(payload) {
    const refreshToken = jwt.sign(
      payload,
      REFRESH_TOKEN_KEY,
      OPTIONS_FOR_REFRESH_TOKEN
    );
    return refreshToken;
  },
  async verifyRefreshToken(refreshToken) {
    try {
      const decoded = await jwt.verify(refreshToken, REFRESH_TOKEN_KEY, {
        complete: true,
      });

      return decoded.payload;
    } catch (error) {
      throw new InvariantError('JWT token invalid');
    }
  },
};

module.exports = TokenManager;
