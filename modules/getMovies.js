'use strict';
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;
const axios = require('axios');
const cache = require('./cache');




function getMovies(request, response) {

  const {searchQuery} = request.query;
  const API = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=${MOVIE_API_KEY}&format=json`;
  const key = 'Film' + searchQuery;

  if(cache[key] && (Date.now() -cache[key].timestamp) < 60000){
    console.log("***************...you have hit your cache");
    response.status(200).send(cache[key].data);
  }

  else {
    console.log("*******...You have missed your cache");
    axios.get(API)
      .then(res => {
        // console.log(res.data);
        const moviesFormatted = res.data.results.map(val => new Movies(val));
        cache[key] = {};  

        cache[key].data = moviesFormatted;
        cache[key].timestamp = Date.now();
        response.status(200).send(cache[key].data);

      })
      .catch(err => {
        console.error('error from super agent', err);
        response.status(500).send(`server error ${err}`);
      });

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
    this.timestamp = Date.now();

  }


}


module.exports = getMovies;

