const { Schema, model } = require('mongoose');

const { USER, OAuth } = require('../config/database-tables.enum');

const OAuthSchema = new Schema({
  access_token: {
    type: String,
    required: true
  },
  refresh_token: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: USER
  }
}, { timestamps: true });

// eslint-disable-next-line func-names
OAuthSchema.pre('findOne', function() {
  this.populate('user');
});

module.exports = model(OAuth, OAuthSchema);
