'use strict';

const express = require('express');
const router = express.Router();

// dependencies
const Logger = require('../common/logger')('info', 'user');
const Response = require('../common/response');
const ErrorResponse = require('../common/error-response');

// models
const User = require('../models/user');
const Todo = require('../models/todo');

module.exports = (app) => {

    router.get('/', app.get('auth').authenticate('basic', { session : false }), (req, res, next) => {

        // get params
        let username = req.user.username;

        // find user
        User.findOne({username: username}, (err, user) => {
            if (!err) {
                let response = {
                    id: user.id,
                    username: user.username
                };
                res.json(new Response(response));
            } else {
                res.json(new ErrorResponse(null, 'DB Error'));
            }
        });
    });

    router.post('/validate', (req, res, next) => {

        // get params
        let username = req.body.username;
        let password = req.body.password;

        User.findOne({ username: username }, (err, user) => {
            if (err) {
                res.json(new ErrorResponse(null, 'DB Error'));
            } else if (!user) {
                res.json(new Response(false));
            } else if (!user.validPassword(password)) {
                res.json(new Response(false));
            } else {
                res.json(new Response(true));
            }
        });
    });

    router.post(/^\/(\w+)\/(\w+)$/, (req, res, next) => {

        // get params
        let username = req.params[0];
        let password = req.params[1];

        // create user
        let user = new User({ username: username, password: password });
        user.save((err) => {
            if (!err) {
                res.json(new Response('User created'));
            } else {
                res.json(new ErrorResponse(null, 'DB Error'));
            }
        });
    });

    router.delete('/', app.get('auth').authenticate('basic', { session : false }), (req, res, next) => {

        // get params
        let userId = req.user.id;
        let username = req.user.username;

        // remove user
        User.remove({ username: username }, (err) => {
            if (!err) {
                Todo.remove({ userId: userId }, (err) => {
                    if (!err) {
                        res.json(new Response('User deleted'));
                    } else {
                        res.json(new ErrorResponse(null, 'DB Error'));
                    }
                });
            } else {
                res.json(new ErrorResponse(null, 'DB Error'));
            }
        });
    });

    return router;
};
