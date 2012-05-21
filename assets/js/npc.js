Crafty.c("Floor", {
	init: function(){
		      this.addComponent("2D,DOM,floor");
	      }
});

Crafty.c("Background", {

	init: function(){
		      var backgroundSpeed = 1;
		      var midgroundSpeed = 3;
		      var backgroundWidth = 480;
		      var backgroundHeight = 160;
		      var midgroundWidth = 480;

		      this.addComponent("2D, DOM, Image").image("assets/background.png", "repeat-x")
			//.attr({x:0, y:0, w: Crafty.viewport.width, h:320 })
			.attr({x:0, y:0, w: Crafty.viewport.width*2, h:160 })

			.bind("EnterFrame", function(){
				//Crafty.viewport.scroll('y',this.y + 10);
				this.x -= backgroundSpeed;
				if(this.x <= -backgroundWidth)
				{
				 //this.x = Crafty.viewport.width;
				 this.x = 0;
				}
			});

	      }
});

Crafty.c("Midground", {

	init: function(){
		      var backgroundSpeed = 1;
		      var midgroundSpeed = 3;
		      var backgroundWidth = 480;
		      var backgroundHeight = 160;
		      var midgroundWidth = 480;


			this.addComponent("2D, DOM, Image").image("assets/midground1.png", "repeat-x")
			.attr({x:0, y: backgroundHeight/2-25, w: Crafty.viewport.width*2, h:480 })


			.bind("EnterFrame", function(){
				this.x -= midgroundSpeed;
				if(this.x <= -midgroundWidth)
				{
				 //this.x = Crafty.viewport.width;
				 this.x = 0;
				}
			});

	      }
});

Crafty.c("SplashBackground", {
	init: function(){
			//Add transparency
		     // var stage = $('#cr-stage')
		//		.addClass('transparent');


		      this.addComponent("2D, DOM, Image")
			.image("assets/bomb.png")
			//TODO: create transparent foreground
			
			//TODO: shown punctuation
			
			//TODO: Game Over message

			//TODO:Remove screen when key is pressed
			.bind("KeyDown", function(e){ 
			      if (e.keyCode === Crafty.keys.SPACE){
				     
				     Crafty.scene("Stage1");
				     // Crafty.trigger("Reset");
				     $('#cr-stage').removeClass('transparent');

				     //UNPAUSE the game
				     //Crafty.init(); //Doesn't  work
				     //Crafty.trigger("EnterFrame"); //Doesn't work
				     //Crafty.unpause();//NG

			      } 
		      
		      });

	      }
});

Crafty.c("Obstacle", {
	init: function(){
		this.addComponent("DOM, Flicker, Blown, Gravity") //Image is loaded with the tilemap
		.gravity("Platform")
		//TODO: select obstacle tile randomly

		//When player touchs it, obstacle is blown away and disappers 
		.onHit("Player", function(){
			console.log("Obstacle hit by Player\n");
			
			//Trigger FX
			this.blown = true;
			this.flicker = true;
			
			//Remove obstacle form the screen
			this.delay(function() {
       		  this.destroy();
			}, 1500);
			
		})
		
	}
	
});

Crafty.c("RabidBunch", {
	//TODO: resettle Rabids after they fall or when they are blocked
	dash: false,
	x_shift: -110,
	init: function(){
		this.addComponent("2D, DOM, Image, Gravity")
			.gravity("Platform")
			.image("assets/img/dummy-bunch.png")
			.attr( {x: 0,y: 200, h: 120, w: 190})	
			
			.bind("EnterFrame",function(frame){
				//this.x = 0 - Crafty.viewport.x;
				this.x = this.x_shift - Crafty.viewport.x;
				
				
				//Run effect
				if(frame.frame % 16 === 0){
					this.move("ne", 3);
				}else if (frame.frame % 8 === 0){
					this.move("sw", 3);
				}
				
				//Dash effect
				if(frame.frame % 2 === 0 ){

					if(this.dash === true) {
						if(this.x + Crafty.viewport.x < 0) {
							//this.delay(function() {
							this.x_shift = this.x_shift + 9;
							//Disable effect
							//}, 1500);
						} else if(this.x + Crafty.viewport.x >= 0) {
							this.dash = false;
						}
					} else if(this.dash === false && this.x_shift > -110){
						this.x_shift = this.x_shift - 1;
					}

				}
				
				
				
				
				//Effect triggers
				//if(frame.frame % 30 === 0){
				if(frame.frame % 290 === 0){
					this.trigger("Dash");
					this.dash = true;
				}
				
			})	
			
	}
});

Crafty.c("Chainsaw", {
	//TODO: Randomize intial x value
	ceilingPosition: 600,
	descending: true,
	assetHeight: 180,
	assetWidth: 200,
	descendSpeed: 3,
	descendHeight: 150,//0,
	
	init: function(){
		this.addComponent("2D, DOM, Image, Flicker, Rumble, Collision")
			.image("assets/img/dummy-chainsaw.png")
			.attr( {x: this.ceilingPosition,
				y: -this.assetHeight, 
				h: this.assetHeight, 
				w: this.assetWidth})	
			
			.bind("EnterFrame",function(){
				if(this.descending === true){
					this.flicker = true;
					//this.rumble = true;
					if(this.y < this.descendHeight){
						this.shift(0,this.descendSpeed);
					}else{
						this.descending = false;
					}
					this.x = this.ceilingPosition - Crafty.viewport.x;
				}else{
					this.flicker = false;
					this.rumble = true;
					if(this.x + this.w < Crafty.viewport.x){
						this.destroy();
					}
				}					
			})	
			

	}
});
