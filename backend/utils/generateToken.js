const jwt = require('jsonwebtoken');

const generateToken = (res, userId, role) => {

  const token = jwt.sign(
    { userId, role },
    process.env.JWT_SECRET || 'fallback_secret',
    {
      expiresIn: '30d',
    }
  );

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

module.exports = generateToken;