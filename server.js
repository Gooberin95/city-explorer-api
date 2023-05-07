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
  




  class Ruler {
    constructor(obj) {
      this.city_name = obj.name;
      this.lon = obj.lon;
      this.lat = obj.lat;
    }
  }


}
);


app.listen(PORT, () => console.log(`listening on port ${PORT}`));


