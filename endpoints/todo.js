'use strict';

const express = require('express');
const router = express.Router();

// dependencies
const Logger = require('../common/logger')('info', 'todo');
const Response = require('../common/response');
const ErrorResponse = require('../common/error-response');

// models
const Todo = require('../models/todo');

module.exports = (app) => {

    router.get('/', app.get('auth').authenticate('basic', { session : false }), function(req, res, next) {

        // get params
        let userId = req.user.id;

        // fetch todos
        Todo.find({ userId: userId }, (err, todos) => {
            if (!err) {
                let response = todos.map((todo) => {
                    return {
                        id: todo.id,
                        text: todo.text,
                        done: todo.done
                    };
                });
                res.json(new Response(response));
            } else {
                res.json(new ErrorResponse());
            }
        });
    });

    router.post(/^\/([01])\/(.+)$/, app.get('auth').authenticate('basic', { session : false }), function(req, res, next) {

        // get params
        let userId = req.user.id;
        let done = '1' === req.params[0] ? true : false;
        let text = req.params[1];

        // create todo
        let todo = new Todo({ userId: userId, done: done, text: text });
        todo.save((err) => {
            if (!err) {
                res.json(new Response());
            } else {
                res.json(new ErrorResponse());
            }
        });
    });

    router.put(/^\/(\w+)\/(\d)\/(.+)$/, app.get('auth').authenticate('basic', { session : false }), function(req, res, next) {

        // get params
        let userId = req.user.id;
        let id = req.params[0];
        let done = '1' === req.params[1] ? true : false;
        let text = req.params[2];

        // update todo
        Todo.findOne({ userId: userId, _id: id }, (err, todo) => {
            todo.done = done;
            todo.text = text;
            todo.save((err) => {
                if (!err) {
                    res.json(new Response())
                } else {
                    res.json(new ErrorResponse());
                }
            });
        });
    });

    router.delete(/^\/(\w+)$/, app.get('auth').authenticate('basic', { session : false }), (req, res, next) => {

        // get params
        let userId = req.user.id;
        let id = req.params[0];

        // remove user
        Todo.remove({ _id: id, userId: userId }, (err) => {
            if (!err) {
                res.json(new Response());
            } else {
                res.json(new ErrorResponse());
            }
        });
    });

    return router;
};
