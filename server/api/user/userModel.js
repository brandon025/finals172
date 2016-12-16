var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  }
    
    address: {
    type: String,
    unique: false,
    required: true
  }
});

module.exports = UserSchema;
