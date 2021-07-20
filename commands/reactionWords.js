const { prefix2, adminRole} = require('../config.json');
const sqlite3 = require('sqlite3');

module.exports = {
	name:  prefix2 + 'addReact',
	description: 'Word to be added to reaction list as well as the reaction to use.',
	usage: ' addReact < PHRASE TO REACT TO > < PHRASE TO RESPOND TO > MUST INCLUDED <>\n ',
	execute(message, args, db) {
		//&addReact < PHRASE TO REACT TO > < PHRASE TO RESPOND TO >
		if(args.length < 6){
			message.reply('Invalid number of paramaters see usage!');
			message.reply("addReact < PHRASE TO REACT TO > < PHRASE TO RESPOND TO > MUST INCLUDED <>");
			return;
		}
		if (!message.member.roles.cache.find(role => role.name != adminRole)){
			message.reply('Must be a admin!');
			return;
		}
		var point1 = args.indexOf("<") + 1;
		var point2 = args.indexOf(">") - 1;
		var content = args.splice(point1, point2).join(" ");
		var point3 = args.indexOf("<", point1) + 1;
		var point4 = args.indexOf(">", point2 + 1)-3;
		var content1 = args.splice(point3, point4).join(" ");
		//var content2 = content1.replace(">", "").replace("<", "");
		//console.log(content);
		//console.log(content1);
		//console.log(content);
		db.run('INSERT OR IGNORE INTO reactWordsTable (reaction, phrase) VALUES (\''.concat(content1).concat('\', \'').concat(content.toLowerCase().concat('\');')), function(err){
			console.log(content);
			if(err){
				console.log('Unable to add new word');
				message.reply("UNABLE TO ADD WORD!");
				console.log(err);
				//process.exit(1);
			}
		});
		message.reply("Phrase " + content + "  with reaction " + content1 +" was added to reaction words list.");
		console.log("Phrase " + content + "  with reaction " + content1 +" was added to reaction words list.");
		return;	
	},
};