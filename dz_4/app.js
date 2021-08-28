const express = require('express');
const mongoose = require('mongoose');

const { PORT } = require('./config/variables');
const { userRouter } = require('./routes');

const app = express();

mongoose.connect('mongodb://localhost:27017/apr-2021');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);

app.listen(PORT, () => {
  console.log('APP LISTEN', PORT);
});
