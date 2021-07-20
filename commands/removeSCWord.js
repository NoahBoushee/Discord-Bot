const { prefix2 } = require('../config.json');
const sqlite3 = require('sqlite3');

module.exports = {
	name: prefix2 + 'removeSCWord',
	description: 'Removess a word(s) to the Social Credit System',
	usage: 'commandName <word or pharse to REMOVE>',
	execute(message, args, db) {
		if (args.length < 1){
			message.reply("Invalid number of args see usage!");
			return;
		}
		var content = args.splice(0, args.length).join(" ");
		//console.log(rating + '\n');
		//console.log(content);
		db.run('DELETE FROM badWordsTable WHERE word LIKE \'%'.concat(content).concat('%\';'), function(err){
			//console.log(tempName);
			if(err){
				console.log('Unable to remove phrase');
				console.log(err);
				message.reply("Phrase " + content + " was not found in DB!");
				//process.exit(1);
			}
		});
		message.reply("Phrase " + content + " was removed if present!");
		console.log("Phrase " + content + " was removed if present!");
		return;
	},
};