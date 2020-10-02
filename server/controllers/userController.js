const { OAuth2Client } = require('google-auth-library')

const { User } = require('../models')
const { generateToken } = require('../helpers/jwt')

class UserController {
  static login(req, res) {

  }

  static register(req,res) {

  }

  static googleSignIn(req, res, next) {
    const { googleToken } = req.body

    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_SECRET)
    async function verify() {
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.GOOGLE_CLIENT_SECRET
      })

      const payload = ticket.getPayload()

      let user = await User.findOne({
        where: { email: payload.email }
      })

      if (!user) {
        user = await User.create({
          name: payload.name,
          email: payload.email,
          password: 'googleSignIn' + Math.random()
        })
      }

      const objUser = {
        id: payload.id,
        email: payload.email
      }

      const token = generateToken(objUser)

      res.status(200).json({ token })
    }
    verify().catch(err => next(err))
  }

}


module.exports = UserController
