const path = require('path');
const express = require('express');
const app = express();
const appName = 'versaim-app';

const forceSSL = function() {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
    next();
  }
}
// app.use(forceSSL());

app.use(express.static(__dirname + `/dist/${appName}`));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + `/dist/${appName}/index.html`));
});

app.listen(process.env.PORT || 8090);