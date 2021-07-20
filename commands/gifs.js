module.exports = {
	name: '&gif',
	description: 'Search giphy for a gif based on entered data',
	aliases: ['&gifs'],
	execute(message, args) {
		var temp ='';
		for (index = 0; index < args.length; index++){
			temp = temp.concat(args[index], ' ');
		}
		giphy.search('gifs', {"q": temp})
			.then((response) => {
				var totalResponses = response.data.length;
				var responseIndex = Math.floor((Math.random() * 10) +1)% totalResponses;
				var responseFinal = response.data[responseIndex];
				message.channel.send({files: [responseFinal.images.fixed_height.url]});
			}).catch(() => {message.channel.send('Some error or shit!');})
		
	},
};