const ms = require('ms');

module.exports = {
	name: '&unmute',
	description: 'Unmute a person via @ing them don\'t abuse please',
	aliases: ['&unmuted'],
	execute(message, args) {
	    var person  = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
            if(!person) return  message.reply("I CANT FIND THE USER " + person)
 
            let mainrole = message.guild.roles.cache.find(role => role.name === "Baby Boi");
            let role = message.guild.roles.cache.find(role => role.name === "muted");
           
 
            if(!role) return message.reply("Couldn't find the muted role.")
            person.roles.remove(role.id)
            person.roles.add(mainrole.id);
 
 
            message.channel.send(`@${person.user.tag} has now been unmuted`)
		
	},
};