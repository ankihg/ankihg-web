'use strict';
const express = require('express');
const PORT = require('./config').clientServerPort

express()
  .use(require('body-parser').json())
  .use((req, res, next) => {console.log(`${req.method} request for ${req.url}`); next(); })
  .use(express.static('./build'))
  .listen(PORT, () => console.log('client-server speaking on '+PORT));
