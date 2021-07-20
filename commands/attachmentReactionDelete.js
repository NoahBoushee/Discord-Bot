const fs = require('fs') 
const request = require('request')
const { prefix2, adminRole} = require('../config.json');
const sqlite3 = require('sqlite3');

module.exports = {
	name: prefix2 + 'arDelete',
	description: 'Removes the ar from the database as well as deleting the file on server',
	usage: ' <phrase to remove the reaction>',
	execute(message, args, db) {
		if(args.length < 1){
			message.reply('Invalid number of paramaters see usage!');
			return;
		}
		if (!message.member.roles.cache.find(role => role.name === adminRole)){
			message.reply('Must be a admin!');
			return;
		}
		//STILL NEED TO FINISH THIS, GENERATE A RANDOM NAME AND SAVE THE FILE AS THAT NAME WITH THE APPROIATE EXTENSION
		//THEN WRITE THE USERS TEXT AS ONE OF THE PREVIOUS METHOD THINGS SHOULDNT BE HARD
		//message.reply('WORKIG ON IT GOY');
		var start = message.content.indexOf('<');
		var end = message.content.indexOf('>');
		var reactionContent = message.content.substring(start+1, end);
		console.log(reactionContent);
		let sqlWords = 'SELECT reactionIMG FROM picReactTable WHERE phrase LIKE \''.concat(reactionContent).concat('\';');
		db.all(sqlWords, [], (err,rows) => {
			if (err){
				console.log(err);
			}
			console.log("LIST OF BANNED WORDS");
			rows.forEach((row) => {
				console.log(row);
				var temp = ''.concat('./images/').concat(row.reactionIMG);
				console.log(temp);
				fs.unlink(temp, (err) => {
					if (err) {
						console.error(err);
						//return
					}

				//file removed
				});
			});
		
		});
		db.run('DELETE FROM picReactTable WHERE phrase LIKE \''.concat(reactionContent).concat('\';'), function(err){
		console.log(reactionContent);
		if(err){
			console.log('Unable to remove reaction');
			console.log(err);
			//process.exit(1);
		}
		});
		message.reply("Phrase " + reactionContent + " was removed from Picture Reaction list.");
		console.log("Phrase " + reactionContent + " was removed from Picture Reaction list.");
		return;	
			
			
		
	},
};