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
	var scrollSpeed = 4;//TODO: sync initial speed with Player
	
	Crafty.pause(false); //TODO:remove

	//Reset viewport
	Crafty.viewport.x = 0;
	
	//Current tilemap
	var tileMap = Crafty.e("TiledLevel").tiledLevel("assets/tilemaps/motherTileMap03.json","");
	//var tileMap = Crafty.e("TiledLevel").tiledLevel("assets/stage1.json","");	
	

	
	tileMap.bind("EnterFrame", function(){
			Crafty.viewport.x = Crafty.viewport.x - scrollSpeed;
			//console.log("x:"+Crafty.viewport.x + "\n"); 
			if(Crafty.viewport.x < -3500){
					//viewport.x = 0;
					//Crafty.removeComponent("Player",true);
					
					Crafty.viewport.x = Crafty.viewport.x + 3500;
					//Crafty("Player").x = 00;
			}
		});
		

		

	//Next tilemap to appear
	//var tileMap2 = Crafty.e("TiledLevel").tiledLevel("assets/tilemaps/motherTileMap02.json","");

	
	
	//Set player into the scene
	var player = Crafty.e("Player")
		.animate("dummy",120,-1);
		

	//Get all the entities with "MapTile" component
	var tileList = Crafty("2D Maptile"); //Returns 0
	var j;
	
	for(j=0; j < 102; j += 1)
	{
		console.log(tileList[j]);
		tileList[j].destroy();
	}

	//Create a pitfall dynamically
	var i;
	
	for(i = 20; i <= 2799; i += 1)
	{
		Crafty("tileSprite"+i).destroy();
		Crafty("Player").destroy();
	}

	//Load Parallax background elements
	//Crafty.background("black");
	//Crafty.e("Background");
	//Crafty.e("Midground");
	
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

});