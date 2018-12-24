const mongooseService = require('../services/mongooseService');
const mongoose = mongooseService.mongoose;
const KeyValue = mongoose.model('KeyValue');

const keyValueDao = {};

keyValueDao.model = KeyValue;

keyValueDao.find = function (conditions, projection, options) {
    return keyValueDao.model.find(conditions, projection, options).exec();
};

keyValueDao.findById = function (id, projection, options) {
    return keyValueDao.model.findById(id, projection, options).exec();
};

keyValueDao.findByIdAndDelete = function (id, options) {
    return keyValueDao.model.findByIdAndDelete(id, options).exec();
};

keyValueDao.findByIdAndUpdate = function (id, update, options) {
    return keyValueDao.model.findByIdAndUpdate(id, update, options).exec();
};


keyValueDao.create = function (data) {
    return keyValueDao.model.create(data);
};

keyValueDao.countDocuments = function (filter) {
    return keyValueDao.model.countDocuments(filter).exec();

};

keyValueDao.deleteMany = function (conditions, options) {
    return keyValueDao.model.deleteMany(conditions, options).exec();
};


keyValueDao.deleteOne = function (conditions) {
    return keyValueDao.model.deleteOne(conditions).exec();
};

keyValueDao.findOne = function (conditions, projection, options) {
    return keyValueDao.model.findOne(conditions, projection, options).exec();
};

keyValueDao.findOneAndDelete = function (conditions, options) {
    return keyValueDao.model.findOneAndDelete(conditions, options).exec();
};

keyValueDao.findOneAndRemove = function (conditions, options) {
    return keyValueDao.model.findOneAndRemove(conditions, options).exec();
};

keyValueDao.findOneAndUpdate = function (conditions, update, options) {
    return keyValueDao.model.findOneAndUpdate(conditions, update, options).exec();
};

keyValueDao.aggregate = function (pipeline) {
    return keyValueDao.model.aggregate(pipeline).exec();
};

module.exports = keyValueDao;