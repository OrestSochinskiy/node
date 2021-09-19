const { Schema, model } = require('mongoose');
const userRolesEnum = require('../config/user-roles.enum');
const passwordService = require('../services/password.service');
const { USER } = require('../config/database-tables.enum');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    default: userRolesEnum.USER,
    enum: Object.values(userRolesEnum)
  },
  avatar: {
    type: String
  }
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

// eslint-disable-next-line func-names
userSchema.virtual('fullName').get(function() {
  return `${this.name} Zelenskiy`;
});

userSchema.methods = {
  comparePassword(password) {
    return passwordService.compare(this.password, password);
  },
};

module.exports = model(USER, userSchema);
