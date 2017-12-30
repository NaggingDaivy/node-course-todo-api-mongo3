var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var mongodb_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp';

mongoose.connect(mongodb_URI);

module.exports = {
    mongoose
};