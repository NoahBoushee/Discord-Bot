const { prefix2, adminRole} = require('../config.json');
const sqlite3 = require('sqlite3');

module.exports = {
	name:  prefix2 + 'ban',
	description: 'Word to be added to ban list due to our Orwellian overlords.',
	usage: ' ban the word or phrase you want banned\n ',
	execute(message, args, db) {
		if(args.length < 1){
			message.reply('Invalid number of paramaters see usage!');
			return;
		}
		if (!message.member.roles.cache.find(role => role.name === adminRole)){
			message.reply('Must be a admin!');
			return;
		}
		var content = args.splice(0, args.length).join(" ");
		//console.log(content);
		db.run('INSERT OR IGNORE INTO bannedWordsTable (phrase) VALUES (\''.concat(content).concat('\');'), function(err){
			console.log(content);
			if(err){
				console.log('Unable to add new word');
				console.log(err);
				//process.exit(1);
			}
		});
		message.reply("Phrase " + content + " was added to banned words list.");
		console.log("Phrase " + content + " was added to banned words list.");
		return;	
	},
};