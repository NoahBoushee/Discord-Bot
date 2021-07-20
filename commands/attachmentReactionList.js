const fs = require('fs') 
const request = require('request')
const { prefix2, adminRole, errorDumpChannel} = require('../config.json');
const sqlite3 = require('sqlite3');

module.exports = {
	name: prefix2 + 'arList',
	description: 'Lists the commands and the image that the bot has, ONLY USE IN BOT SPAM',
	usage: '',
	execute(message, args, db) {
		//STILL NEED TO FINISH THIS, GENERATE A RANDOM NAME AND SAVE THE FILE AS THAT NAME WITH THE APPROIATE EXTENSION
		//THEN WRITE THE USERS TEXT AS ONE OF THE PREVIOUS METHOD THINGS SHOULDNT BE HARD
		if (message.channel.id == errorDumpChannel){
			let sqlWords = 'SELECT * FROM picReactTable ORDER BY phrase';
				db.all(sqlWords, [], (err,rows) => {
					if (err){
						console.log(err);
					}
					console.log("LIST OF REACTION IMAGES WORDS");
					rows.forEach((row) => {
						console.log(row);
						message.channel.send("[REACTION IMAGE, PHRASE] " + row.reactionIMG + ", " + row.phrase);
						//var temp = ''.concat('./images/').concat(row.reactionIMG);
						//message.channel.send({files: [temp]});
					});
			
				});
		}
		else{
			message.channel.send("ONLY AVAILABLE IN BOT SPAM CHANNEL!");
		}
	},
};