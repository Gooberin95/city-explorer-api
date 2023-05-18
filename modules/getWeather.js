'use strict';
const axios = require('axios');
const WEATHER_BIT = process.env.WEATHER_BIT;
const cache = require('./cache');

function getWeather(request, response) {
  const { lat, lon } = request.query;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${WEATHER_BIT}`;
  const key = 'Film' + lat + lon;
  if (cache[key]) {
    console.log("you have hit your cache");
    response.status(200).send(cache[key].data);
  }
  else {
    console.log("You have missed your cache");
    axios.get(url)
      .then(res => {
        console.log(res.data);
        const weatherFormatted = res.data.data.map(val => new Forecast (val));
        cache[key] = {};
        cache[key].data = weatherFormatted;
        response.status(200).send(cache[key].data);

      })
      .catch(err => {
        console.error('error from super agent', err);
        response.status(500).send(`server error ${err}`);
      });

  }

}
class Forecast {
  constructor(obj) {
    this.description = obj.weather.description;
    this.temp = obj.temp;
    this.date = obj.datetime;
  }
}

module.exports = getWeather;
