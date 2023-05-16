'use strict';
const axios = require('axios');
const WEATHER_BIT = process.env.WEATHER_BIT;


function getWeather(request, response, lat, lon) {
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${WEATHER_BIT}`;
  axios
    .get(url)
    .then(res => {
      console.log(res.data);
      const formattedData = res.data.results.map(val => new Forecast (val));
      response.status(200).send(formattedData);

    })
    .catch(err => {
      console.error('error from super agent', err);
      response.status(500).send(`server error ${err}`);
    });
}


class Forecast {
  constructor(obj) {
    this.description = obj.weather.description;
    this.temp = obj.temp;
    this.date = obj.datetime;
  }
}

module.exports = getWeather;
