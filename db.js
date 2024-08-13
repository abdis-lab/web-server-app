import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

console.log("MONGO_URI:", process.env.MONGO_URI);
// if (!process.env.MONGO_URI) {
//   throw new Error('MONGO_URI is not defined. Please check your .env file.');
// }
console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('Environment Variables:', process.env);

const uri = process.env.MONGO_URI;

// if (!uri) {
//   throw new Error('MONGO_URI is not defined. Please check your .env file.');
// }

mongoose.connect(uri);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

export default db;