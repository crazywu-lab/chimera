const mongoose = require('mongoose');

const db = {};
db.mongoose = mongoose;
// db.url = process.env.MONGODB_URI;

db.url = 'mongodb://127.0.0.1:27017/test';

module.exports = db;