const express = require('express');
const bodyParser = require('body-parser');
const PORT = require('./config').serverPort;

const app = new express();
const router = new express.Router();

const models = require('./models');

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
})


app.use(router);

app.listen(PORT, () => console.log('server speaking on '+PORT));
