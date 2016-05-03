'use strict';
module.exports = (router, models) => {
  require('./projects')(router, models);
  require('./auth')(router, models);
}
