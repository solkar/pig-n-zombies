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
		this.addComponent("Gravity, Collision")
			.gravity("Platform") //Component that stops gravity
			//TODO: set gravityConst randomly
			//.gravityConst(.15)
			.gravityConst(Crafty.math.randomNumber(0.05,0.13));
		
		this.bind("EnterFrame", function(frame){
			
			if(this.blown){
				console.log("Obstacle blown up!\n");
				
				//Rising
				this.move("ne", 2*this.blownSpeed);
				this.move("e", 3*this.blownSpeed);
				this.rotation = this.rotation + 5;
				
				//Descending
				if(frame % 20 == 0){
					console.log("Gravity ready to blow\n");
					this.gravity();
				}
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
