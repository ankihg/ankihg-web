'use strict';
const mongoose = require('mongoose');

const DB_PORT = require('../config').DB_PORT;
mongoose.connect(DB_PORT);

let models = {};

require('./project.js')(mongoose, models);
require('./user.js')(mongoose, models);

module.exports = models;
