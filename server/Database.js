const mongoose = require('mongoose');

const connectDB = async () => {
  mongoose.connect('mongodb+srv://manjeetmaurya7785_db_user:f9Q4YLCbY2Y26jSX@alldata.a9zrfm3.mongodb.net/book')
    .then(() => {
      console.log('Database connected successfully');
    }
    )
    .catch((err) => {
      console.log('Database connection failed', err);
    }
    );
}

module.exports = connectDB;