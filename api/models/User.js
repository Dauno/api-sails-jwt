/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var bcrypt = require('bcrypt');

module.exports = {

  attributes: {
    username: {
      type: 'string',
      required: true,
      unique: true
    },
    // firstname:{
    //   type: 'string',
    //   //required: true
    // },
    // lastname:{
    //   type: 'string',
    //   //required: true
    // },
    // email: {
    //   type: 'string',
    //   required: true,
    //   unique: true
    // },
    password: {
      type: 'string'
    },
    // role: {
    //   type: 'string',
    //   enum: ['normal','admin'],
    //   required: true,
    //   defaultsTo: 'normal'
    // },
    // enabled:{
    //   type: 'boolean',
    //   defaultsTo: true
    // },
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },

  beforeCreate: function(values, next) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        return next(err);
      }

      bcrypt.hash(values.password, salt, function(err, hash) {
        if (err) {
          return next(err);
        }

        values.password = hash;
        next();
      });
    });
  },

  validPassword: function(password, user, cb) {
    bcrypt.compare(password, user.password, function(err, match) {
      if (err) {
        cb(err);
      }

      if (match) {
        cb(null, true);
      } else {
        cb(err);
      }
    });
  }
};

