import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  director: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String, required: true },
  rating: { type: Number, required: true },
  duration: { type: Number, required: true },
  synopsis: { type: String, required: true },
});

// The model name 'Movie' will map to the 'movies' collection by default
const Movie = mongoose.model('movie', movieSchema);

export default Movie;