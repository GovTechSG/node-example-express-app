const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const loggingService = require('./services/loggingService.js');
const rid = require('connect-rid');
const morgan = require('morgan');

const routes = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(rid());
app.use(morgan('combined',{
    stream: {
        write: function (message) {
            return loggingService.info(message.trim());
        }
    }
}));

app.use(routes);

app.use(function (req, res, next) {
    return next(new createError(404));
});

app.use(function (err, req, res, next) {

    loggingService.error(err.stack);

    res.status(err.status || 500);
    return res.jsonp({
        status: err.status || 500,
        message: err.message
    });

});

module.exports = app;
