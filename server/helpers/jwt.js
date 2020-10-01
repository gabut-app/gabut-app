const jwt = require('jsonwebtoken')

function generateToken(payLoad) {
  console.log(process.env.SECRET, '<<<< ENV SECRET')
  return jwt.sign(payLoad, process.env.SECRET)
}

function verifyToken(token) {
  return jwt.verify(token, process.env.SECRET)
}

module.exports = { generateToken, verifyToken }