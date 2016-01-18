'use strict';

const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const Logger = require('./logger')('debug', 'auth-basic');

const User = require('../models/user');

passport.use(new BasicStrategy((username, password, callback) => {

    Logger.debug('Checking credentials for user: %s', username);

    User.findOne({ username: username }, (err, user) => {
        if (err) {
            Logger.error('Error', err);
            return callback(err);
        }

        // No user found with that username
        if (!user) {
            Logger.error('User not found');
            return callback(null, false, {message: 'User not found'});
        }

        // Make sure the password is correct
        user.verifyPassword(password, (err, isMatch) => {
            if (err) {
                Logger.error('Error', error);
                return callback(err);
            }

            // Password did not match
            if (!isMatch) {
                Logger.error('Wrong password');
                return callback(null, false), {message: 'Wrong password'};
            }

            // Success
            Logger.info('Successfully authenticated');
            return callback(null, user);
        });
    });

}));

exports.isAuthenticated = passport.authenticate('basic', { session : false });
