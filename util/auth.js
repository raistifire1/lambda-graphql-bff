const jwt = require('express-jwt')
var jwks = require('jwks-rsa')

// authentication middleware
const authMiddleware = jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `${process.env.AUTH0_ISSUER}.well-known/jwks.json`
    }),
    audience: process.env.AUTH0_AUDIENCE,
    issuer: process.env.AUTH0_ISSUER,
    algorithms: ['RS256'],
    credentialsRequired: false
  })

module.exports = {
    authMiddleware
}