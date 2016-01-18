const express = require('express');
const router = express.Router();

const Logger = require('../common/logger')('info', 'todo');
const Response = require('../common/response');
const ErrorResponse = require('../common/error-response');

module.exports = (app) => {

    router.get('/', app.get('auth').isAuthenticated, function(req, res, next) {
        res.json(new Response());
    });

    return router;
};
