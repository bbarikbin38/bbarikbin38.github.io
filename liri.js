require("dotenv").config();
//var keys = require("./keys.js");
//var spotify = new Spotify(keys.spotify);

// Including the axios and Spotify packages
var axios = require("axios");
var Spotify = require('node-spotify-api');
var fs = require("fs");

// storing the arguments in an array from the users input
var command = process.argv[2];
//how can i get the movie query to accept "+" into the query.  right now, if i search multiple strings, it only searches the last one i type in
var userInput = process.argv[3];


// creating a variable to hold the movie name
var movieName = "";
var groupName = "";

// this is looping through for the length of the users inputs based on the command being "movie-this"
if (command === "movie-this") {
    for (var i = 3; i < userInput.length; i++) {
        movieName = userInput;
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    }
    axios.get(queryUrl).then(
        function (response) {
            console.log("Title: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("Ratings IMDB: " + JSON.stringify((response.data.Ratings[0])));
            console.log("Ratings Rotten Tomatoes: " + JSON.stringify((response.data.Ratings[1])));
            console.log("Ratings Rotten Tomatoes: " + JSON.stringify((response.data.Ratings[2])));
        }
    );
}

// this is the concert command call if statement
if (command === "concert-this") {
    var axios = require("axios");
    for (var i = 3; i < userInput.length; i++) {
        groupName = userInput;
        var queryUrl = "https://rest.bandsintown.com/artists/" + groupName + "/events?app_id=codingbootcamp";
    }
    axios.get(queryUrl).then(
        function (response) {
            console.log(userInput + " is playing at " + response.data[0].venue.name);
            console.log("The show is located in: " + response.data[0].venue.city);
            console.log("The show is playing: " + response.data[0].datetime);
        }
    );
}

// this is the spotify command call if statement
if (command === "spotify-this") {
    //for this one, have to make the userInput position 4 because the type has to be set to a type at position 3 before you search 
    var type = process.argv[3];
    var userInput = process.argv.slice(4);
    var spotify = new Spotify({
        id: "022972de7d5647e297b40daa2ec59643",
        secret: "ae622befd0f24ea8975b185220292916"
    });

    spotify.search({ type: type, query: userInput }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(JSON.stringify("The Artist who created this is: " + data.tracks.items[0].artists[0].name));
        console.log(JSON.stringify("The song you are querying for is: " + userInput));
        console.log("Preview Link: " + data.tracks.items[0].href);
        console.log("Album for link above: " + JSON.stringify(data.tracks.items[0].album.name));
    });
}


//do-what-it-says portion
if (command === "do-what-it-says") {

    fs.readFile("random.txt", "utf8", function (error, fileInfo) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }
        console.log(fileInfo);
        var fileInfo = fileInfo.split(",");
        console.log(fileInfo);

    });
}