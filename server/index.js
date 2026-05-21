const express = require('express');
const connectDB = require('./Database');
const cors = require('cors');
const bookRoutes = require('./Routes/Book');



connectDB();

const app = express();


app.use(express.json());
app.use(cors());
app.use('/', bookRoutes);
app.use('/api/books', bookRoutes);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});