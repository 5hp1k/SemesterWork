const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 1500;

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    fs.readFile('./index.html', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Internal Server Error');
        return;
      }

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(data);
    });
  } else if (req.url === '/main.js') {
    fs.readFile('./main.js', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Internal Server Error');
        return;
      }

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/javascript');
      res.end(data);
    });
  } else if (req.url === '/cardOperations.mjs') {
    fs.readFile('./cardOperations.mjs', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Internal Server Error');
        return;
      }

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/javascript');
      res.end(data);
    });
  } else if (req.url === '/player.mjs') {
    fs.readFile('./player.mjs', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Internal Server Error');
        return;
      }

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/javascript');
      res.end(data);
    });
  } else if (req.url === '/dealer.mjs') {
    fs.readFile('./dealer.mjs', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Internal Server Error');
        return;
      }

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/javascript');
      res.end(data);
    });
  } else if (req.url === '/styles.css') {
      fs.readFile('./styles.css', (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end('Internal Server Error');
          return;
        }
  
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/css');
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