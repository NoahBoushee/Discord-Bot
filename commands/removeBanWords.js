const { prefix2, adminRole} = require('../config.json');
const sqlite3 = require('sqlite3');

module.exports = {
	name:  prefix2 + 'removeBan',
	description: 'Word to be removed from ban list.',
	usage: ' remove the word or phrase from banned list\n',
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
		db.run('DELETE FROM bannedWordsTable WHERE phrase LIKE \''.concat(content).concat('\';'), function(err){
			console.log(content);
			if(err){
				console.log('Unable to delete word');
				console.log(err);
				//process.exit(1);
			}
		});
		message.reply("Phrase " + content + " was removed from banned words list if present.");
		console.log("Phrase " + content + " was removed from banned words list.");
		return;	
	},
};