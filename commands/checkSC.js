const { prefix2 } = require('../config.json');
const sqlite3 = require('sqlite3');

module.exports = {
	name: prefix2 + 'checkSC',
	description: 'Displays the command callers Social Credit Score',
	usage: 'commandName',
	execute(message, args, db) {
		let userName = message.author.tag;
		let sql = 'SELECT points FROM socialCreditScores WHERE user LIKE ?';
		db.get(sql,[userName], (err, row) => {
			if(err){
				console.log('Unable to find user in table');
				console.log(err);
			}
			message.reply("Your Social Credit Score is " + row.points);
		});
		return;
	},
};