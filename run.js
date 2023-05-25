const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 1500;

const server = http.createServer((req, res) => {
  if (req.url === '/task11.html') {
    fs.readFile('./task11.html', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Internal Server Error');
        return;
      }

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(data);
    });
  } else if (req.url === '/task11.js') {
    fs.readFile('./task11.js', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Internal Server Error');
        return;
      }

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/javascript');
      res.end(data);
    });
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});