//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//BOT MODULES & VARIABLES
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

//global modules
global.Bot = require('ttapi');
global.repl = require('repl');
global.$ = require('jquery');

//global variables
//turntable credentials
global.bot_auth = "xxx";
global.bot_id = "xxx";
global.room_id = 'xxx',

//global.master_id = "xxx"; //used for bot-master

//bot settings
global.bot_name = "xxx";
global.bot_avatar = "xxx";
global.bot_laptop = "xxx";
global.bot_twitter_name = "xxx";
global.bot_soundcloud_url = "";
global.bot_website_url = "";
global.bot_facebook_url = "";
global.bot_about = "i'm a bot...";
global.bot_fav_artists = "";
global.bot_hangout = "xxx";

//room settings
global.afk_limit = 10; //minutes
global.queue_wait_time = 30; //seconds
global.casino_wait_time = 30; //seconds

//features
global.games_mode = true;
global.announce_mode = true;
global.queue_mode = false;
global.casino_mode = false;
global.lulz_mode = true;

//banlists
global.banned_users = [];
global.banned_artists = [];

//congrats message for djs' thousand point parties
global.party_msgs = [
	"xxx",
	"xxx"
];

//rock, paper, scissor, lizard, spock
global.rpsls = [
	"rock",
	"paper",
	"scissors",
	"lizard",
	"spock"
];

//special privilege users
global.special_users = [
	"xxx",
	"xxx",
	"etc."
];
//titles for special privilege users
global.title = [
	"boss",
	"title",
	"etc."
];

//ingredients for iron chef challenge
global.ingredients_list = ["Tri-tip steak","Eggplant","Eggs","Milk/Cream","Salmon Filet","Shrimp","Chicken Wings",
						"Chicken Breasts","Ground Beef","Ground Turkey","Oranges","Cherries","Plums","Celery",
						"Water Chestnuts","Cashews","Lamb","Cheddar Cheese","Mozzarella Cheese","Bacon","Lettuce",
						"Raspberries","Blackberries","Black Olives","Green Olives","Apples","Swiss Cheese",
						"Carrots","Saltine Crackers","Octopus","Oysters","Cucumbers","Radishes","Onions",
						"Wheat Bread","Rabbit","Pork Chops","Rice","Spaghetti Noodles","Egg Noodles","Mushrooms",
						"Frozen Peas","Canned Cream of Mushroom Soup","Canned Tuna","Potatoes","Ham","Hot Dogs",
						"Bratwurst","Sauerkraut","Potato Chips","Cottage Cheese","Barbecue Sauce","Beef Ribs",
						"Corn on the Cob","Blueberries","Lobster","Clams","Blood Oranges","Grapes","White Wine",
						"Jalepeno Peppers","Brussell Sprouts","Nutella","Butternut Squash","Pumpkin","Applesauce",
						"Acorn Squash","Leeks","Pine Nuts","Portabello Mushrooms","Whole Chicken","Tilapia",
						"Firm Tofu","Tomatoes","Graham Crackers","Vanilla Ice Cream","Orange Sherbert",
						"Portuguese Sweet Bread","Spiral Ham","Whole Trout","Whole Salmon","Corn Chips","Flour Tortillas",
						"Salsa","Grape Jelly","Peanut Butter","Prosciutto","Blue Cheese","Crutons","Beer",
						"Corn Tortilla","Asparagus","Truffle Oil","Sweet Potato","Plantain","Corn Flakes",
						"Scallops","Green Beans","Canned Beans","Mixed Nuts","Avocado","Tuna Steaks","Broccoli",
						"Cauliflower","Figs","Vanilla Pudding","Chocolate Pudding","Flavored Jello","Honey",
						"Dr. Pepper"
					];

