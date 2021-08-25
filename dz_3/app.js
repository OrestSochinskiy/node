const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const expressHbs = require('express-handlebars');
const path = require('path');

const { PORT } = require('./config/variables');
const {
  helloPageRouter, loginRouter, registerRouter, userRouter
} = require('./router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({ defaultLayout: false }));
app.set('views', path.join(__dirname, 'static'));

app.use('/', helloPageRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/users', userRouter);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('APP LISTEN', PORT);
});
