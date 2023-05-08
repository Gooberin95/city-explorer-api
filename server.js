'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weather = require('./data/weather.json');
const app = express();
app.use(cors());

const PORT = process.env.PORT;

app.get('/', (request, response) => {
  response.status(200).send(weather);
});

app.get('/weather', (request, response) => {
  const { lat, lon, searchQuery } = request.query;
  if (searchQuery === 'Seattle' && lat === '-122.330062' && lon === '47.6038321') {
    let x = weather.find(val => val.city_name === searchQuery);
    let y = weather.findIndex(val => val.city_name === searchQuery);
    let names = weather.map( (val ) => val.data[0].datetime);
    console.log(`Seattle is at index ${y}`);
    console.log(names);

    response.status(200).send(names);
  }
  else if (searchQuery === 'Paris') {
    let a = weather.find(val => val.city_name === searchQuery);
    let b = weather.findIndex(val => val.city_name === searchQuery);
    let names = weather.map( (val ) => val.data[1].datetime);
    console.log(`Paris is at index ${b}`);
    console.log(names);

    response.status(200).send(names);
  }
  else if (searchQuery === 'Amman') {
    let one = weather.find(val => val.city_name === searchQuery);
    let two = weather.findIndex(val => val.city_name === searchQuery);
    let names = weather.map( (val ) => val.data[2].datetime);
    console.log(`Amman is at index ${two}`);
    console.log(names);

    response.status(200).send(names);
  }

  return response.status(200).send('Error');
}
);



app.listen(PORT, () => console.log(`listening on port ${PORT}`));


