const { prefix2 } = require('../config.json');
const sqlite3 = require('sqlite3');

module.exports = {
	name: prefix2 + 'addSCWord',
	description: 'Adds a word(s) to the Social Credit System',
	usage: 'commandName <word or pharse > <GOOD or BAD> (Good meaning awarding points, Bad meaning taking points)',
	execute(message, args, db) {
		if (args.length < 2){
			message.reply("Invalid number of args see usage!");
			return;
		}
		var rating = args[args.length-1];
		var content = args.splice(0, args.length-1).join(" ");
		//console.log(rating + '\n');
		//console.log(content);
		db.run('INSERT OR IGNORE INTO badWordsTable (word, goodOrBad) VALUES (\''.concat(content).concat('\', \'' .concat(rating.toUpperCase()).concat('\')')), function(err){
			//console.log(tempName);
			if(err){
				console.log('Unable to add new word');
				console.log(err);
				//process.exit(1);
			}
		});
		message.reply("Phrase " + content + " with rating " + rating + " was added to DB if it didn't exist!");
		console.log("Phrase " + content + " with rating " + rating + " was added to DB if it didn't exist!");
		return;
	},
};