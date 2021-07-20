const fs = require('fs');

module.exports = {
	name: '&join',
	description: 'Summon bot and have it listen to users INPROGRESS',
	async execute(message, args) {
		if(message.member.voice.channel){
			const connection = await message.member.voice.channel.join()
			const receiver = connection.receiver

			connection.on('speaking', (user, speaking) => {
			if (!speaking) {
				return
			}
			console.log(`I'm listening to ${user.username}`)
			const audioStream = receiver.createStream(user, { mode: 'pcm' })
			})
			//THE ABOVE KIND OF WORKS
			
			/*const connection = await message.member.voice.channel.join();
			const audio = connection.receiver.createStream(message.author, { mode: 'pcm', end: 'manual'});
			audio.pipe(fs.createWriteStream('pythons/user_audio'));*/

				/*const spawn = require("child_process").spawn;
				const pythonProcess = spawn('C:/Python38/python.exe',["pythons/speechPython.py"]);
				console.log("STARTING THE PYTHONS");
				pythonProcess.stdout.on('data', function(data) {
				console.log(data.toString());
						if (data.toString() == "DONE"){
							//READ THE TRANSCRIBED DATA
							console.log("FINISHED ENCODING");
							return;
						}
				});
				pythonProcess.on('exit', (code) => {
					console.log("Process quit with code : " + code);
				});*/
				/*var pythonPath = './pythons/speechPython.py';
				var {PythonShell} = require('python-shell');
				var pyshell = new PythonShell(pythonPath);
				pyshell.on('message', function (message) {
					// received a message sent from the Python script (a simple "print" statement)
					console.log(message);
				});
				pyshell.end(function (err) {
				if (err){
					throw err;
				}

				console.log('finished');
				});
			})*/
			//}
			
		}
	},
};