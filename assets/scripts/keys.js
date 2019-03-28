// const env = require('env');
require('dotenv').config();
// console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

// exports.omdb = {
//   key: process.env.OMDB_KEY
// }

// exports.bandsintown = {
//   key: process.env.BANDS_IN_TOWN_KEY
// }
