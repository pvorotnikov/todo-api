/**
 * Logger module
 */

var winston = require('winston');
var util = require('util');

module.exports = (userLevel, moduleName) => {

    const level = userLevel || 'info';
    const prefix = (moduleName ? '[' + moduleName + '] ' : '');

    const logger = new (winston.Logger)({
        transports: [
          new (winston.transports.Console)({
            formatter: function(options) {
                // Return string will be passed to logger.
                return options.level.toUpperCase() + ' ' +
                    prefix +
                    (undefined !== options.message ? options.message : '') +
                    (options.meta && Object.keys(options.meta).length ? util.inspect(options.meta) : '' );
            }
          })
        ],
        level: level
    });

    return logger;
};
