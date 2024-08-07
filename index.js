import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Movie from './itemModel.js'; // Import the Movie model
import db from './db.js'; 

dotenv.config();

const app = express();
const port = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to enable CORS
app.use(cors());

// Route to render home page with items
app.get('/', async (req, res) => {
  try {
    const items = await Movie.find();
    res.render('home', { items: JSON.stringify(items) });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

// Route to render detail page for a specific movie
app.get('/detail/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      res.render('detail', { movie });
    } else {
      res.status(404).send('Movie not found');
    }
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

// Existing API Routes (for reference)
app.get('/api/items', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

app.get('/api/items/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(404).json({ error: 'Movie not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

app.delete('/api/items/:id', async (req, res) => {
  try {
    const result = await Movie.deleteOne({ _id: req.params.id });
    if (result.deletedCount > 0) {
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ success: false, error: 'Movie not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

app.post('/api/items', async (req, res) => {
  try {
    const { _id, title, director, year, genre, rating, duration, synopsis } = req.body;
    if (!_id) {
      const newMovie = new Movie({ title, director, year, genre, rating, duration, synopsis });
      await newMovie.save();
      res.status(201).json(newMovie);
    } else {
      const updatedMovie = await Movie.findByIdAndUpdate(
        _id,
        { title, director, year, genre, rating, duration, synopsis },
        { new: true, runValidators: true }
      );
      if (updatedMovie) {
        res.status(200).json(updatedMovie);
      } else {
        res.status(404).json({ error: 'Movie not found' });
      }
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});