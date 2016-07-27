const path = require('path');

function sendHome(req, res) {
  res.sendFile(path.resolve(`${__dirname}/../../client/index.html`));
}

module.exports = {
  sendHome,
};
