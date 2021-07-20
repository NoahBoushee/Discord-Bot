/*
cd C:\Users\noahb\OneDrive\Desktop\BOT
node index.js
nodemon --inspect index.js

NEED TO ADD METHODS FOR ADDING AND REMOVING WORDS FROM BAD WORD LIST
ADD METHODS TO CHECK USERS MESSAGE AND AWARD POINTS ACCORDINGLY --- DONE

*/

const fs = require('fs');
const ms = require('ms');
const ytdl = require('ytdl-core');
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const { prefix, adminRole, token, giphyToken, youtubeAPI, prefix2, serverID, allGeneralChannel, errorDumpChannel, defaultRole, noPornRole } = require('./config.json');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const cheerio = require('cheerio');
const request = require('request');
const sqlite3 = require('sqlite3');
const queue = new Map();
const GphApiClient = require('giphy-js-sdk-core');
giphy = GphApiClient(giphyToken); 
var date = new Date();
var dateFull = "logs/" + (date.getFullYear() + "-" + (date.getMonth() +1)+"-"+ date.getDate() + ".log");
console.log(dateFull);
saveLog("Bot started Successfully");

//SAVES THE MESSAGE TO THE FILE AKA LOGGING
function saveLog(message){
	var date2 = new Date();
	//console.log(date2.now);
	fs.appendFile(dateFull, (message + "-" + date2.getHours() + ":" + date2.getMinutes()+"\n"), function(err){
		if (err) throw err;	
	});
}

for (var file of commandFiles) {
	var command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

//CONNECT TO DATABASE AND ENSURE THAT BOTH TABLES ARE ALREADY CREATED
const db = new sqlite3.Database('./dbs/dbMain.db', sqlite3.OPEN_READWRITE, (err)=>{
	if(err){
		console.log(err.message);
	    client.channels.cache.get(errorDumpChannel).send('UNABLE TO CONNECT TO DB, CONTACT OWNER');
		process.exit(1);
	}
	saveLog("Connected to DB"); 
});

//WHEN THE BOT FIRST STARTS, LOG THE BOT STARTING AND SET ITS STATUS TO ONLINE IN DISCORD
client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	//client.channels.cache.get('679891208817999893').send('SERVERS UP CRAFTERS @here')
	let temp = 0;
	//ENSURES THAT MINECRAFTERS MESSAGE IS ONLY SENT ONCE (NOT CURRENTLY USED DUE TO NO MC SERVER ) MAY NEED TO CHECK AGAIN WHEN A NEW SERVER IS GOINg
	try{
		var array = fs.readFileSync(dateFull).toString().split("\n");
		 for(i in array) {
			if (i.includes("Bot logged into server")){
				temp = 1;
				break;
			}
		}
	}
	catch (error ){
		//console.log("Things");
		console.log(error);
	}  
	if (temp == 0){
		//client.channels.cache.get('679891208817999893').send('SERVERS UP CRAFTERS @here')
	}
	//DB STUFF

	db.run('CREATE TABLE IF NOT EXISTS badWordsTable (id INTEGER PRIMARY KEY AUTOINCREMENT, word TEXT NOT NULL UNIQUE, goodOrBad TEXT NOT NULL)', function(err){
		if(err){
			console.log('UNABLE TO CREATE BADWORDS TABLE');
			process.exit(1);
		}
		saveLog("Created Bad Words Table"); 
		//console.log("TABLE CREATED");
	});
	db.run('CREATE TABLE IF NOT EXISTS bannedWordsTable (id INTEGER PRIMARY KEY AUTOINCREMENT, phrase TEXT NOT NULL UNIQUE)', function(err){
		if(err){
			console.log('UNABLE TO CREATE BADWORDS TABLE');
			process.exit(1);
		}
		saveLog("Created Bad Words Table"); 
		//console.log("TABLE CREATED");
	});
	db.run('CREATE TABLE IF NOT EXISTS socialCreditScores (id INTEGER PRIMARY KEY AUTOINCREMENT, user TEXT NOT NULL UNIQUE, points INTEGER)', function(err){
		if(err){
			console.log('UNABLE TO CREATE SOCIALCREDIT TABLE');
			process.exit(1);
		}
		saveLog("Created Social Credit Table"); 
		//console.log("TABLE CREATED");
	});
	db.run('CREATE TABLE IF NOT EXISTS reactWordsTable (id INTEGER PRIMARY KEY AUTOINCREMENT, reaction TEXT NOT NULL UNIQUE, phrase TEXT NOT NULL UNIQUE)', function(err){
		if(err){
			console.log('UNABLE TO CREATE BADWORDS TABLE');
			process.exit(1);
		}
		saveLog("Created Bad Words Table"); 
		//console.log("TABLE CREATED");
	});
	db.run('CREATE TABLE IF NOT EXISTS picReactTable (id INTEGER PRIMARY KEY AUTOINCREMENT, reactionIMG TEXT NOT NULL UNIQUE, phrase TEXT NOT NULL UNIQUE)', function(err){
		if(err){
			console.log('UNABLE TO CREATE picReact TABLE');
			process.exit(1);
		}
		saveLog("Created pic React Table"); 
		//console.log("TABLE CREATED");
	});
	//CHECK IF ANY USERS JOINED WHEN WE WERE OFFLINE
	const list = client.guilds.cache.get(serverID);
	list.members.fetch().then( value => {
		let keys = Array.from(value.values());
		let keys2 = Array.from(keys.values());
		keys2.forEach(item =>{
			var tempName = item.user.tag;
			db.run('INSERT OR IGNORE INTO socialCreditScores(user, points) VALUES (\''.concat(tempName).concat('\', \'0\')'), function(err){
			//console.log(tempName);
			if(err){
				console.log('UNABLE TO INSERT NEW USER');
				console.log(err);
				process.exit(1);
			}
		});
		});
	}).catch(console.error);
	console.log("CHECKED FOR NEW USERS\n");
	client.user.setStatus("online");
	saveLog("Bot logged into server");
});

