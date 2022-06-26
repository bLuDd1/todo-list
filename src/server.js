'use strict';

const http = require('http');
const fs = require('fs');
const url = require('url');

const PORT = 8000;

const server = http.createServer((req, res) => {
  const parsedURL = url.parse(req.url, true);
  let path = parsedURL.path.replace(/^\/+|\/+$/g, '');
  if (path === '') path = 'index.html';
  console.log(`Requested path ${path}`);

  const file =  __dirname + '/' + path;
  fs.readFile(file, (err, content) => {
    if (err) {
      console.log(`File not found ${file}`);
      res.writeHead(404);
      res.end();
    } else {
      console.log(`Returning ${path}`);
      res.setHeader('X-Content-Type-Options', 'nosniff');
      switch (path) {
      case 'styles.css':
        res.writeHead(200, { 'Content-type': 'text/css' });
        break;
      case 'script.js':
        res.writeHead(200, { 'Content-type': 'application/javascript' });
        break;
      case 'index.html':
        res.writeHead(200, { 'Content-type': 'text/html' });
      }
      res.end(content);
    }
  });
});

server.listen(PORT, 'localhost', () => {
  console.log('Listening on port 8000');
});


