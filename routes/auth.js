'use strict';
const basicHttp = require('../lib/basic_http');
module.exports = function(router, models) {

  const User = models.User;

  router.post('/signup', (req, res) => {
    console.log(req.body);
    var newUser = new User();
    newUser.username = req.body.username;
    newUser.authenticaton.username = req.body.username;
    newUser.hashPassword(req.body.password);
    newUser.save((err, user) => {
      if (err) return res.status(500).json({msg:'error saving user', err: err, data:null});
      return res.status(200).json({msg:'user created', err: null, data:user, token: user.generateToken()});
    });
  });

  router.get('/signin', basicHttp, (req, res) => {
    console.log(req.basicHttp.username);
    User.findOne({username:req.basicHttp.username}, (err, user) => {
      if (err) return res.status(401).json({msg:'authentication failure', err: err, data:null});
      console.log(user);
      if (!user) return res.status(401).json({msg:'user not found', err: true, data:null});
      if (!user.comparePassword(req.basicHttp.password))
        return res.status(401).json({msg:'trespassing', err: true, data:null, token:null});
      return res.status(200).json({msg:'welcome', err: null, data:null, token: user.generateToken()});
    });
  });

  router.get('/users', (req, res) => {
    User.find({}, (err, users) => {
      if (err) return res.status(500).json({msg:'error retrieving users', err: err, data:null});
      return res.status(200).json({msg:'all users', err: null, data:users});
    })
  })

};
