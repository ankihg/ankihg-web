module.exports = function(mongoose, models) {

  const bcrypt = require('bcrypt');
  const jwt = require('jsonwebtoken');


  const userSchema = new mongoose.Schema({
    username: String,
    authenticaton: {
      email: String,
      password: String
    }
  });

  userSchema.methods.hashPassword = function(password) {
    return this.authenticaton.password = bcrypt.hashSync(password, 8);
  };

  userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.authenticaton.password);
  };

  userSchema.methods.generateToken = function() {
    return jwt.sign({id: this._id}, process.env.APP_SECRET || 'changeme');
  };

  models.User = mongoosel.model('User', userSchema);

}
