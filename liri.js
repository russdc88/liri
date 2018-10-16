var request = require('request');


require("dotenv").config();

var Spotify = require('node-spotify-api')

var keys = require("./keys.js")

// const OmdbApi = require('omdb-api-pt')

// // Create a new instance of the module.
// const omdb = new OmdbApi({
//   apiKey :"trilogy", // Your API key.

// })

var omdbApi = require('omdb-client');

var params = {
	apiKey: 'trilogy',
	title: 'Terminator',
	year: 2012
}




var spotify = new Spotify(keys.spotify);







command = process.argv[2]

var request1 = process.argv.slice(3).join(" ");
// If searching for a song....
if (command === "spotify-this-song") {
	if (!request1) {
		request1 = "The Sign"
	}

	spotify
		.search({ type: 'track', query: request1, limit: 10 })
		.then(function (response) {

			// console.log(response)
			for (var i = 0; i < 10; i++) {
				//This give me the band name
				console.log("\nBand Name: " + response.tracks.items[i].artists[0].name);
				// // This gives me the song name
				console.log("Song: " + response.tracks.items[i].name);
				// 	//Preview Link
				console.log("Preview Link: " + response.tracks.items[i].external_urls.spotify);
				// // This gives me the Albums Name
				console.log("Album: " + response.tracks.items[i].album.name + "\n-----------------------------------------------------");
			}
		})
		.catch(function (err) {
			console.log(err);
		});

}

if (command === "movie-this") {
	if (!request1) {
		request1 = "Mr. Nobody"
	}
	// omdb.bySearch({
	// 	search: 'House',
	// 	type: 'series',
	// 	year: '2004',
	// 	page: 1
	// }).then(res => console.log(res))
	// 	.catch(err => console.error(err))	

	
		var URL = "http://www.omdbapi.com/?apikey=1e888fd6&t="
			+ request1;

		request(URL, function (err, response, body) {
			// parse the response body (string) to a JSON object
			var jsonData = JSON.parse(body);
			
			console.log("\n Movie: " + jsonData.Title)
			console.log("Year: " + jsonData.Year)
			console.log("IMDB Rating: " + jsonData.Ratings[0].Value)
			console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value)
			console.log("Production Location(s): " + jsonData.Country)
			console.log("Language: " + jsonData.Language)
			console.log("Plot: " + jsonData.Plot)
			console.log("Actors in Movie: " + jsonData.Actors + "\n----------------------------")
		});
	}

	if (command ==="concert-this"){
		if(!request1){
			console.log("Please add in an artist. Try again.")
		}
		var URL = "https://rest.bandsintown.com/artists/" + request1 + "/events?app_id=codingbootcamp";

		request(URL, function (err, response, band) {
			// parse the response body (string) to a JSON object
			var jsonData = JSON.parse(band);
			console.log("Venue: " + jsonData[0].venue.name)
			console.log("Location: " + jsonData[0].venue.city + ", " + jsonData[0].venue.country)
			console.log("Date: " + jsonData[0].datetime)
		})

	}
