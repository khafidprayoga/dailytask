require('dotenv').config();
const jwt = require('jsonwebtoken');
const TokenManager = require('../jwt');
const { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } = process.env;
const InvariantError = require('@exceptions/InvariantError');

describe('TokenManager test for JWT sessions management', () => {
  it('should have main function', () => {
    expect(TokenManager.generateAccessToken).toBeInstanceOf(Function);
    expect(TokenManager.generateRefreshToken).toBeInstanceOf(Function);
    expect(TokenManager.verifyRefreshToken).toBeInstanceOf(Function);
  });

  describe('generateAccessToken function', () => {
    it('should generate access token correctly with secret env ACCESS_TOKEN_KEY', async () => {
      const payload = {
        userId: 123,
      };
      const accessToken = await TokenManager.generateAccessToken(payload);
      const decoded = jwt.verify(accessToken, ACCESS_TOKEN_KEY, {
        complete: true,
      });

      expect(accessToken).toBeDefined();
      expect(decoded.payload).toBeDefined();
      expect(accessToken.split('.')[2]).toEqual(decoded.signature);
    });
  });
  describe('generateRefreshToken function', () => {
    it('should generate refresh token correctly with secret env REFRESH_TOKEN_KEY', async () => {
      const payload = {
        userId: 123,
      };
      const refreshToken = await TokenManager.generateRefreshToken(payload);
      const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_KEY, {
        complete: true,
      });

      expect(refreshToken).toBeDefined();
      expect(decoded.payload).toBeDefined();
      expect(refreshToken.split('.')[2]).toEqual(decoded.signature);
    });
  });
  describe('verifyRefreshToken function', () => {
    it('should sign and verify refreshToken with valid signature', async () => {
      const payload = {
        id: 200,
      };
      const refreshToken = await TokenManager.generateRefreshToken(payload);

      await expect(
        TokenManager.verifyRefreshToken(refreshToken)
      ).resolves.not.toThrow(InvariantError);
    });
    it('should  throw internal server error when given refresh token signature invalid', async () => {
      // generated from jwt.io, private key not same as REFRESH_TOKEN_KEY
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

      await expect(TokenManager.verifyRefreshToken(token)).rejects.toThrow(
        InvariantError
      );
    });
  });
});
