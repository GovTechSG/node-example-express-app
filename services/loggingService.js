const _ = require('lodash');
const winston = require('winston');
const config = require('../config/index');

const NODE_ENV = config.env('NODE_ENV', 'development');
const LOGGING_LEVEL = config.env('LOGGING_LEVEL', config.get('logging.level', NODE_ENV === 'production' ? 'debug' : 'info'));

const format = winston.format;

const loggingService = winston.createLogger({
    level: LOGGING_LEVEL,
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({
            format: format.combine(
                format.timestamp(),
                format.colorize(),
                format.simple()
            )
        })
    ]
});

module.exports = loggingService;

