Crafty.c("Flicker",{
   flicker:	false,
   init:	function(){
       //this.flicker = true;
      
       this.bind("EnterFrame",function(frame){
           if(frame.frame % 5 == 0 && this.flicker){
               if(this.alpha == 0.0){
                   this.alpha = 1.0;
               }else{
                   this.alpha = 0.0;
               }
           }
           if(!this.flicker){
                this.alpha = 1.0;
           }
       });
   }
   
});

Crafty.c("Blown", {
	blown:	false,
	blownSpeed: 2,
	init:	function(){
		//this.blown = true;
		this.addComponent("Collision")
		//	.gravity("Below") //Component that stops gravity
		//	//TODO: set gravityConst randomly
		//	//.gravityConst(.15)
		//	.gravityConst(Crafty.math.randomNumber(0.05,0.13))
		//	.antigravity();
		
		this.bind("EnterFrame", function(frame){
			
			if(this.blown){
				//console.log("Obstacle blown up!\n");
				
				//Rising
				this.move("ne", 2*this.blownSpeed);
				this.move("e", 3*this.blownSpeed);
				this.rotation = this.rotation + 5;
				
				//Remove obstacle form the screen
				this.delay(function() {
	       		  this.destroy();
				}, 1500);
				
			}
		});
	}
})

Crafty.c("Rumble",{
	rumble: false,
	init: function(){
		this.bind("EnterFrame", function(frame){
			if(frame.frame % 3 === 0 && this.rumble){
				this.move("nw",5);
			}else if(frame.frame % 2 === 0 && this.rumble){
				this.move("se",5);
			}
			//else if(frame.frame % 4 === 0 && this.rumble){
			//	this.move("sw",5);
			//}else if(frame.frame % 5 ===0 && this.rumble){
			//	this.move("ne",5);
			//}
		})
		
	}
})

Crafty.c("Parallax",{
	_speed: 0,
	_width: 0,
	_parallaxShift: 0,
	parallax: function(speed, width){
		this.requires("2D");
		this._speed = speed;
		this._width = width;
		
		this.bind("EnterFrame", function(){
				this.x =  - Crafty.viewport.x + this._parallaxShift;
				this._parallaxShift = this._parallaxShift - this._speed ;
				
				if(this._parallaxShift < -this._width)
				{
					this._parallaxShift = 0;
				}
			});
		
	}
})
