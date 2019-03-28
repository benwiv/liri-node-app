
require('dotenv').config();
const keys = require('./keys.js');
const fs = require('fs');
const axios = require('axios');
const Spotify = require('node-spotify-api');

//  setup spotify node connection with hidden keys
const spotify = new Spotify(keys.spotify);

//  USER ARGUMENTS TAKEN
const action = process.argv[2];
const nodeArguments = process.argv;

//  container for nodeArguments formatted to URL specs
let valueArg='';
for (let i = 3; i < nodeArguments.length; i++) {
  if ((action==='movie-this')||(action==='concert-this')){
    if (i > 3 && i < nodeArguments.length) {
      valueArg = valueArg + "+" + nodeArguments[i];
    }
    else {
      valueArg += nodeArguments[i];
    }
  }
  else if (action==='spotify-this-song'){
    if (i > 3 && i < nodeArguments.length) {
      valueArg = valueArg + " " + nodeArguments[i];
    }
    else {
      valueArg += nodeArguments[i];
    }
  }
};

const doSomethingQuery= function(){
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }
    
    let dataSong = data.split(",");
    spotify.search({ type: 'track', query: dataSong[1] }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      console.log('hi there you wild and crazy animal');
      console.log(`go to this link for the purpose of life: ${data.tracks.items[0].external_urls.spotify}`);
    });
  });
}

//  SWITCH for inputs

switch (action) {
  case 'concert-this':
    let queryUrlConcert = 'https://rest.bandsintown.com/artists/' + valueArg + '/events?app_id=codingbootcamp'
    axios.get(queryUrlConcert)
      .then(function(response) 
      {
        console.log(response.data[0]);
        console.log(`Venue: ${response.data[0].venue.name}`);
        console.log(`Location: ${response.data[0].venue.city}, ${response.data[0].venue.country}`);
        console.log(`Date: ${response.data[0].datetime}`);
      });
    break;
  case 'spotify-this-song':
    spotify.search({ type: 'track', query: valueArg }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      console.log(`Artist: ${data.tracks.items[0].artists[0].name}`);
      console.log(`Song: ${data.tracks.items[0].name}`);
      console.log(`Preview Link: ${data.tracks.items[0].external_urls.spotify}`);
      console.log(`Album: ${data.tracks.items[0].album.name}`);
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