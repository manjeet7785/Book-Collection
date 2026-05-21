require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb+srv://manjeetmaurya7785_db_user:f9Q4YLCbY2Y26jSX@alldata.a9zrfm3.mongodb.net/book';
  try {
    await mongoose.connect(mongoUri);
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Database connection failed', err);
    throw err;
  }
};

module.exports = connectDB;