Crafty.c("Player", {
	//Player scroll speed controls
	x_speed : 1,
	_minSpeed : 1,
	_maxSpeed : 5,
	_speedShift : 1,
	//Score
	score : 666, //TODO: logic to calc score
	init : function() {
		var keyDown = false;

		var jump = false;
		//var jumpSpeed = 5; //with Gravity
		var jumpSpeed = 2;
		//without Gravity
		var jumpBase = 0;
		//var jumpHeight = 30;//without Gravity
		var jumpHeight = 20;
		//var hSpeed = 1;
		//TODO: Remove, deprecated

		var falling = true;
		var hungryCrowdWidth = 5;
		//pixels
		var playerPaused = false;

		//this.addComponent("2D, DOM, player, SpriteAnimation, Keyboard, Collision, Gravity")
		this.addComponent("2D, DOM, cerdo, SpriteAnimation, Keyboard, Collision, Gravity, Flicker").animate("run", 0, 0, 15).animate("dummy", 0, 0, 23).animate("jump", 8, 0, 37).gravity("Platform")//Component that stops gravity
		//.gravityConst(1) //Default value is 2
		.attr({
			x : 90,
			y : 90,
			w : 128,
			h : 148,
			z : 1000
		}).bind("EnterFrame", function() {

			//Update player speed
			if(Crafty.frame() % 29 === 0) {
				//console.log("Pace Increased!!!\n");
				this.trigger("IncreasePace");
			}

			//Jump logic
			if(jump == true) {
				this.antigravity()
				this.y = this.y - jumpSpeed;

				if(this.y == jumpBase - jumpHeight) {
					jumpSpeed = -jumpSpeed;
					//Stop ascension
					this.gravity();
				} else if(this.y <= jumpBase && jumpSpeed < 0) {
					jumpSpeed = -jumpSpeed;
					//Toggle back to a positive value
					jump = false;
					this.gravity();
				}

			} else {
				jumpBase = this.y;
			}

			//Player advances
			if(playerPaused != true) {
				this.x = this.x + this.x_speed;
			}

			//Deprecated by Gravity component
			if(falling == true) {
				//	this.y += 1;
			}

			falling = true;
			//

			//Test death conditions
			if(this.y >= Crafty.viewport.height) {//Check if the player is out of bounds
				this.trigger("PitFall");
			} else if(this.x <= 0 + hungryCrowdWidth) {//Zero or Crafty.viewport.width???
				this.trigger("HumanEaten");
			}

		}).bind("KeyUp", function(e) {
			if(e.keyCode === Crafty.keys.SPACE) {
				keyDown = false;
			}
		}).bind("KeyDown", function(e) {
			if(e.keyCode === Crafty.keys.SPACE) {
				keyDown = true;
				jump = true;
			}

		})
		//Behaviour when there is solid floor below
		.onHit("Solid", function(e) {
			falling = false;
			jump = false;
		}).onHit("Platform", function(e) {
			jump = false;
		})
		//Behaviour when hitting an obstacle
		.onHit("Obstacle", function(e) {
			console.log("Stumble upon object!");

			//TODO: load treppling animation
			//Apply flicker
			this.flicker = true;
			this.delay(function() {
				this.flicker = false;
			}, 1500);

			this.trigger("ReducePace");
		})
		//Chainsaw chops player
		.onHit("Chainsaw", function() {
			//TODO: add animation
			//this.animate("chopped", 120,1);

			//Animation alternative
			var banner = this.addComponent("Image").image("assets/img/chopped_banner.png");

			//set punctuation
			this.delay(function() {

				Crafty.trigger("GameOver", this.score);
				this.trigger("ResetPlayer");

			}, 1500);
		}).bind("ReducePace", function() {
			//TODO: load KO animation

			//Reduce player speed
			if(this.x_speed > this._minSpeed) {
				this.x_speed = this.x_speed - this._speedShift;
				Crafty.trigger("UpdateSceneSpeed", this.x_speed);
				//Update tilemap scroll speed to have both in sync
				console.log("Speed down to" + this.x_speed + "\n");

			}
		}).bind("IncreasePace", function() {
			//Top speed 5 px/frame
			if(this.x_speed < this._maxSpeed) {
				this.x_speed = this.x_speed + this._speedShift;
				Crafty.trigger("UpdateSceneSpeed", this.x_speed);
				console.log("Speed up to" + this.x_speed + "\n");
			}
		})
		//Death behaviours
		.bind("PitFall", function() {

			//TODO: Pause game

			//TODO: Show punctuation

			//TODO: Show death message
			//End game
			Crafty.trigger("GameOver", this.score);
			//set punctuation
			this.trigger("ResetPlayer");

		}).bind("HumanEaten", function() {
		}).bind("PausePlayer", function() {
			playerPaused = true;
		}).bind("PlayPlayer", function() {
			playerPaused = false;
		}).bind("ResetPlayer", function() {
			this.attr({
				x : 90,
				y : 90,
				w : 128,
				h : 148,
				z : 1000
			});
			this.animate("dummy",120,-1);

		});
	}
});
