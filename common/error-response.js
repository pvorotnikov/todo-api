'use strict';

// include dependencies
const CONSTANT = require('./constant');
const STATUS = CONSTANT.STATUS;
const ERROR = CONSTANT.ERROR;

class ErrorResponse {

    constructor(errorCode, errorMessage, status) {
        this.status = status || STATUS.ERROR;
        this.errorCode = errorCode || ERROR.INTERNAL_ERROR;
        this.errorMessage = undefined !== errorMessage ? errorMessage : '';
    }

    serialize() {
        return {
            status: this.status,
            errorCode: this.errorCode,
            errorMessage: this.errorMessage
        };
    }
}

module.exports = ErrorResponse;
