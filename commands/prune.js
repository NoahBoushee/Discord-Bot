module.exports = {
	name: '&prune',
	description: 'Prune the channel of bot messages',
	usage: '@some user amount of messages to prune',
	aliases: ['&delete'],
	execute(message, args) {
		const user = message.mentions.users.first();
		const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2]);
		console.log(amount);
		if (!amount) return message.reply('Must specify an amount to delete!');
		if (!amount && !user) return message.reply('Must specify a user and amount, or just an amount, of messages to purge!');
		// Fetch amount messages (will be filtered and lowered up to max amount requested)
		message.channel.messages.fetch({
 		limit: amount,
		}).then((messages) => {
 		if (user) {
 		const filterBy = user ? user.id : Client.user.id;
 		messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
 		}
 		message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
	}); 
	},//that message author id shit mentions the person who triggered the command
};