Crafty.c("Floor", {
	init: function(){
		      var stage = $('#cr-stage');
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

		      var stage = $('#cr-stage');
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

		      var stage = $('#cr-stage');
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
		this.addComponent("DOM, Flicker, Blown") //Image is loaded with the tilemap
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
