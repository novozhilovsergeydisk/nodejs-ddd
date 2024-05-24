'use strict';

const server = require('./http.js');
const staticServer = require('./static.js');
const db = require('./db.js');

const routing = {
  test: require('./test.js'),
  user: require('./user.js'),
  country: db('country'),
  city: db('city'),
};

//console.log({ routing })

staticServer('./static', 8000);
server(routing, 8001);
