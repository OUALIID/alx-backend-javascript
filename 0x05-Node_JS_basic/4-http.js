const http = require('http');

const app = http.createServer((req, res) => {
  // req : request and res : response
  res.end('Hello Holberton School!');
});

app.listen(1245);
module.exports = app;
