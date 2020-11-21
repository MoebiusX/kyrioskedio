'use strict';

const path = require('path');

// Database configuration
module.exports.mysql = {
    host: 'localhost',
    user: 'root',
    password: 'lala5555',
    database: 'kyrioskedio',
};

module.exports.webpages = path.join(__dirname, '/public/');
module.exports.localimg = module.exports.webpages + 'img/';
module.exports.webimg = '/img/';