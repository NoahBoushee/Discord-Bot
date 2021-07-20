const ms = require('ms');

module.exports = {
	name: '&mute',
	description: 'Mute a person via @ing them don\'t abuse please',
	aliases: ['&muted'],
	usage: '@person to mute time limit EX &mute @OgSnakebone 10s',
	execute(message, args) {
	    var person  = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
            if(!person) return  message.reply("I CANT FIND THE USER " + person)
 
            let mainrole = message.guild.roles.cache.find(role => role.name === "Baby Boi");
            let role = message.guild.roles.cache.find(role => role.name === "muted");
           
 
            if(!role) return message.reply("Couldn't find the muted role.")
 
 
            let time = args[1];
            if(!time){
                return message.reply("You didnt specify a time!");
            }
 
            person.roles.remove(mainrole.id)
            person.roles.add(role.id);
 
 
            message.channel.send(`@${person.user.tag} has now been muted for ${ms(ms(time))}`)
 
            setTimeout(function(){
               
                person.roles.add(mainrole.id)
                person.roles.remove(role.id);
                console.log(role.id)
                message.channel.send(`@${person.user.tag} has been unmuted.`)
            }, ms(time));
		
	},
};