exports.DB_PORT = process.env.MY_DB_URI || 'mongodb://localhost/db';
// exports.serverPort = 3000;
// exports.clientServerPort = process.env.PORT || 8080;

// exports.serverUrl = 'http://localhost:'+exports.serverPort;
// exports.clientServerUrl = 'http://localhost:'+exports.clientServerPort;

//squashed server
exports.PORT = process.env.PORT;
exports.serverPort = exports.PORT;
exports.clientServerPort = exports.PORT;

exports.serverUrl = 'http://localhost:'+exports.serverPort;
exports.clientServerUrl = 'http://localhost:'+exports.clientServerPort;
