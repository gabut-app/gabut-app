const jwt = require('jsonwebtoken')

function generateToken(payLoad) {
  return jwt.sign(payLoad, process.env.SECRET)
}

function verifyToken(token) {
  return jwt.verify(token, process.env.SECRET)
}

module.exports = { generateToken, verifyToken }
