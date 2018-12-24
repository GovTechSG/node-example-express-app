const _ = require('lodash');
const path = require('path');

const CONFIG_FILE =  _.get(process.env, 'CONFIG_FILE', 'config.js');

const config = require(path.resolve(process.cwd(), 'config', CONFIG_FILE));

module.exports = {
    get: function(key, defaultValue) {
        return _.get(config, key, defaultValue);
    },
    has: function(key) {
        return _.has(config, key);
    },
    env: function(key, defaultValue) {
        return _.get(process.env, key, defaultValue);
    }
};



