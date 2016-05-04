'use strict';
module.exports = function(buf) {
  for (let i=0; i<buf.length; i++) {
    buf.writeUInt8(0, i);
  }
};
