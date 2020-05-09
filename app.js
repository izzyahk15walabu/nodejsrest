const express = require('express');
const mongoose = require('mongoose');
const bodybarser = require('body-parser');
const BOOK = require('./models/booksModel');

const PORT = process.env.PORT || 3000;

const app = express();

const bookrouter = require('./router/bookRouter')(BOOK);

mongoose.connect(
  'mongodb://127.0.0.1:27017/bookAPI',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log('connected to data base');
  },
);

app.use(bodybarser.urlencoded({ extended: true }));
app.use(bodybarser.json());
app.use('/api', bookrouter);

app.get('/', (req, res) => {
  res.send('working');
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`listning on port${PORT} `);
});
 module.exports= app;