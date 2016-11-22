'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * @module user
 * @description contain the details of user information.
 */

var UserSchema = new Schema({
  name: { type: String },
  email: { type: String }
});


UserSchema.statics = {

     /**
      findOneuser. return the one user object.
      @param id: get id to find one user by id.
      @param callback: callback of this form.
    */
    get: function(query, callback) {
        this.findOne(query, callback);
    },
    /**
      finduser. return the user objects.
      @param callback: callback of this form.
    */
    getAll: function(query, callback) {
        this.find(query, callback);
    },

    getAllCount: function(query, callback) {
        this.count(query, callback);
    },


    getPageRecords: function(query, callback) {
        this.find(null,null,query,callback);
    },
    
    /**
      updateuser. return the create user object result.
      @param updateData: updateData is use to update user w.r.t id.
      @param callback: callback of this form.
    */
    updateById: function(id, updateData, callback) {
        this.update(id, {$set: updateData}, callback);
    },
    removeById: function(removeData, callback) {
        this.remove(removeData, callback);
    },
    create: function(data, callback) {
        var user = new this(data);
        user.save(callback);
    }
}

var user = mongoose.model('user', UserSchema);

/** export schema */
module.exports = {
    User: user
};