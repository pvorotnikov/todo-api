const express = require('express');
const router = express.Router();

const Logger = require('../common/logger')('info', 'index');
const Response = require('../common/response');
const ErrorResponse = require('../common/error-response');

module.exports = (app) => {

    router.get('/', function(req, res, next) {
        res.render('index', {title: 'Todo API'});
    });

    return router;
};
