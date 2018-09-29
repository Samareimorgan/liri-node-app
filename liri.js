require("dotenv").config();

var keys =require("./key.js");

//var spotify = new Spotify(keys.spotify);

var liri = {
    
   concert: function(artist) {
    var moment = require("moment");
    var artist = process.argv.slice(3).join(" ");

       if(process.argv[2] === "concert-this") {
        var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp&date=upcoming";

            var request = require("request");
            request(queryURL, function(error, response, body) {
                

            // If the request is successful
                if (!error && response.statusCode === 200) {
                // ...

                var info = JSON.parse(body);
                var date = moment(info[0].datetime).format("MMM, D, YYYY  H:MM");
                  console.log("*--------- NEXT EVENT FOR " + artist+ " ----------------*");
                
                  console.log("The venue name is: " + info[0].venue.name);
                  console.log("The venue location is: " + info[0].venue.city + "," + info[0].venue.region );
                  console.log("The date and time is: " + date);
                  console.log("*--------- END EVENT INFO ----------------*");
                }
                
            })
        
        }
    },
    movie: function(movieName) {
    var movieName = process.argv.slice(3).join(" ");

        if(process.argv[2] === "movie-this") {
        var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

            var request = require("request");
            request(queryURL, function(error, response, body) {

            // If the request is successful
                if (!error && response.statusCode === 200) {
                // ...

                // Then log the Release Year for the 
                console.log("*---------MOVIE INFO----------------*")
                console.log("The movie is: " + JSON.parse(body).Title);
                console.log("The Year Released: " + JSON.parse(body).Year);
                console.log("The IMBD Rating: " + JSON.parse(body).Ratings[0].Value);
                console.log("The Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
                console.log("Movie was Produced in: " + JSON.parse(body).Country);
                console.log("The Movie Language is: " + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);
                console.log("*---------END MOVIE INFO---------------*")

                }
            })
        }
    },
    spotify: function() {
        if(process.argv[2]=== "spotify-this-song") {
            var Spotify = require("node-spotify-api");
    
            var spotify = new Spotify({
                id: process.env.SPOTIFY_ID,
                secret: process.env.SPOTIFY_SECRET

            });
        
            var queryTerm = process.argv.slice(3).join(" ");

            spotify
            .search({ type: 'track', query: queryTerm })
            .then(function(response) {
                var songResponse = (response.tracks.items[0]);
                console.log("*---------SONG INFO----------------*")

                console.log("Artist Name: " + songResponse.artists[0].name);
                console.log("Song Name: " +songResponse.name);
                console.log("Album Name: " + songResponse.album.name);
                console.log("Song URL: " + songResponse.preview_url);

                console.log("*---------END INFO---------------*")
            })
            .catch(function(err) {
                console.log(err);
            });

        }
    },
    randomTxtSays: function () {

        if(process.argv[2] === "do-what-it-says") {
        
            var fs = require("fs");
            fs.readFile("random.txt","utf8", function(error, data){
                if(error) {return console.log(error);
                }
                var dataArr = data.split (",");
                //console.log(dataArr[0]);
                if(dataArr[0]==="spotify-this-song") {
                    console.log(JSON.parse(dataArr[1]));
                        var Spotify = require("node-spotify-api");
                
                        var spotify = new Spotify({
                            id: process.env.SPOTIFY_ID,
                            secret: process.env.SPOTIFY_SECRET
            
                        });
                    
                        var queryTerm = JSON.parse(dataArr[1]);
            
                        spotify
                        .search({ type: 'track', query: queryTerm })
                        .then(function(response) {
                            var songResponse = (response.tracks.items[0]);
                            console.log("*---------SONG INFO----------------*")
            
                            console.log("Artist Name: " + songResponse.artists[0].name);
                            console.log("Song Name: " +songResponse.name);
                            console.log("Album Name: " + songResponse.album.name);
                            console.log("Song URL: " + songResponse.preview_url);
            
                            console.log("*---------END INFO---------------*")
                        })
                        .catch(function(err) {
                            console.log(err);
                        });
            
                    }
                
                if(dataArr[0] === "concert-this") {
                   
                }
                if(dataArr[0] === "movie-this") {
                    var input = dataArr[1]; 
                    liri.movie(input);
                }
                
            })
        }

    }
};

liri.concert();
liri.movie();
liri.spotify();
liri.randomTxtSays();

