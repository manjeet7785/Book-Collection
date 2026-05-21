const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  BookName: {
    type: String,
    required: true
  },
  Description: {
    type: String,
    required: true
  },
  Author: {
    type: String,
    required: true
  },
  Price: {
    type: Number,
    required: true
  },
  PublishedDate: {
    type: Date,
    required: true
  }
});
module.exports = mongoose.model('Book', bookSchema);
