import http from 'http';
import Movie from './itemModel.js'; // Import the Movie model
import db from './db.js';

const hostname = 'localhost';
const port = 3000;

const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    if (req.url === '/') {
      const movies = await Movie.find(); // Fetch all movies
      res.statusCode = 200;
      res.end(JSON.stringify(movies));
    } else if (req.url.startsWith('/detail')) {
      const id = req.url.split('/')[2];
      const movie = await Movie.findById(id); // Find a movie by ID
      if (movie) {
        res.statusCode = 200;
        res.end(JSON.stringify(movie));
      } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: 'Movie not found' }));
      }
    } else if (req.url.startsWith('/delete')) {
      const id = req.url.split('/')[2];
      const result = await Movie.deleteOne({ _id: id }); // Delete a movie by ID
      if (result.deletedCount > 0) {
        res.statusCode = 200;
        res.end(JSON.stringify({ success: true }));
      } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ success: false, error: 'Movie not found' }));
      }
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: 'Not Found' }));
    }
  } catch (err) {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: 'Internal Server Error', message: err.message }));
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});