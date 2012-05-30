Crafty.c("Background", {

	init: function(){
		      var backgroundSpeed = 1;
		      var backgroundWidth = 480;
		      var backgroundHeight = 160;
		      
			
			this.addComponent("2D, DOM, Image, Parallax")
				.image("assets/background.png", "repeat-x")
				.attr({x:0, y:220, w: backgroundWidth*3, h:320 })
				.parallax(backgroundSpeed,backgroundWidth);

	      }
});

Crafty.c("Midground", {

	init: function(){
		      var midgroundSpeed = 2;
		      var midgroundWidth = 480;
		      

			this.addComponent("2D, DOM, Image, Parallax")
			.image("assets/midground1.png","repeat-x")
			.attr({x:0, y: 600-320,w:midgroundWidth*3, h:320})
			.parallax(midgroundSpeed,midgroundWidth);

	      }
});

Crafty.c("Obstacle", {
	init: function(){
		this.addComponent("DOM, Flicker, Blown, Collision") //Image is loaded with the tilemap
		//.gravity("Below")
		.collision()
		//TODO: select obstacle tile randomly

		//When player touchs it, obstacle is blown away and disappers 
		.onHit("Player", function(){
			//console.log("Obstacle hit by Player\n");
			
			//Trigger FX
			this.blown = true;
			this.flicker = true;
			
			this.delay(function(){
				this.removeComponent("Obstacle"); //Avoid multiple collissions with Player
			},300);
			
			
			
		})
		
		  .onHit("Platform", function(hit) {
            for (var i = 0; i < hit.length; i++) {
                if (hit[i].normal.y !== 0) { // we hit the top or bottom of it
                    this._up = false;
                     //this._falling = false;
                }

                if (hit[i].normal.x === 1) { // we hit the right side of it
                  //  this.x = hit[i].obj.x + hit[i].obj.w;
                }

                if (hit[i].normal.x === -1) { // we hit the left side of it
                  //  this.x = hit[i].obj.x - this.w;
                }
            }
        })
		
	}
	
});

Crafty.c("RabidBunch", {
	//TODO: resettle Rabids after they fall or when they are blocked
	dash: false,
	x_shift: -110,
	init: function(){
		this.addComponent("2D, DOM, rabidSprite, Gravity, Collision")
			.gravity("Platform")
			.attr( {x: -110,y: 300})	
			.collision()
			.bind("EnterFrame",function(frame){
				//this.x = 0 - Crafty.viewport.x;
				this.x = this.x_shift - Crafty.viewport.x;				
				
				//Run visual effect
				if(frame.frame % 16 === 0){
					this.move("ne", 3);
				}else if (frame.frame % 8 === 0){
					this.move("sw", 3);
				}
				
				//TODO: change spawning trigger
				if(frame.frame % 290 === 0){
					this.sprint();
					this.dash = true;
				}
				
			})	
			
		//Platform support RabidBunch and it never falls	
		.onHit("Platform", function(hit) {                                                                                                                                                                 	          	
			//Avoid Bunch from falling dawn
          for (var i = 0; i < hit.length; i++) {

                if (hit[i].normal.y === 1) { // we hit the bottom of it
                    this.y = hit[i].obj.h + this.h;
                }
                
                if (hit[i].normal.y === -1) { // we hit the top of it
                    this.y = hit[i].obj.y - this.h;
                }
            }

		});
		

			
	},
	
	sprint: function(){
		this.bind("EnterFrame", function(frame){
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
		})
	}
})

Crafty.c("Chainsaw", {
	//TODO: Randomize intial x value
	ceilingPosition: 27200,
	//ceilingPosition: 600, //Debug position
	descending: true,
	assetHeight: 240,
	assetWidth: 70,
	descendSpeed: 3,
	descendHeight: 70,//0,
	
	init: function(){
		this.addComponent("2D, DOM, chainsawSprite, Flicker, Rumble, Collision")
			.attr( {x: this.ceilingPosition,
				y: -this.assetHeight, 
				h: this.assetHeight, 
				w: this.assetWidth,
				rotation: 45})	
			.collision()
			
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

Crafty.c("Platform", {
    init: function() {
        this.addComponent("Collision");    
        this.collision();    
    }   
});
