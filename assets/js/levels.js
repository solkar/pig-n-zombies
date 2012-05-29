Crafty.scene("Loading",function(){
	var toLoad = [];

	toLoad.push("assets/img/cerdo.png","img/background.png","assets/img/play1_atlas0.png","assets/stage1.json");
	for(var i in Crafty.assets){
		toLoad.push(i);
	}
	//Crafty.scene("Level1");
	Crafty.scene("SplashScreen");
	//Crafty.scene("Benchmarking");//Test purpose only
});


Crafty.scene("SplashScreen",function(){

	Crafty.e("SplashBackground");
	//Crafty.scene("Stage1");
});



Crafty.scene("Stage1", function(){
	var tileMapwidth = 32*1000; //tile pixel width * number of tiles
	var scrollSpeed = 4;//TODO: sync initial speed with Player
	
	Crafty.pause(false); //TODO:remove

	//Reset viewport
	Crafty.viewport.x = 0;
	

	
	//Current tilemap
	//var tileMap = Crafty.e("TiledLevel").tiledLevel("assets/tilemaps/jump_collision_test_level.json","");
	var tileMap = Crafty.e("TiledLevel").tiledLevel("assets/tilemaps/test_level04.json","");	
	
	tileMap.bind("EnterFrame", function(){
			Crafty.viewport.x = Crafty.viewport.x - scrollSpeed;
			//console.log("x:"+Crafty.viewport.x + "\n"); 
			if(Crafty.viewport.x < -tileMapwidth){
					//viewport.x = 0;
					//Crafty.removeComponent("Player",true);
					
					Crafty.viewport.x = Crafty.viewport.x + tileMapwidth;
					//Crafty("Player").x = 00;
			}
		});
		

	//New component to support gravity
	Crafty.e("2D, DOM, Color, Below")
		.attr({x:0, y:580, w:5, h:16})
		.color("YELLOW");
		

	//Next tilemap to appear
	//var tileMap2 = Crafty.e("TiledLevel").tiledLevel("assets/tilemaps/motherTileMap02.json","");

	
	
	//Set player into the scene
	var player = Crafty.e("Player");
		//.animate("dummy",120,-1);
		


	//Load Parallax background elements
	Crafty.background("black");
	Crafty.e("Background");
	Crafty.e("Midground");
	
	Crafty.e("Chainsaw");
	Crafty.e("RabidBunch");	

	//I am not sure it this is the best place for this logic
	Crafty.bind("UpdateSceneSpeed",function(speed){
		//console.log("Udate Scene speed to:"+speed+"\n");
		scrollSpeed = speed;
	});

	Crafty.bind("GameOver",function(score){
		//Reload Scene
		//Crafty.scene("Level1");

		Crafty.pause(true);
		//TODO: stop animations
		player.trigger("PausePlayer");

		//Reset viewport
		Crafty.viewport.x = 0;
		tileMap.unbind("EnterFrame");

		//Load Splash screen
		Crafty.e("SplashBackground");
		//.attr({z:1});
		
		$('#cr-stage').addClass('transparent');

		//Crafty.scene("SplashScreen");
	});
	
	 /**@
	* #UpdateScore
	* Print player score on the screen, given by the frame number
	* Score is passed as string
	* @trigger 
	*/
	


	Crafty.bind("UpdateScore", function(score){
		//Wipe out HUD
		Crafty("HUD").destroy();
		
		//Print meters sign
		Crafty.e("2D, DOM, HUD, meters")
			.attr({x:736-Crafty.viewport.x
				, y:60})
		
		
		for (var i = 0; i < score.length; i++){
			Crafty.e("2D, DOM, HUD")
			 .attr({x:720-16*i-Crafty.viewport.x
				, y:60})
			.addComponent("num"+score[score.length - 1 - i]); //Don't like the -1
		}
		
		//TODO: Stop counting when game is paused
		
	});

});