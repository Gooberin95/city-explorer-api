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
    let dates = weather.map( (val ) => val.data[0].datetime);
    let descr = weather.map((val ) => val.data[0].weather);
    console.log(`Seattle is at index ${y}`);
    console.log(dates);
    

    response.status(200).send(descr);
  }
  else if (searchQuery === 'Paris' && lat === '2.3200410217200766' && lon === '48.8588897') {
    let a = weather.find(val => val.city_name === searchQuery);
    let b = weather.findIndex(val => val.city_name === searchQuery);
    let day = weather.map( (val ) => val.data[1].datetime);
    let condit = weather.map( (val) => val.data[1].weather);
    console.log(`Paris is at index ${b}`);
    console.log(day);

    response.status(200).send(condit);
  }
  else if (searchQuery === 'Amman' && lat === '35.9239625' && lon === '31.9515694') {
    let one = weather.find(val => val.city_name === searchQuery);
    let two = weather.findIndex(val => val.city_name === searchQuery);
    let dayOf = weather.map( (val ) => val.data[2].datetime);
    let weath = weather.map((val ) => val.data[2].weather);
    console.log(`Amman is at index ${two}`);
    console.log(dayOf);

    response.status(200).send(weath);
  }

  return response.status(200).send('Error');
}
);



app.listen(PORT, () => console.log(`listening on port ${PORT}`));


