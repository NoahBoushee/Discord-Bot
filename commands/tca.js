const fs = require('fs');
const { prefix } = require('../config.json');

module.exports = {
	name:  prefix + 'tca',
	description: ' DEPRICATED Adds a text command based on what the user inputed. \nOnly is usable with one trigger word IE you can\'t have it respond to more than one word ATM \n\USE" @%user% \" to mention person who triggered quote\n Ensure that @%user% is sourounded by a space on both sides or it does stupid shit\n Cause I really don\'t want to write a couple REGEXS ',
	usage: ' word to respond to "What to say when trigger word is put in text chat"',
	execute(message, args) {
		message.reply("THIS COMMAND IS DEPRICATED");
		/*if(args.length <= 1){
			message.reply('Invalid number of paramaters see usage!');
			return;
		}
		try{
			var response = "";
			var fileName = "./commands/".concat(args[0].concat('.js'));
			var name = "name: \'".concat(args[0].concat('\','));
			var description = "description: \'".concat(args[0].concat('\','));
			var fileContents = "module.exports = { ".concat(name.toLowerCase()).concat(description).concat("execute(message, args){ message.channel.send('");
			for(index = 1; index < args.length; index++){
				if (index == 1 || index == args.length-1){
					args[index] = args[index].replace("\"", "");
				}	
				if(args[index] === "@%user%"){
				args[index] = "<@" + message.author.id + ">";
				}
				var response = response.concat(args[index]);
					var response = response.concat(' ');
			}
			var fileContents = fileContents.concat(response).concat("'); }, };")
			fs.writeFile(fileName, fileContents, (err) => {
				if(err) throw err;
			})
		}
		catch(error){
			console.error(error);
			message.reply('Something fucked up, don\'t know');
		}*/
	},
};