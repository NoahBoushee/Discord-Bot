const fs = require('fs') 
const request = require('request')
const { prefix2, adminRole} = require('../config.json');
const sqlite3 = require('sqlite3');

module.exports = {
	name: prefix2 + 'ar',
	description: 'Lets you have the bot send stupid gifs/pics when a word or phrase is said',
	usage: ' <words to react to> attachment<.png or .jpg or .gif ONLY> ',
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
		if (message.attachments.first()){
			if(message.attachments.first().name.includes('.png')){
				var date = new Date();
				var FileName = "" + (date.getFullYear() + "-" + (date.getMonth() +1)+"-"+ date.getDate() + "-" + date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds() + ".png");
				request.get(message.attachments.first().url).on('error', console.error).pipe(fs.createWriteStream('C:/Users/noahb/OneDrive/Desktop/BOT/images/' + FileName));
			}
			else if(message.attachments.first().name.includes('.gif')){
				var date = new Date();
				var FileName = "" + (date.getFullYear() + "-" + (date.getMonth() +1)+"-"+ date.getDate() + "-" + date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds() + ".gif");
				request.get(message.attachments.first().url).on('error', console.error).pipe(fs.createWriteStream('C:/Users/noahb/OneDrive/Desktop/BOT/images/' + FileName));
			}
			else if(message.attachments.first().name.includes('.jpg')){
				var date = new Date();
				var FileName = "" + (date.getFullYear() + "-" + (date.getMonth() +1)+"-"+ date.getDate() + "-" + date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds() + ".jpg");
				request.get(message.attachments.first().url).on('error', console.error).pipe(fs.createWriteStream('C:/Users/noahb/OneDrive/Desktop/BOT/images/' + FileName));
			}
			else{
				message.reply('Incorrect file type.');
				console.log('INCORRECT FILE TYPE IN Add Reaction.');
				return;
			}
			//message.reply('WORKIG ON IT GOY');
			var start = message.content.indexOf('<');
			var end = message.content.indexOf('>');
			var reactionContent = message.content.substring(start+1, end);
			console.log(reactionContent);
			db.run('INSERT OR IGNORE INTO picReactTable (phrase, reactionIMG) VALUES (\''.concat(reactionContent).concat('\', \'').concat(FileName).concat('\');'), function(err){
			console.log(reactionContent);
			if(err){
				console.log('Unable to add new reaction');
				console.log(err);
				//process.exit(1);
			}
			});
			message.reply("Phrase " + reactionContent + " was added to Picture Reaction list.");
			console.log("Phrase " + reactionContent + " was added to Picture Reaction list.");
			return;	
			
			
		}
	},
};