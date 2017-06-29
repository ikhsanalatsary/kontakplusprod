'use strict';

const auth = require('basic-auth');
const admin = require('./config/config').admin;

const basicAuth = (req, res, next) => {
  const user = auth(req);

  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  }

  if (user.name === admin.user && user.pass === admin.password) {
    return next();
  }

  return unauthorized(res);
};

function unauthorized(res) {
  res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
  return res.sendStatus(401);
}

module.exports = basicAuth;
