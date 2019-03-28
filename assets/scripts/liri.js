
require('dotenv').config();
const fs = require('fs');
const keys = require('./keys.js');
const axios = require('axios');
const Spotify = require('node-spotify-api');

const spotify = new Spotify(keys.spotify)
// const bandsintown = new Bandsintown(keys.bandsintown);

const action = process.argv[2];
const nodeArguments = process.argv

const valueArg = function() {
  for (let i = 3; i < nodeArguments.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
      movieName = movieName + "+" + nodeArguments[i];
    }
    else {
      movieName += nodeArguments[i];
    }
  }
}


const queryUrl = function(input){
  if (action==='movie-this'){
    return "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";
  }
  else if (action==='concert-this') {
    return 'https://rest.bandsintown.com/artists/' + input + '/events?app_id=codingbootcamp';
  }
  else if (action==='spotify-this-song') {
    spotify.search({ type: 'track', query: queryUrl }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
    console.log(data);
    });
  }
}


switch (action) {
  case 'concert-this':
    concertQuery(valueArg);
    break;
  case 'spotify this song':
    spotifyQuery(valueArg);
    break;
  case 'movie-this':
    movieQuery(valueArg);
    break;
  case 'do-what-it-says':
    doSomethingQuery();
    break;
  }