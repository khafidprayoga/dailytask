require('dotenv').config();
const jwt = require('jsonwebtoken');
const InternalServerError = require('../../exceptions/InternalServerError');

const { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } = process.env;
const _optionsForAccessToken = {
  algorithm: 'HS256',
  expiresIn: '1 days',
};

const _optionsForRefreshToken = {
  algorithm: 'HS512',
  expiresIn: '7 days',
};

const TokenManager = {
  async generateAccessToken(payload) {
    const accessToken = jwt.sign(
      payload,
      ACCESS_TOKEN_KEY,
      _optionsForAccessToken
    );
    return accessToken;
  },
  async generateRefreshToken(payload) {
    const refreshToken = jwt.sign(
      payload,
      REFRESH_TOKEN_KEY,
      _optionsForRefreshToken
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
      throw new InternalServerError(
        `Server can't verify JWT token, signature invalid`
      );
    }
  },
};

module.exports = TokenManager;
