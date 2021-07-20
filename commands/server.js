module.exports = {
	name: '&server',
	description: 'Display server information',
	execute(message, args) {
		message.channel.send(`Server name: ${message.guild.name}\nNumber of users: ${message.guild.memberCount}\nSince: ${message.guild.createdAt}`);
	},
};