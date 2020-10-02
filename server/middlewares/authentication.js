const { User } = require('../models');
const { verifyToken } = require('../helpers/jwt');

async function authentication(req, res, next) {
  try {
    const { token } = req.headers;
    const decoded = verifyToken(token);
    const user = await User.findOne({
      where: {
        email: decoded.email,
      },
    });
    if (!user) throw { name: `Authentication failed` };
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = authentication;
