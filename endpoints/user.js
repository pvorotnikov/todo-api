const express = require('express');
const router = express.Router();

const Logger = require('../common/logger')('info', 'user');
const Response = require('../common/response');
const ErrorResponse = require('../common/error-response');

module.exports = (app) => {

    router.get('/', app.get('auth').isAuthenticated, (req, res, next) => {
        res.json(new Response());
    });

    router.post('/', app.get('auth').isAuthenticated, (req, res, next) => {
        res.json(new Response());
    });

    router.delete('/', app.get('auth').isAuthenticated, (req, res, next) => {
        res.json(new Response());
    });

    return router;
};
