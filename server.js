'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT;
app.use(cors());
const getWeather = require('./modules/getWeather.js');
const getMovies = require('./modules/getMovies.js');
const notFound = require('./modules/notFound.js');

// app.get('/', (request, response) => {
//   response.status(200).send(weather);
// });


app.get('/movies', getMovies);
app.get('/weather', getWeather);
app.use('*', notFound);

app.listen(PORT, () =>{
  console.log(`listening on ${PORT}`);
});


