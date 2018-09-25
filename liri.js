<script src="./../dist/bit-events.min.js"></script>
require("dotenv").config();

//var keys = require("./key.js");
//var spotify = new Spotify(keys.spotify);



var artist = process.argv[2];
//Bands in Town ********************************
    function concertThis(artist) {
        
        var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

        $.ajax({
        url: queryURL,
        method: "GET"
        })
        .then(function(response) {
            var results = response.data;
            console.log(results);

        // for (var i = 0; i < results.length; i++) {
            

            //}
        });
    }

concertThis(artist);

/*pseudo Code 
Bands in Town -  Need to create and AJAX get, so that when concert-this is in the process.argv[2] and the artist is in the process.argv[3] the get will run.  
Would concert-this be a function? (Hyphen seems to disrupt it, so for now i will make it concertThis and ask about the hyphen in class) .  Perhaps I need the function to be an if statement.  if(concert-this === process.argv[2]) { 

}




function concert-this() {

}

node liri.js concert-this <artist/band name here>




This will search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") for an artist and render the following information about each event to the terminal:


Name of the venue
Venue location
Date of the Event (use moment to format this as "MM/DD/YYYY") */