//MORE LOGGINg STUFF RECORDERS WHEN USER GOT OFF
client.on("disconnected", () => {
    client.user.setStatus("offline");
    console.log(client.user.tag + "IS NOW OFFLINE"); 
	saveLog("User Disconnected: " + client.user.tag);
});

//console.log(client.users); //returns all users

client.on('guildMemberAdd', (guildMember) => {
    console.log("User " + guildMember.user.tag + " Joined");
	//console.log(guildMember);
    guildMember.roles.add(guildMember.guild.roles.cache.find(role => role.name === defaultRole));
    guildMember.roles.add(guildMember.guild.roles.cache.find(role => role.name === noPornRole));//ADD THE ABILITY TO CHANGE THE JOIN MESSAGE
    client.channels.cache.get(allGeneralChannel).send("Welcome to the holy nation of Israel fellow jew, <@" + guildMember.id + ">!");
    client.channels.cache.get(allGeneralChannel).send("", { files: ["./images/video0.mp4"] });  
    saveLog("User joined server " + guildMember.user.tag);
	console.log("USER JOINED " + guildMember.user.tag);
   //ADD THE NEW USER TO THE LIST OF PEOPLE AND ASSIGN THEM A SCORE OF 0
    db.run('INSERT OR IGNORE INTO socialCreditScores(user, points) VALUES (\''.concat(guildMember.user.tag).concat('\', \'0)\')'), function(err){
		if(err){
	 		console.log('UNABLE TO INSERT NEW USER FROM ADD');
			process.exit(1);
		}
		saveLog("Insert NEW user into table Social Credit"); 
	});
    
});

