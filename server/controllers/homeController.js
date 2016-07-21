var path = require('path');

var sendHome = function(req, res) {
  res.sendFile(path.resolve(__dirname + '/../../client/index.html'));
}

module.exports = {
  sendHome: sendHome
}
