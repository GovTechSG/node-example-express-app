const _ = require('lodash');
const express = require('express');
const router = express.Router();

const keyValueDao = require('../daos/keyValueDao');

router.get('/', function (req, res, next) {
    let limit = _.get(req.query, 'limit');
    let skip = _.get(req.query, 'skip');

    return keyValueDao.find(null, null, {limit: limit, skip: skip, sort: 'key'})
        .then(function (keyValues) {
            keyValues = _.map(keyValues, function (keyValue) {
                return keyValue.toObject();
            });
            return res.jsonp(keyValues);
        })
        .catch(function (err) {
            return next(err);
        });
});

router.get('/:key', function (req, res, next) {
    let key = _.get(req.params, 'key');
    return keyValueDao.findOne({key: key})
        .then(function (keyValue) {
            return res.jsonp(keyValue.toObject());
        })
        .catch(function (err) {
            return next(err);
        });
});

router.post('/', function (req, res, next) {
    let keyValue = _.pick(req.body, ['key', 'value']);

    return keyValueDao.create(keyValue)
        .then(function (keyValue) {
            return res.jsonp(keyValue.toObject());
        })
        .catch(function (err) {
            return next(err);
        });
});


router.put('/:key', function (req, res, next) {
    let key = _.get(req.body, 'key');
    let value = _.get(req.body, 'value');

    return keyValueDao.findOneAndUpdate({key: key}, {value: value}, {upsert: true})
        .then(function (keyValue) {
            return res.jsonp(keyValue.toObject());
        })
        .catch(function (err) {
            return next(err);
        });
});


router.delete('/:key', function (req, res, next) {
    let key = _.get(req.body, 'key');

    return keyValueDao.findOneAndDelete({key: key})
        .then(function (keyValue) {
            return res.jsonp(keyValue.toObject());
        })
        .catch(function (err) {
            return next(err);
        });
});

module.exports = router;