//functions that need &have them in their name
client.on('message', message => {
	//if the user message has a prefix
	if(message.content.startsWith(prefix)){	
	
		if (message.content == "&RESET"){//FIX THIS SO THE BOT CAN RESTART
			
			try{
				message.channel.reply('Restarting...').then(m => {
					client.destroy().then(() => {
						client.login(token);
					});
				});
			}
			catch(error){
				
			}
			saveLog("Bot restarted");
			console.log("WE RESET");
			return;
		};
	
		const serverQueue = queue.get(message.guild.id);
		const args = message.content.split(/ +/);
		//const args = message.content.split(/\b/);
		const commandName = args.shift().toLowerCase();//GETS THE FIRST ARGUEMENT
		const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
		try{
			command.execute(message, args);
			
			
		}
		catch(error){
			console.error(error);
			message.reply('Invalid command or something fucked up!');
		}
		saveLog("Command used");
	}
	else if (message.content.startsWith(prefix2)){
		const args = message.content.split(/ +/);
		//console.log(args);
		const commandName = args.shift();//GETS THE FIRST ARGUEMENT
		const command = client.commands.get(commandName);
		try{
			command.execute(message, args, db);
			
		}
		catch(error){
			console.error(error);
			message.reply('Invalid command or something fucked up!');
		}
	}
	//if the user message does not have the prefix IE WE WANT THE BOT TO RESPOND TO STUPID SHIT
	else{
		const args = message.content.split(/ +/);
		
		if(!message.author.bot){
			let sqlWords2 = 'SELECT * FROM reactWordsTable ORDER BY phrase';
			db.all(sqlWords2, [], (err,rows) => {
				if (err){
					console.log(err);
				}
				console.log("LIST OF REACTION WORDS");
				rows.forEach((row) => {
					console.log(row);
					if (message.content.toUpperCase().includes(row.phrase.toUpperCase())){
						message.channel.send(row.reaction);
						return;
					}
				});
		
			});
			
			let sqlWords3 = 'SELECT * FROM picReactTable ORDER BY phrase';
			db.all(sqlWords3, [], (err,rows) => {
				if (err){
					console.log(err);
				}
				console.log("LIST OF REACTION IMAGES WORDS");
				rows.forEach((row) => {
					console.log(row);
					if (message.content.toUpperCase().includes(row.phrase.toUpperCase())){
						var temp = ''.concat('./images/').concat(row.reactionIMG);
						message.channel.send({files: [temp]});
						return;
					}
				});
		
			});
			
			let sqlWords = 'SELECT  phrase FROM bannedWordsTable ORDER BY phrase';
			db.all(sqlWords, [], (err,rows) => {
				if (err){
					console.log(err);
				}
				console.log("LIST OF BANNED WORDS");
				rows.forEach((row) => {
					console.log(row);
					if (message.content.toUpperCase().includes(row.phrase.toUpperCase())){
						message.delete({timeout: 100});
						message.channel.send("You can\'t say that, that\'s racist!");
						return;
					}
				});
		
			});
			
			//CHECK HERE IF THE WORD MATCHES THE CRETERIA FOR ANY OF THE BADWORDS FROM THE DB
			let userName = message.author.tag;
			let sql = 'SELECT  word, goodOrBad FROM badWordsTable ORDER BY word';
			db.all(sql, [], (err,rows) => {
				if (err){
					console.log(err);
				}
				rows.forEach((row) => {
					//console.log(row);
					if (message.content.toUpperCase().includes(row.word.toUpperCase())){
						if(row.goodOrBad == "GOOD"){
							let sql2 = 'UPDATE socialCreditScores SET points = points + 20 WHERE user LIKE ?';
							db.get(sql2,[userName], (err, row) => {
								if(err){
									console.log('Unable to find user in table');
									console.log(err);
								}
							});
							saveLog(userName + "received +20 Social Credit Points");
							message.reply({files: ["./images/socialCredit/20PointsPlus.png"]});
						}
						else{
							let sql3 = 'UPDATE socialCreditScores SET points = points - 20 WHERE user LIKE ?';
							db.get(sql3,[userName], (err, row) => {
								if(err){
									console.log('Unable to find user in table');
									console.log(err);
								}
							});
							saveLog(userName + "received -20 Social Credit Points");
							message.reply({files: ["./images/socialCredit/20PointsMinus.png"]});
						}
					}
				});
		
			});
		
		}
	}
		saveLog("Reacted to stupid shit");
});

//client.on('guildMemberSpeaking', handle)

client.on('presenceUpdate', async (oldPresence, newPresence) => {
    /*let member = newPresence.member;
	saveLog("New instance of user BEAN");
    // User id of the user you're tracking status.
    if (member.id === '507393804815433750') {
        if (oldPresence.status !== newPresence.status) {
            // Your specific channel to send a message in.
            let channel = member.guild.channels.cache.get('597463215563210774');
            // You can also use member.guild.channels.resolve('<channelId>');
			//console.log("Checked for beanis!")
            if (newPresence.status === "online") {
				channel.send({files: ["./images/tenor.gif"]});
			}
        }
    }*/
	//saveLog("User Status of Bean changed");
	
});

client.login(token);