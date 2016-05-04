const zeroBuffer = require('./zero_buffer');
module.exports = function(req, res, next) {
  try {
    var base64Str = req.headers.authorization.split(' ')[1];
      var authBuf = new Buffer(base64Str, 'base64');
      var utf8AuthStr = authBuf.toString();
      var authArr = utf8AuthStr.split(':');
      zeroBuffer(authBuf);
      if (authArr[0].length && authArr[1].length) {
        req.basicHttp = {
          username: authArr[0],
          password: authArr[1]
        };
        return next();
      }

  } catch(e) {
    console.log(e);
    res.status(401).json({msg:'cound not authenticate', err:null, data:null});
  }

}
