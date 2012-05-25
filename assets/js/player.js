Crafty.c("Player", {
	//Player scroll speed controls
	x_speed : 1,
	MAX_EDGE_DISTANCE: 280,
	edge_distance: 120, //<180 collision with RabidBunch
	obstacle_penalization: 30,
	_minSpeed : 1,
	_maxSpeed : 15,
	_speedShift : 1,
	jumpEnable: false,
	descending: false,
	
	//Score
	score : 666, //TODO: logic to calc score
	init : function() {
		var keyDown = false;

		//var jumpSpeed = 5; //with Gravity
		var jumpSpeed = 6;
		//without Gravity
		var jumpBase = 0;
		var jumpHeightMin = 3*32;
		var jumpHeightMax = 5*32; //Avatar height 148
		//var hSpeed = 1;
		//TODO: Remove, deprecated

		var falling = true;
		var hungryCrowdWidth = 5;
		//pixels
		var playerPaused = false;

		
		//this.addComponent("2D, DOM, cerdo, SpriteAnimation, Keyboard, Collision, Gravity, Flicker, WiredHitBox")
		this.addComponent("2D, DOM, cerdo, Keyboard, Collision, Gravity, Flicker, Twoway")
		.twoway(0,jumpSpeed)
		//.animate("dummy", 0, 0, 23)
		.gravity("Below")//Component that stops gravity
		.gravityConst(0.20) //Default value is 0.2
		.attr({
			x : this.edge_distance,
			y : 190,
			w : 128,
			h : 148,
			z : 1000
		})
		.collision()
		.bind("EnterFrame", function() {

			//Update player speed
			if(Crafty.frame() % 29 === 0) {
				//console.log("Pace Increased!!!\n");
				this.trigger("IncreasePace");
			}


			//Player advances
			if(playerPaused != true) {
				//this.x = this.x + this.x_speed; //Original control
				this.x = this.edge_distance + this.x_speed - Crafty.viewport.x; //Treadmill mode
			}


			//Test death conditions
			if(this.y >= Crafty.viewport.height) {//Check if the player is out of bounds
				this.trigger("PitFall");
			} else if(this.x <= 0 + hungryCrowdWidth) {//Zero or Crafty.viewport.width???
				this.trigger("HumanEaten");
			}

		})
		
		.bind("KeyUp", function(e) {
			if(e.keyCode === Crafty.keys.SPACE) {
				keyDown = false;
			}
		})
		
		.bind("KeyDown", function(e) {
			if(e.keyCode === Crafty.keys.SPACE ) {
				this._up = true;
			}

		})

		
		.bind("WallCrash", function(){
			//Stop player side-scroll
			this.x_speed = 0;
			Crafty.trigger("UpdateSceneSpeed", this.x_speed);
			
			//Free fall
			this.gravity(""); //Disable Platform as support for player

			
		})
		
		.onHit("RabidBunch", function(){
			//Animation alternative
			var banner = this.addComponent("Image").image("assets/img/chopped_banner.png");
			
			//set score
			this.delay(function() {
		
				Crafty.trigger("GameOver", this.score);
				this.trigger("ResetPlayer");

				}, 500);
		})
		
		.onHit("Platform", function(hit) {                                                                                                                                                                            	          	
			//Avoid player from getting inside the tile
          for (var i = 0; i < hit.length; i++) {

                if (hit[i].normal.y === 1) { // we hit the bottom of it
                    this._up = false;
                    this._falling = true;
                    this.y = hit[i].obj.h + this.h;
                }
                
                if (hit[i].normal.y === -1) { // we hit the top of it
                    this._up = false;
                    this._falling = false;
                    this.y = hit[i].obj.y - this.h;
                }

                if (hit[i].normal.x === 1) { // we hit the right side of it
                    this.x = hit[i].obj.x + hit[i].obj.w;
                }

                if (hit[i].normal.x === -1) { // we hit the left side of it
                    this.x = hit[i].obj.x - this.w;
                    
                    this.trigger("WallCrash");
                }
            }

		})
		
		//Player staggers and reduce the pace when hitting an obstacle
		.onHit("Obstacle", function(e) {
			console.log("Stumble upon object!");

			//TODO: load treppling animation
			//Alternative Apply flicker
			this.flicker = true;
			this.delay(function() {
				this.flicker = false;
			}, 1500);

			//Call recude pace method
			this.trigger("ReducePace");
			
			//Rabid bunch approachs 
			Crafty("RabidBunch").trigger("GainTerrain");
			
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

			}, 500);
		})
		

		
		.bind("ReducePace", function() {
			//TODO: load stagger animation

			//Reduce player speed
			if(this.x_speed > this._minSpeed) {
				this.x_speed = this.x_speed - this._speedShift;
				Crafty.trigger("UpdateSceneSpeed", this.x_speed);
				//Update tilemap scroll speed to have both in sync
				console.log("Speed down to" + this.x_speed + "\n");
						
			}
			
			this.edge_distance = this.edge_distance - this.obstacle_penalization; //Penalize player for hitting an obstacle
		})
		
		.bind("IncreasePace", function() {
			//Top speed 5 px/frame
			if(this.x_speed < this._maxSpeed) {
				this.x_speed = this.x_speed + this._speedShift;
				Crafty.trigger("UpdateSceneSpeed", this.x_speed);
				//console.log("Speed up to" + this.x_speed + "\n");
			}
			
			if(this.edge_distance < this.MAX_EDGE_DISTANCE){
				this.edge_distance = this.edge_distance + this.obstacle_penalization/2;
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

		})
		.bind("HumanEaten", function() {
		})
		.bind("PausePlayer", function() {
			playerPaused = true;
		})
		
		.bind("PlayPlayer", function() {
			playerPaused = false;
		})
		
		.bind("ResetPlayer", function() {
			this.attr({
				x : this.edge_distance,
				y : 190,
				w : 128,
				h : 148,
				z : 1000
			});
			//this.animate("dummy",120,-1);

		});
	}
});
