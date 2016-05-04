'use strict';
const User = require('../models/user').User;
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  var decoded;
  try {
    decoded = jwt.verify(req.headers.token, process.env.APP_SECRET || 'changeme');
  } catch(e) {
    return res.status(401).json({msg:'error verifying token', err:e});
  }
  User.findOne({_id: decoded.id}, (err, user) => {
    if (err) return res.status(401).json({msg:'error finding user', err:err});
    if (!user) return res.status(401).json({msg:'user not found', err:true});
    req.user = user;
    return next();
  });
}
