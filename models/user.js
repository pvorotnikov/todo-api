'use strict';

// load dependencies
const mongoose = require('mongoose');
const crypto = require('crypto');

// Define our user schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Execute before each user.save() call
UserSchema.pre('save', function(callback) {
    let user = this;

    // Break out if the password hasn't changed
    if (!user.isModified('password')) {
        return callback();
    }

    // Password changed so we need to hash it
    let hash = crypto.createHash('md5').update(user.password).digest('hex');
    user.password = hash;
    callback();
});

UserSchema.methods.validPassword = function(password) {
    let hash = crypto.createHash('md5').update(password).digest('hex');
    return (this.password === hash);
};

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);
