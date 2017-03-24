//This sets the variable for the spacebar.
var spaceKey;

var ground;
var player;
var obstacle;

//This sets the score to start at -1.
var score = -1;


var GAME_WIDTH = 800;
var GAME_HEIGHT = 600;
var GAME_CONTAINER_ID = 'gameDiv';

//This is the object which runs the game.
//preload - loads all the assests
function preload(){
    game.load.image('background', 'assets/background.png');
    game.load.image('player', 'assets/tornado.gif');
    game.load.image('ground', 'assets/green hill.png');
    game.load.image('obstacle', 'assets/wallVertical.png');
    game.stage.backgroundColor = "#2040E1";
    game.load.image('gameOver', 'assets/eggmanandemerald.gif');
    game.load.audio('backgroundMusic','assets/greenhill.mp3');
    
};
//Adds in the obstacles and characters
function create(){
	game.physics.startSystem(Phaser.Physics.ARCADE);
	player = game.add.sprite(game.width/8, game.world.height*(1/32), 'player');
	game.physics.arcade.enable(player)
	obstacle = game.add.sprite(700,game.world.height, 'obstacle');
	obstacle.scale.setTo(1,1);
	obstacle.anchor.setTo(0,1);
	game.physics.arcade.enable(obstacle);
	obstacle.body.immovable = true;
	//This sets up a group call platforms. For future functionality we can set all horizontal surfaces to this group.
	platforms = game.add.group();
	platforms.enableBody = true;
	//This creates the ground, and makes it solid object the player will not pass through.
	ground = platforms.create(0, GAME_HEIGHT, 'ground');
	ground.anchor.setTo(0,1);
	ground.scale.setTo(4, 1);
	game.physics.arcade.enable(ground);
	ground.body.immovable = true;

    spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    music = game.add.audio('backgroundMusic');
    music.play()
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 600;
    scoretext = game.add.text(16, 16, 'score: 0', { fontsize: '32px', fill: '#000' });
};

function update(){
	game.physics.arcade.collide(player, ground);
	game.physics.arcade.collide(player, obstacle);
	if (spaceKey.isDown) {
	  player.body.velocity.y = -300;  
  	}
  	if (obstacle.x > 600) {
  		obstacle.x -= 0.05;
  		   
  	}  
  	if (obstacle.x < 0) {
	  	obstacle.kill();
	  	obstacle = game.add.sprite(900, GAME_HEIGHT, 'obstacle');
	  	obstacle.scale.setTo(1,1);
	  	obstacle.anchor.setTo(0,1);
	  	game.physics.arcade.enable(obstacle);
	  	obstacle.body.immovable = true;
	};
	if (obstacle.x < 5 && player.x > 5){
  		score++;
  		scoretext.text = 'score: ' + score;  
	};   
	if (player.x < 0){
	  scoretext = game.add.text(350,200, 'Eggman Got the Master Emerald!', {fill: '#ff0000'});
		obstacle.kill();
		player.kill(); 
	};
};
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv', { preload: preload, update: update, create: create });

game.state.start();