const cheerio = require('cheerio');
const request = require('request');

module.exports = {
	name: '&search',
	description: 'Searches web and pulls a random image from it based on user query',
	usage: 'command name UR QUERY',
	execute(message, args) {
		message.channel.bulkDelete(1);
		//console.log(message);
		var name = message.content.slice(message.content.indexOf(' ')+1);
		//console.log(name);
		name.replace(/\s/g, '+'); 
		var temp = "http://results.dogpile.com/serp?qc=images&q=" + name;
		//console.log(temp);
		var options = {
			url: temp,
			method: "GET",
			headers: {
				"Accept": "text/html",
				"User-Agent": "Chrome",
			}
		};
		//console.log(options);
		request(options, function(error, response, responseBody){
			if(error){
				return;
			}
			
			$ = cheerio.load(responseBody);
			
			var links = $(".image a.link");
			var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
			
			//console.log(urls);
			if(!urls.length){
				return;
			}
			message.channel.send( urls[Math.floor(Math.random() * urls.length)]);
		});
	},
};