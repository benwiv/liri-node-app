
require('dotenv').config();
const fs = require('fs');
const keys = require('./keys.js');
const axios = require('axios');
const Spotify = require('node-spotify-api');

//  setup spotify node connection with hidden keys
const spotify = new Spotify(keys.spotify);

//  USER ARGUMENTS TAKEN
const action = process.argv[2];
const nodeArguments = process.argv

//  container for nodeArguments formatted to URL specs
let valueArg='';
for (let i = 3; i < nodeArguments.length; i++) {
  if (i > 3 && i < nodeArguments.length) {
    valueArg = valueArg + "+" + nodeArguments[i];
  }
  else {
    valueArg += nodeArguments[i];
  }
}

//  container for nodeArguments formatted to Spotify specs
let valueArgSpot='';
for (let i = 3; i < nodeArguments.length; i++) {
  if (i > 3 && i < nodeArguments.length) {
    valueArgSpot = valueArgSpot + " " + nodeArguments[i];
  }
  else {
    valueArgSpot += nodeArguments[i];
  }
}

const doSomethingQuery= function(){
  
}

//  SWITCH for inputs
switch (action) {
  case 'concert-this':
    let queryUrlConcert = 'https://rest.bandsintown.com/artists/' + valueArg + '/events?app_id=codingbootcamp'
    axios.get(queryUrlConcert)
      .then(function(response) 
      {
        console.log(response);
        console.log(`Venues: ${response.data.venue.name}`);
        console.log(`Venues: ${response.data.venue.city}, ${response.data.venue.country}`);
        console.log(`Venues: ${response.data.venue.datetime}`);
      });
    break;
  case 'spotify this song':
    spotify.search({ type: 'track', query: queryUrl(valueArgSpot) }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
    console.log(data);
    });
    break;
  case 'movie-this':
    let queryUrlMovie = 'http://www.omdbapi.com/?t=' + valueArg + '&y=&plot=short&apikey=trilogy'
    console.log(queryUrlMovie);
    axios.get(queryUrlMovie)
      .then(function(response) 
      {
        console.log(response);
        console.log(`Title: ${response.data.Title}`);
        console.log(`Release Year: ${response.data.Year}`);
        console.log(`IMDb rating: ${response.data.imdbRating}`);
        console.log(`Rotten Tomatoes Rating: ${response.data.Ratings[0]}`);
        console.log(`Produced In: ${response.data.Country}`);
        console.log(`Language: ${response.data.Language}`);
        console.log(`Plot: ${response.data.Plot}`);
        console.log(`Cast: ${response.data.Actors}`);
      });
    break;
  case 'do-what-it-says':
    doSomethingQuery();
    break;
  }