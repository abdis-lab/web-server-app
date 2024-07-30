import http from 'http';

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  
  switch (req.url) {
    case '/':
      res.statusCode = 200;
      res.end('Welcome to the home page!');
      break;
    case '/about':
      res.statusCode = 200;
      res.end('About me: I am a Node.js developer.');
      break;
    default:
      res.statusCode = 404;
      res.end('404 Not Found');
      break;
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});