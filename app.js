const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv/config');
const postRoute = require('./routes/post.js');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use('/api/v1/posts', postRoute);

app.get('/' , (req, res) => {
  res.status(200).sendFile('./index.html', {root: __dirname})
});

const port = 3000;
const host = 'localhost';

mongoose.connect(process.env.DB_CONNECTION, () => {
  console.log('we are connected to mongodb server');
});

app.listen(port, host, () => {
  console.log(`server sedang berjalan dengan host: ${host} port: ${port}`)
});