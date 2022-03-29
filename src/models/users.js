const { Schema, model } = require('mongoose');

const userSchema = Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  access: {
    type: Boolean,
    require: false
  }
});

module.exports = model('users', userSchema);
