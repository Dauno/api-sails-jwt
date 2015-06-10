/**
* Image.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    number: {
      type: 'string',
      required: true,
      unique: true
    },
    image: {
      type: 'string'
    },
    enabled:{
      type: 'boolean',
      defaultsTo: false
    },
    toJSON: function() {
      var obj = this.toObject();
      return obj;
    }
  }
};

