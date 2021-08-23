const express = require('express');

const { PORT } = require('./config/variables');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { userRouter, authRouter } = require('./routes');

app.get('/', (req, res) => {
  // eslint-disable-next-line no-console
  console.log(req);
  res.status(404).end('Not found');
});

app.use('/users', userRouter);
app.use('/auth', authRouter);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('App listen', PORT);
});
