const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRouter = require('./userRouter');
const morgan = require('morgan');
const cors = require('cors');

app.use(express.json());
app.use(morgan('dev'));

app.use(cors());

app.use('/api',userRouter);


app.listen(5000, () => {
    console.log("server connect");
})

mongoose.connect('mongodb://127.0.0.1:27017/userAuth')
  .then(() => {
    console.log('Connected to the database');
    // Do something after successful connection
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
    // Handle the connection error
  });




