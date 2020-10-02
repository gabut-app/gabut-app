const { OAuth2Client } = require('google-auth-library');
const { comparePass } = require('../helpers/bcrypt');
const { hashPass } = require('../helpers/bcrypt');
const { User } = require('../models');
const { generateToken } = require('../helpers/jwt');

class UserController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (!user) throw { msg: `Invalid email or password`, statusCode: 400 };
      const comparedPassword = comparePass(password, user.password);
      if (!comparedPassword)
        throw { msg: `Invalid email or password`, statusCode: 400 };
      const payload = {
        id: user.id,
        email: user.email,
      };
      const token = generateToken(payload);
      res.status(200).json({ token });
    } catch (err) {
      next(err);
    }
  }

  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const hashedPass = hashPass(password);
      const data = await User.create({
        email,
        password: hashedPass,
      });
      res.status(201).json({
        id: data.id,
        email: data.email,
        msg: `Register success`,
      });
    } catch (err) {
      next(err);
    }
  }

  static googleSignIn(req, res, next) {
    const { googleToken } = req.body;

    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_SECRET);
    async function verify() {
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.GOOGLE_CLIENT_SECRET,
      });

      const payload = ticket.getPayload();

      let user = await User.findOne({
        where: { email: payload.email },
      });

      if (!user) {
        user = await User.create({
          name: payload.name,
          email: payload.email,
          password: 'googleSignIn' + Math.random(),
        });
      }

      const objUser = {
        id: payload.id,
        email: payload.email,
      };

      const token = generateToken(objUser);

      res.status(200).json({ token });
    }
    verify().catch((err) => next(err));
  }
}

module.exports = UserController;
