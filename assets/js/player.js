Crafty.c("Player", {
	//Player scroll speed controls
	x_speed : 1,
	MAX_EDGE_DISTANCE: 280,
	edge_distance: 185, //180 collision with RabidBunch
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

		//this.addComponent("2D, DOM, player, SpriteAnimation, Keyboard, Collision, Gravity")
		this.addComponent("2D, DOM, cerdo, SpriteAnimation, Keyboard, Collision, Gravity, Flicker, WiredHitBox")
		.animate("run", 0, 0, 15)
		.animate("dummy", 0, 0, 23)
		.animate("jump", 8, 0, 37)
		.gravity("Below")//Component that stops gravity
		.gravityConst(0.20) //Default value is 0.2
		.attr({
			x : this.edge_distance,
			y : 290,
			w : 128,
			h : 148,
			z : 1000
		})
		.bind("EnterFrame", function() {

			//Update player speed
			if(Crafty.frame() % 29 === 0) {
				//console.log("Pace Increased!!!\n");
				this.trigger("IncreasePace");
			}

			//Jump logic
			if(this.jumpEnable === true) { //Avoid double jump
				var jumpHeight = jumpBase - this.y;
				
				if(this.descending === false){ //Rising
					if ((jumpHeight <= jumpHeightMin) || (jumpHeight <= jumpHeightMax && keyDown === true)){ //Until min Height no need to check KeyDown
						//Ascend	
						this.descending = false;		
						this.antigravity()
						this.y = this.y - jumpSpeed;
							
					}else{ 
						this.descending = true;
						//Stop ascension
						this.gravity();
	
					}
				}else{ //Descending

				} 
				

			} else { //Running over a platform
				jumpBase = this.y;
				this.gravity();
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

		}).bind("KeyUp", function(e) {
			if(e.keyCode === Crafty.keys.SPACE) {
				keyDown = false;
			}
		}).bind("KeyDown", function(e) {
			if(e.keyCode === Crafty.keys.SPACE) {
				keyDown = true;
				if(this.jumpEnable === false){
					this.jumpEnable = true;
					this.descending = false;
				}
			}

		})

		
		.bind("WallCrash", function(){
			//Stop player side-scroll
			this.x_speed = 0;
			Crafty.trigger("UpdateSceneSpeed", this.x_speed);
			
			//Free fall
			this.gravity(""); //Disable Platform as support for player
			//this.gravityConst(0.6); //Fall faster
			
			
		})

		//Triggered by Gravity component
//	.bind("hit", function(){
//			
//		//Stop jump process
//		if(this.descending === true){
//			this.descending = false;
//			this.jumpEnable = false;
//		}else{	
//		//}else if(this.descending === false && this.jumpEnable === true){ //Hit the ceiling
//		    		//TODO: rafactor this as Descending event
//		    		//Stop ascension
//		    		this.descending = true;
//					this.gravity();	
//		}
//		
//	})

		.onHit("Solid", function(hit) {
			//Debug only: apply to make collision evident on testing
			//this.flicker = true;		
			//Avoid player from getting inside the tile
            for (var i = 0; i < hit.length; i++) {
                if (hit[i].normal.y === -1) { // player hits from the bottom
                    this._falling = false;
                    this._up = false;
                    this.y = hit[i].obj.y - this.h;
                }
                
                //TODO: Remove onHit for Solid compoment when this works
				if (hit[i].normal.x === -1){ //Player hits a wall from the left

                	this.x = hit[i].obj.x - this.w;	
                	
                	this.trigger("WallCrash");
                }else if(hit[i].normal.x === 1){
                	
                	this.x = hit[i].obj.x + hit[i].obj.w;	
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

			}, 1500);
		})
		
		.onHit("RabidBunch", function(){
			
			//Animation alternative
			var banner = this.addComponent("Image").image("assets/img/chopped_banner.png");
			
			//set score
			this.delay(function() {
		
				Crafty.trigger("GameOver", this.score);
				//this.trigger("ResetPlayer");
		
				}, 1500);
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
