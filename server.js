'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
app.use(cors());

const PORT = process.env.PORT;
const WEATHER_BIT = process.env.WEATHER_BIT;

// app.get('/', (request, response) => {
//   response.status(200).send(weather);
// });

app.get('/weather',async (request, response) => {
  const { lat, lon} = request.query;

  const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${WEATHER_BIT}`;
  console.log('This is the url', url);
  let weatherResponse = await axios.get(url);
  let formattedData = weatherResponse.data.data.map( val => new Forecast(val));
  
  console.log('this is weather response', formattedData);
  // if (searchQuery === 'Seattle' && lat === '-122.330062' && lon === '47.6038321') {
  //   let x = url.find(val => val.city_name === searchQuery);
  //   let read = x.data.map(val => new Forecast(val));
  //   response.status(200).send(read);
  // }
  // else if (searchQuery === 'Paris' && lat === '2.3200410217200766' && lon === '48.8588897') {
  //   let a = url.find(val => val.city_name === searchQuery);
  //   let data = a.data.map( val => new Forecast(val));
  //   response.status(200).send(data);
  // }
  // else if (searchQuery === 'Amman' && lat === '35.9239625' && lon === '31.9515694') {
  //   let one = url.find(val => val.city_name === searchQuery);
  //   let two = url.findIndex(val => val.city_name === searchQuery);
  //   let dayOf = one.data.map( val => new Forecast(val));
  //   // let weath = weather.map((val ) => val.data[2].weather);
  //   console.log(`Amman is at index ${two}`);

  //   console.log(dayOf);
  //   console.log(one);

  //   response.status(200).send(dayOf);
  // }

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


app.listen(PORT, () => console.log(`listening on port ${PORT}`));


