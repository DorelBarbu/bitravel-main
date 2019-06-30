const mognoose = require('mongoose');
const { DATABASE_URL } = require('../constants/urls');

const db = mognoose.connect(DATABASE_URL, { useNewUrlParser: true });

module.exports = db;