//room construct variables
global.djs = [];
global.users = [];
global.mods = [];
global.votes = [];
global.queue = [];
global.casino_winner = [];
global.roll_scores = [];
global.rolls = [];
global.rollers = [];
global.rpsGame = [];
global.current_theme = "";
global.current_dj_id = "";
global.room_name = "";
global.current_dj_name = "";
global.current_song = "";
global.current_artist = "";
global.current_album = "";
global.last_song = "";
global.sender_id = "";
global.sender_name = "";
global.sender_title= "";
global.default_mode = true;
global.deck_full = false;
global.listeners = 0;
global.current_length = 0;
global.snags = 0;
global.up_votes = 0;
global.down_votes = 0;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//CUSTOM BOT CONTROLLERS
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
Bot.prototype.changed = function(data){
	try{
		cerberus.populate(data.djids, djs);
		cerberus.populate_users(data.users, users);
		cerberus.populate(data.room.metadata.moderator_id, mods);
		deck_full = data.room.metadata.dj_full;
		room_name = data.room.name;
		current_dj_id = data.room.metadata.current_dj;
		current_dj_name = data.room.metadata.current_song.djname;
		current_song = data.room.metadata.current_song.metadata.song;
		current_artist = data.room.metadata.current_song.metadata.artist;
		current_album = data.room.metadata.current_song.metadata.album;
		current_length = data.room.metadata.current_song.metadata.length;
	}catch(err){
		cerberus.fail(err);
	}
// controller for detectecting when bot changes room event
};
Bot.prototype.chat = function(data){
	try{
		cerberus.whisper(data);
		cerberus.listen(data);
		cerberus.chat_log(data.name, data.text);
	}catch(err){
		cerberus.fail(err);
	}
//controller for users chatting in the room event
};
Bot.prototype.deregistered = function(data){
	try{
		var user = data.user[0];
		if(announce_mode){
            //cerberus.speak(user.name  + " has left the building");
		}
		for(var i in users){
			if(user.userid == users[i].id){
				users.splice(i, 1);
			}
		}
	}catch(err){
		cerberus.fail(err);
	}
//controller for users leaving the room event
};
Bot.prototype.newsong = function(data){
	try{
		cerberus.auto_bop(data);
		deck_full = data.room.metadata.dj_full;
		current_dj_id = data.room.metadata.current_dj;
		current_dj_name = data.room.metadata.current_song.djname;
		current_song = data.room.metadata.current_song.metadata.song;
		current_artist = data.room.metadata.current_song.metadata.artist;
		current_album = data.room.metadata.current_song.metadata.album;
		current_length = data.room.metadata.current_song.metadata.length;
		listeners = data.room.metadata.listeners;
	}catch(err){
		bot.fail(err);
	}
//controller for new songs starting in the room event
};
Bot.prototype.pmmed = function(data){
	try{
		cerberus.whisper(data);
		cerberus.listen(data);
		cerberus.chat_log("PM From " + sender_name + ": ", data.text);
	}catch(err){
		cerberus.fail(err);
	}
//controller for private messaging the bot event
};
Bot.prototype.ready = function(){
	try{
		cerberus.setAvatar(bot_avatar || 18);
		cerberus.modifyLaptop(bot_laptop || "chrome");
		cerberus.modifyProfile({ 
			name: bot_name || "bot", 
			twitter: bot_twitter_name || "",
			soundcloud: bot_soundcloud_url || "hadescat", 
			website: bot_website_url || "",
			facebook: bot_facebook_url || "", 
			about: bot_about || "",
			topartists: bot_fav_artists || "",
			hangout: bot_hangout || ""
		});
		console.log("system ready...");
	}catch(err){
		cerberus.fail(err);
	}
//controller for initiating bot systems
};
Bot.prototype.registered = function(data){
	try{
		var user = data.user[0];
		if(announce_mode){
            var greeting = setTimeout(function(){
				if(!cerberus.is_bot(user.userid)){
					cerberus.speak("Hello, " + user.name );
				}
            }, 750);
		}
        users.push({name:user.name, id:user.userid, heartbeat: (afk_limit * 60000), afk: false});
	}catch(err){
		cerberus.fail(err);
	}
//controller for new users entering the room event
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//CUSTOM BOT FUNCTIONS
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
Bot.prototype.auto_bop = function(data){
	try{
		var maxWaitSeconds = 180;
		var oneSecond = 1000;
		setTimeout( function() {
			cerberus.bop();
		}, Math.floor(Math.random() * maxWaitSeconds) * oneSecond);
	}
	catch(err){
		cerberus.fail(err);
	}
}
Bot.prototype.chat_log = function(name, text){
	try{
		var ts = new Date();
		var year = ts.getFullYear();
		var month = ts.getMonth();
		var day = ts.getDate();
		var hour = ts.getHours();
		var minutes = ts.getMinutes();
		var seconds = ts.getSeconds();
		var time = month + "/" + day + "/" + year + " " + hour + ":" + minutes + ":" + seconds + " ... ";
		console.log("> " + time + " " + name + ": " + text);
	}catch(err){
		cerberus.fail(err);
	}
//log chat
};
Bot.prototype.check_snag = function(data){
	try{
		cerberus.roomInfo(true, function(data) {
			cerberus.playlistAll(function(playlist){
				var i = playlist.list.length;
				newsong = data.room.metadata.current_song._id;
                newsongname = songname = data.room.metadata.current_song.metadata.song;
				while (i--) {
				if (playlist.list[i]._id === newsong) {
					cerberus.pm("I already have this!", sender_id);
					return;
				}
			}
				cerberus.pm(":musical_note: "+ current_artist + " ~ " + newsongname + " added to my Q :musical_note: " + sender_title, sender_id);
				cerberus.playlistAdd(newsong, playlist.list.length);
				cerberus.snag();
			});
		});
	}catch(err){
		cerberus.fail(err);
	}
//snag the currently playing song
};
Bot.prototype.commands = function(data){
	try{
        lexicon = [
			//acl is user level 0=general user, 1 = mod, 2 = admin/special user, 3 = owner/master
            { //toggle the lulz
                "name": "/lulz",
                "help": "/me will toggle the lulz...",
                "acl": 1,
                "mode": [default_mode],
                code: function(data){
                    queue_mode = cerberus.toggle(lulz_mode, "the lulz");
                }
            },
            /*{ //casino
                "name": "/casino",
                "help": "/me will toggle casino mode...",
                "acl": 1,
                "mode": [default_mode],
                code: function(data){
					casino_mode = bot.toggle(casino_mode, "casino mode");
                }
            },
            {
                "name": "/lulz",
                "help": "/me will toggle lulz mode...",
                "acl": 1,
                "mode": [default_mode],
                code: function(data){
                    announce_mode = bot.toggle(announce_mode, "announce mode");
                }
            },
            {
                "name": "/games",
                "help": "/me will toggle games mode...",
                "acl": 1,
                "mode": [default_mode],
                code: function(data){
					games_mode = bot.toggle(games_mode, "games mode");
                }
            },*/
            { //get up on stage
                "name": "/onstage",
                "help": "/me will hop on deck...",
                "acl": 1,
                "mode": [default_mode],
                code: function(data){
                    cerberus.addDj();
                }
            },
            { //get off stage
                "name": "/offstage",
                "help": "/me will get down...",
                "acl": 1,
                "mode": [default_mode],
                code: function(data){
                    cerberus.remDj();
                }
            },
			{ //speak next song in playlist
                "name": "/next",
                "help": "/me will announce my next song in playlist...",
                "acl": 1,
                "mode": [default_mode],
                code: function(data){
					cerberus.playlistAll( function(data) {
						cerberus.speak(data.list[0].metadata.song + " by " + data.list[0].metadata.artist);
					});
                }
            },
            { //snag currently playing song
                "name": "/snag",
                "help": "/me will add current song to playlist...",
                "acl": 1,
                "mode": [default_mode],
                code: function(data) {
                    cerberus.check_snag(data.text);
                }
            },
            { //remove current song from playlist
				"name": "/toss",
				"help": "/me will toss the current track from playlist",
				"acl": 1,
				"mode": [default_mode],
				code: function(data){
					cerberus.roomInfo(true, function(data) {
						cerberus.playlistAll(function(playlist){
							var i = playlist.list.length;
							newsong = data.room.metadata.current_song._id;
							newsongname = songname = data.room.metadata.current_song.metadata.song;
							while (i--) {
								if (playlist.list[i]._id===newsong) { 
									cerberus.speak("/me removed " + newsongname + " from  its Q");
									cerberus.playlistRemove(i);
									return;
								}
							}
						});
					});
				}
            },
            { //suffle playlist
				"name": "/shuffle",
				"help": "/me will shuffle its playlist",
				"acl": 1,
				"mode": [default_mode],
				code: function(data){
					cerberus.playlistAll(function(playlist) {
						var x = Math.ceil(Math.random() * playlist.list.length);
						cerberus.playlistReorder(0, x);
						cerberus.speak("/me shuffles its playlist");
					});
				}
            },
            { //skip song bot currently playing
				"name": "/skip",
				"help": "/me will skip if currently playing",
				"acl": 1,
				"mode": [default_mode],
				code: function(data){
					if(bot_id == current_dj_id){
						cerberus.skip();
						var talkback = setTimeout(function(){
							cerberus.speak(data, 'i see how it is @' + sender_name);
						}, 500);
					}else{
						if(announce_mode){
							cerberus.speak("i'm not even djing @" + sender_name);
						}
					}
				}
            },
            { //set a theme
				"name": "/set",
				"help": "/me will set the new theme",
				"acl": 1,
				"mode": [announce_mode],
				code: function(data){
					var setTheme;
					var text = data.text;
					setTheme = text.split("/set ");
					current_theme = setTheme[1];
					var set = setTimeout(function(){
							cerberus.speak("the theme is " + current_theme);
					}, 500);
				}
            },
            { //state the theme
				"name": "/theme",
				"help": "/me will announce the current theme",
				"acl": 0,
				"mode": [announce_mode],
				code: function(data){
					cerberus.speak("the theme is " + current_theme);
				}
            },
            { //dive off stage
                "name": "/dive",
                "help": "/me will remove you from deck...",
                "acl": 0,
                "mode": [default_mode],
                code: function(data){
                    cerberus.remDj(data.userid);
                }
            },
            { //bop
                "name": "/bop",
                "help": "/me will go loop de loop...",
                "acl": 0,
                "mode": [default_mode],
                code: function(data){
                    cerberus.bop();
                }
            },
            { //roll a die while in casino mode
                "name": "/roll",
                "help": "/me will roll a 100-sided die fur a user...",
                "acl": 0,
                "mode": [casino_mode],
                code: function(data){
					cerberus.roll(data);
                }
            },
            /*{ //add user to queue list
                "name": "/add",
                "help": "/me will add you to the available list...",
                "acl": 0,
                "mode": [queue_mode],
                code: function(data){
                    bot.add_queue(data);
                }
            },
            {
                "name": "/remove",
                "help": "/me will remove you from the available list...",
                "acl": 0,
                "mode": [queue_mode],
                code: function(data){
                    bot.rem_queue(data);
                }
            },*/
            { //tableflip
                "name": "/flip",
                "help": "/me will flip the decks...",
                "acl": 1,
                "mode": [announce_mode],
                code: function(data){
                    cerberus.speak("/tableflip @" + current_dj_name);
                }
            },
            { //tablefix
                "name": "/fix",
                "help": "/me will fix the decks...",
                "acl": 1,
                "mode": [announce_mode],
                code: function(data){
                    cerberus.speak("/tablefix @" + current_dj_name);
                }
            },
            { //rock, paper, lizzard, spock
            	"name": "/rpsls",
            	"help": "/me will start rock paper scissors lizard spock for you...",
            	"acl": 0,
            	"mode": [games_mode],
            	code: function(data){
            		cerberus.rpsls(data);
            	}
            },
            /*{ //define a term
                "name": "/define",
                "help": "/me will lookup something in the urban dictionary fur you...",
                "acl": 0,
                "mode": [games_mode],
                code: function(data){
                    bot.define(data.text);
                }
            },
            {
                "name": "/example",
                "help": "/me will use a word you say in an example from the urban dictionary...",
                "acl": 0,
                "mode": [games_mode],
                code: function(data){
                    bot.example(data.text);
                }
            },*/
            { //fan user
                "name": "/fanme",
                "help": "/me will show available commands...",
                "acl": 0,
                "mode": [default_mode],
                code: function(data){
					cerberus.becomeFan(data.userid, function(res) {
						if(res.success){
							cerberus.speak(':star: @' + data.name);
							cerberus.becomeFan(data.userid);
						}else{
							cerberus.speak('I already fanned u @' + data.name);
						}
					});
                }
            },
            { //help
                "name": "/help",
                "help": "/me will show available commands...",
                "acl": 0,
                "mode": [default_mode],
                code: function(data){
                    cerberus.help_menu(data.userid);
                }
            },
			{//sadtrombone
				"name": "/sadtrombone",
				"help": "hear that sad trombone...",
				"acl": 0,
				"mode": [lulz_mode],
				code: function(data){
				cerberus.speak("http://soundfxnow.com/soundfx/Sad-Trombone.mp3");
				}
			},
			{//pr0n
				"name": "pr0n",
				"help": "/me will watch pr0n...",
				"acl": 0,
				"mode": [lulz_mode],
				code: function(data){
					cerberus.speak("/me watches pr0n creepily");
				}
			},
			{//happy
				"name": "/happy",
				"help": "it's a happy bear!",
				"acl": 0,
				"mode": [lulz_mode],
				code: function(data){
					cerberus.speak("http://goo.gl/yYMov");
				}
			},
			{//cerberus summon
				"name": "cerberus",
				"help": "/me will respond",
				"acl": 1,
				"mode": [default_mode],
				code: function(data){
					console.log(sender_id);
					if(sender_id != "51958aa5eb35c1598caf8627"){
						cerberus.pm("Yes, "+ sender_title + " ?", sender_id);
					}
				}
			},
			{ //wine
				"name": "/wine",
				"help": "/me will serve wine",
				"acl": 0,
				"mode": [lulz_mode],
				code: function(data){
					cerberus.speak("/me serves " + sender_name + " a :wine_glass:.");
				}
			},
			{//acid
				"name": "/acid",
				"help": "Do you know where your acid is?",
				"acl": 0,
				"mode": [lulz_mode],
				code: function(data){
					cerberus.speak("http://i.imgur.com/qtjwGP8.jpg");
				}
			},
			/*{//data
				"name": "/data",
				"help": "log data",
				"acl": 0,
				"mode": [default_mode],
				code: cerberus.roomInfo(true, function(data) {
					console.log(data);
				})
			},*/
			{//ironchef
				"name": "/ironchef",
				"help": "/me will begin an iron chef competition",
				"acl": 1,
				"mode": [default_mode],
				code: function(data){
					var item1 = "";
					var item2 = "";
					var item3 = "";
					var challenge = "";
					
					do
					{
						item1 = ingredients_list[Math.floor(Math.random() * ingredients_list.length)];
						item2 = ingredients_list[Math.floor(Math.random() * ingredients_list.length)];
						item3 = ingredients_list[Math.floor(Math.random() * ingredients_list.length)];
					}
					while(item1 == item2 || item2 == item3 || item3 == item1);
					challenge = "Your challenge is to combine " + item1 + ", " + item2 + ", and " + item3 + ".";
					cerberus.speak(challenge);
					setTimeout(function() { cerberus.speak("Allez cuisine!!");}, 1000);
					setTimeout(function() { cerberus.speak("/me bows.");}, 1500);
				}
			},
			{ //copy user's laptop stickers
                "name": "/copy",
                "help": "/me will copy indicated user's laptop stickers...",
                "acl": 1,
                "mode": [default_mode],
                code: function(data){
					var target_name = data.text.split("/copy ");
					cerberus.getUserId(target_name[1], function(data){ cerberus.copy(data, data.userid); });
                }
            }
        ];
        return lexicon;
	}catch(err){
		cerberus.fail(err);
	}
//make commands based on current features
};
Bot.prototype.copy = function(data, target_id){
	try{
		var target_placements = cerberus.getStickerPlacements(target_id, function (data) { cerberus.placeStickers(data.placements) });	
	}
	catch(err){
		cerberus.fail(err);
	}
}
Bot.prototype.fail = function(err){
	if (typeof err === 'object') {
        if(err !== null){
			if (err.message) {
				console.log('\nMessage: ' + err.message);
			}
			if(err.stack){
				console.log('\nStacktrace:');
				console.log('====================');
				console.log(err.stack);
			}
        }
	}else{
		console.log('dumpError :: argument is not an object');
	}
//report error dumps
};
Bot.prototype.find_id = function(name){
	try{
		for(var i in users){
			if(name == users[i].name)
			{
				return users[i].id;
			}	
		}
	}
	catch(err){
		cerberus.fail(err);
	}
}
Bot.prototype.find_name = function(id){
	try{
		for(var i in users){
			if(id == users[i].id){
				name = users[i].name;
				return name;
			}
		}
	}catch(err){
		cerberus.fail(err);
	}
//find name in users group
};
Bot.prototype.is_bot = function(id){
	try{
		var bot = false;
		if(id == bot_id){
			bot = true;
		}
		return bot;
	}catch(err){
		cerberus.fail(err);
	}
//check if a user is a mod
};
Bot.prototype.listen = function(data){
	try{
        var name = sender_name;
        var commands = new cerberus.commands();
        var text = data.text.toLowerCase();
        for(var i in commands){
            if(text.match("^" + commands[i].name + "")){
                var mod = mods.indexOf(sender_id);
                for(var j in commands[i].mode){
                    if(commands[i].mode[j]){
                        if(mod >= 0){
                            if(commands[i].acl === 0 || 1){
                                if(sender_id == bot_id){
                                    break;
                                }
                                commands[i].code(data);
                            }
                        }else{
                            if(commands[i].acl === 0){
                                if(data.userid == bot_id){
                                    break;
                                }
                                commands[i].code(data);
                            }
                        }
                    }
                }
            }
        }
        cerberus.help_desk(text, commands);
	}catch(err){
		cerberus.fail(err);
	}
//listen for any bot commands
};
Bot.prototype.help_desk = function(input, lexicon){
	try{
		var commands = lexicon;
        var text = input.toLowerCase();
        for(var i in commands){
            if(text == "help " + commands[i].name){
                cerberus.speak(commands[i].help);
            }
        }
	}catch(err){
		cerberus.fail(err);
	}
//show available commands' help descriptions
};
Bot.prototype.help_menu = function(id){
	try{
		var commands = lexicon;
		var mod = mods.indexOf(id);
        var str = "available commands:";
        for (var i in commands) {
            var modes = commands[i].mode;
            for(var j in modes){
                if(commands[i].mode[j]){
                    if(mod >= 0){
                        if(commands[i].acl === 0 || 1){
                            str += commands[i].name + ", ";
                        }
                    }else{
                        if(commands[i].acl === 0){
                            str += commands[i].name + ", ";
                        }
                    }
                }
            }
        }
        cerberus.speak(str.substring(0, str.length - 2)); 
	}catch(err){
		cerberus.fail(err);
	}
//show available help commands menu
};
Bot.prototype.populate = function(input, output){
	try{
		for(var i in input){
			output.push(input[i]);
		}
	}catch(err){
		cerberus.fail(err);
	}
//cross-populate one array from another
};
Bot.prototype.populate_users = function(input, output){
	try{
		for(var i in input){
			output.push({name:input[i].name, id:input[i].userid, heartbeat: (afk_limit * 60000), afk: false});
		}
	}catch(err){
		cerberus.fail(err);
	}
//cross-populate one array from another
};
Bot.prototype.title_check = function(user_id){
	try{
		for(var i in special_users)
		{
			if(user_id == special_users[i])
			{
				return title[i];
			}
		}
	}
	catch(err){
		cerberus.fail(err);
	}

}
Bot.prototype.toggle = function(mode, text){
	try{
		if(mode){
			cerberus.speak(text + " is now off");
			return false;
		}else{
			cerberus.speak(text + " is now on");
			return true;
		}
	}catch(err){
		cerberus.fail(err);
	}
//toggle a feature
};
Bot.prototype.whisper = function(data){
	try{
		//console.log(data);
		if(data.command == "chat")
		{
			sender_id = data.userid;
		}
		else if(data.command == 'pmmed'){
			sender_id= data.senderid;
		}
		sender_name = cerberus.find_name(sender_id);
		sender_title = cerberus.title_check(sender_id);
	}
	catch(err){
		cerberus.fail(err);
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//RUNTIME ENVIRONMENT
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
global.cerberus = new Bot(bot_auth, bot_id, room_id);//create bot instance
repl.start('> ').context.bot = cerberus;//add repl for dynamic bot commands

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//TURNTABLE EVENT HANDLERS
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
cerberus.on("ready", function (data){this.ready();});//turntable bot ready
cerberus.on("roomChanged", function (data){this.changed(data);});//bot entering new room
cerberus.on("registered", function (data){this.registered(data);});//handle user register event
cerberus.on("deregistered", function (data){this.deregistered(data);});//handle user deregister event
cerberus.on("speak", function (data){this.chat(data);});//handle chat public chat event
cerberus.on("pmmed", function (data){this.pmmed(data);});//handle bot private message event
cerberus.on("newsong", function (data){this.newsong(data);});//handle new song event
//bot.on("snagged", function (data){this.snagged(data);});//handle song snagged event
//bot.on("update_votes", function (data){this.update_votes(data);});//handle vote event
//bot.on("endsong", function (data){this.endsong(data);});//handle end song event
//bot.on("new_moderator", function (data){this.add_mod(data);});//handle new moderator event
//bot.on("rem_moderator", function (data){this.rem_mod(data);});//handle removed moderator event
//bot.on("add_dj", function (data){this.add_dj(data);});//handle add dj event
//bot.on("rem_dj", function (data){this.rem_dj(data);});//handle remove dj event