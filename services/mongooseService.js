const _ = require('lodash');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const models = require('../models');
const config = require('../config/index');
const loggingService = require('./loggingService');

const MONGODB_HOST = config.env('MONGODB_HOST', config.get('mongodb.host', 'localhost'));
const MONGODB_PORT = config.env('MONGODB_PORT', config.get('mongodb.port', 27017));
const MONGODB_USERNAME = config.env('MONGODB_USERNAME', config.get('mongodb.username'));
const MONGODB_PASSWORD = config.env('MONGODB_PASSWORD', config.get('mongodb.password'));
const MONGODB_DATABASE = config.env('MONGODB_DATABASE', config.get('mongodb.database'));

mongoose.Promise = Promise;

const mongooseService = {
    mongoose: mongoose
};

_.forIn(models, function (schema, name) {
    mongoose.model(name, schema);
});

mongooseService.connect = function () {
    let mongodbUrl = `mongodb://`;

    if (!_.isNil(MONGODB_USERNAME) && !_.isNil(MONGODB_PASSWORD)) {
        mongodbUrl += `${MONGODB_USERNAME}:${MONGODB_PASSWORD}@`;
    }

    mongodbUrl += `${MONGODB_HOST}:${MONGODB_PORT}`;

    if (!_.isNil(MONGODB_DATABASE)) {
        mongodbUrl += `/${MONGODB_DATABASE}`;
    }


    return mongoose.connect(mongodbUrl, {useNewUrlParser: true})
        .tap(function () {
            let mongodbUrl = `mongodb://`;

            if (!_.isNil(MONGODB_USERNAME) && !_.isNil(MONGODB_PASSWORD)) {
                mongodbUrl += `${MONGODB_USERNAME}@`;
            }

            mongodbUrl += `${MONGODB_HOST}:${MONGODB_PORT}`;

            if (!_.isNil(MONGODB_DATABASE)) {
                mongodbUrl += `/${MONGODB_DATABASE}`;
            }

            loggingService.info(`Connected to MongoDB server:\n` + mongodbUrl)
        });
};

module.exports = mongooseService;

