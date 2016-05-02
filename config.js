exports.DB_PORT = process.env.MY_DB_URI || 'mongodb://localhost/db';
exports.serverPort = 3000;
exports.clientServerPort = 8080;

exports.serverUrl = 'http://localhost:'+exports.serverPort;
exports.clientServerUrl = 'http://localhost:'+exports.clientServerPort;
