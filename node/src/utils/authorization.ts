const jwt = require('jsonwebtoken');

// 生成 JWT 短时间有效的 token
const generateToken = (payload: any) => {
  const data = JSON.stringify(payload);
  const secret = process.env.JWT_SECRET;
  if (!secret) return '';
  const token = jwt.sign({ data }, secret, {
    expiresIn: 60 * 60 * 1000, // 1 hour
  });
  return token;
};

// 生成 JWT 长时间有效的 token
const generateLongToken = (payload: any) => {
  const data = JSON.stringify(payload);
  const secret = process.env.REFRESH_TOKEN_SECRET;
  if (!secret) return '';
  const token = jwt.sign({ data }, secret, {
    expiresIn: 60 * 60 * 24 * 7 * 1000, // 7 days
  });
  return token;
};

// 验证 JWT
const verifyToken = (token: string) => {
  const secret = process.env.JWT_SECRET;
  const refreshSecret = process.env.REFRESH_TOKEN_SECRET;
  if (!secret || !refreshSecret) return null;
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (err) {
    try {
      const decoded = jwt.verify(token, refreshSecret);
      return decoded;
    } catch (err) {
      return null;
    }
  }
};

export {
  generateToken,
  generateLongToken,
  verifyToken,
};