const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';
const mongoClient = new MongoClient(url, { useUnifiedTopology: true });


module.exports = { mongoClient }