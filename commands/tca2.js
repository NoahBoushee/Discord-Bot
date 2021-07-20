const fs = require('fs');
const { prefix } = require('../config.json');

module.exports = {
	name:  prefix + 'tca2',
	description: ' DEPRICATED Adds a text command based on what the user inputed. \n Use @%user% to mention user\nThis one can respond to more than one word\n This only works UP TO 3 WORDS, if there\'s some reason why we need more please tell me\n',
	usage: ' words to respond to " What to say when trigger word is put in text chat "',
	execute(message, args) {
		message.reply("THIS COMMAND IS DEPRICATED");
		/*if(args.length <= 1){
			message.reply('Invalid number of paramaters see usage!');
			return;
		}
		try{
			var response = "";
			var fileName = "./commands/".concat(args[0].concat('.js'));
			var name = "name: \'".concat(args[0]);
			var temp = args[0];
			var i = 1;
			while(temp != "\""){
				var name = name.concat(' '.concat(args[i]));
				i++;
				temp = args[i];
			}
			name.trim();
			var name = name.concat('\',');
			var description = "description: \'".concat(args[0].concat('\','));
			var fileContents = "module.exports = { ".concat(name.toLowerCase()).concat(description).concat("execute(message, args){ message.channel.send('");
			for(index = i; index < args.length; index++){	
				if(args[index] === "@%user%"){
				args[index] = "<@" + message.author.id + ">";
				}
				if(args[index] == "\""){
					continue;
				}
				else{
					var response = response.concat(args[index]);
					var response = response.concat(' ');
				}
			}
			var fileContents = fileContents.concat(response).concat("'); }, };")
			fileContents.trim();
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