'use strict';
const express = require('express');

express()
  .use(require('body-parser').json())
  .use((req, res, next) => {console.log(`${req.method} request for ${req.url}`); next(); })
  .use(express.static('./build'))
  .listen(8080, () => console.log('client-server speaking on 8080'));
