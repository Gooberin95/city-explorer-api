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
    let read = x.data.map(val => new Forecast(val));
    response.status(200).send(read);
  }
  else if (searchQuery === 'Paris' && lat === '2.3200410217200766' && lon === '48.8588897') {
    let a = weather.find(val => val.city_name === searchQuery);
    let data = a.data.map( val => new Forecast(val));
    response.status(200).send(data);
  }
  else if (searchQuery === 'Amman' && lat === '35.9239625' && lon === '31.9515694') {
    let one = weather.find(val => val.city_name === searchQuery);
    let two = weather.findIndex(val => val.city_name === searchQuery);
    let dayOf = one.data.map( val => new Forecast(val));
    // let weath = weather.map((val ) => val.data[2].weather);
    console.log(`Amman is at index ${two}`);

    console.log(dayOf);
    console.log(one);

    response.status(200).send(dayOf);
  }

  return response.status(200).send('Error');
}
);

class Forecast {
  constructor(obj) {
    this.left = obj.moonrise_ts;
    this.right = obj.high_temp;
  }
}


app.listen(PORT, () => console.log(`listening on port ${PORT}`));


