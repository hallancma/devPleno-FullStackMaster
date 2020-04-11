const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const generatePassHash = passwd => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(passwd, salt);
  return hash;
};

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  roles: {
    type: [String],
    enum: ['restrito', 'admin']
  }
});

UserSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  user.password = generatePassHash(user.password);
  next();
});

UserSchema.methods.checkPassword = function(password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (err, isMatch) => {
      if (err) {
        reject(err);
      } else {
        resolve(isMatch);
      }
    });
  });
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
