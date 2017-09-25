/* Created by Prashant Sudeep on 15/09/2017 */

const jwt = require('jsonwebtoken');

const expiryTime = sails.config.jwt.EXPIRYTIME;
const tokenSecret = sails.config.jwt.SECRET;

const create = payload => jwt.sign(
  payload,
  tokenSecret, // Token Secret that we sign it with
  {
    expiresIn: expiryTime, // Token Expire time
  },
);

const verify = (token, callback) => jwt.verify(
  token, // The token to be verified
  tokenSecret, // Same token we used to sign
  {}, // No Option, for more see https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
  callback, //Pass errors or decoded token to callback
);

module.exports = {
  create,
  verify,
};
