'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
app.use(cors());

const PORT = process.env.PORT;
const WEATHER_BIT = process.env.WEATHER_BIT;
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;
// app.get('/', (request, response) => {
//   response.status(200).send(weather);
// });


app.get('/movies', async (request, response) => {
  const {searchQuery} = request.query;
  const API = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=${MOVIE_API_KEY}&format=json`;

  const movieRes = await axios.get(API);
  console.log('Here is the url you searched:....', API);
  console.log(movieRes.data);
  let moviesFormatted = movieRes.data.results.map( val => new Movies(val));

  console.log(moviesFormatted);

  return response.status(200).send(moviesFormatted);
}
);

app.get('/weather',async (request, response) => {
  const { lat, lon,} = request.query;

  const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${WEATHER_BIT}`;
  console.log('This is the url', url);
  let weatherResponse = await axios.get(url);
  let formattedData = weatherResponse.data.data.map( val => new Forecast(val));
  
  console.log('this is weather response', formattedData);
  

  return response.status(200).send(formattedData);
  
}
);

class Forecast {
  constructor(obj) {
    this.description = obj.weather.description;
    this.temp = obj.temp;
    this.date = obj.datetime;
  }
}

class Movies {
  constructor(obj) {
    this.title = obj.title;
    this.overview = obj.overview;
    this.average_votes = obj.vote_average;
    this.total_votes = obj.vote_count;
    this.image_url = obj.poster_path;
    this.popularity = obj.popularity;
    this.released_on = obj.release_date;


  }
}


app.listen(PORT, () => console.log(`listening on port ${PORT}`));


