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
  const { listType } = request.query;
  if (listType === 'Seattle') {
    let x = weather.find(val => val.city_name);
    response.status(200).send(x);
  }
  else if (listType === 'Paris') {
    let y = weather.find(val => val.city_name === listType);
    
    response.status(200).send(y);
  }
  else if (listType === 'Amman') {
    let z = weather.find(val => val[2].city_name);
    response.status(200).send(z);
  }

  return response.status(200).send('Error');

  
}
);
class Forecast {
  constructor(obj) {
    this.description = obj.description;
    this.date = obj.date;
  }
}


app.listen(PORT, () => console.log(`listening on port ${PORT}`));


