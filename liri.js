require("dotenv").config();

var keys = require("./key.js");
var spotify = new Spotify(keys.spotify);


//functions...


node liri.js concert-this <artist/band name here>




This will search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") for an artist and render the following information about each event to the terminal:


Name of the venue
Venue location
Date of the Event (use moment to format this as "MM/DD/YYYY")