'use strict';

// include dependencies
const STATUS = require('./constant').STATUS;

class Response {

    constructor(data, status) {
        this.status = status || STATUS.OK;
        this.data = undefined !== data ? data : null;
    }

    serialize() {
        return {
            data: this.data,
            status: this.status
        };
    }
}

module.exports = Response;
