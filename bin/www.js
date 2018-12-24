#!/usr/bin/env node

const _ = require('lodash');
const path = require('path');
const fs = require('fs');
const http = require('http');
const https = require('https');
const config = require('../config/index');
const mongooseService = require('../services/mongooseService');
const loggingService = require('../services/loggingService');
const Promise = require('bluebird');
const app = require('../app');

app.locals.config = config;
app.locals.mongooseService = mongooseService;
app.locals.loggingService = loggingService;

const TLS_CERT = config.env('TLS_CERT', config.get('tls.cert'));
const TLS_KEY = config.env('TLS_KEY', config.get('tls.key'));
const PORT = config.env('PORT', config.get('port'));

Promise.all([
    config.has('mongodb') ? mongooseService.connect() : null,
])
    .catch(function (err) {
        loggingService.error(err.stack);
        process.exit(1);
    })
    .then(function () {

        let serverPort, server;
        if (!_.isNil(TLS_CERT) && !_.isNil(TLS_KEY)) {
            serverPort = PORT || 8443;
            let tlsOptions = {
                key: fs.readFileSync(path.resolve(process.cwd(), TLS_KEY)),
                cert: fs.readFileSync(path.resolve(process.cwd(), TLS_CERT))
            };
            server = https.createServer(tlsOptions, app);
        } else {
            serverPort = PORT || 8080;
            server = http.createServer(app);
        }

        server.listen(serverPort);

        server.on('listening', function () {
            loggingService.info(`Listening on Port: ${serverPort}`);
        });

        server.on('error', function (err) {
            loggingService.error(err.stack);
            process.exit(1);
        });

        process.once('SIGTERM', function () {
            loggingService.info("SIGTERM received. Terminating");
            server.close(function () {
                process.exit(0);
            });
        });

        process.on('uncaughtException', function (err) {
            loggingService.error(err.stack);
        });

        process.on('unhandledRejection', function (err) {
            loggingService.error(err.stack);
        });

    });


