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

Crafty.scene("Level1", function(){
	var toLoad = [];

	toLoad.push("assets/player.png","assets/background.png","assets/floor2-middle.png","assets/sewer_tileset.png","assets/sewer.json");
	for(var i in Crafty.assets){
		toLoad.push(i);
	}
	
	Crafty.pause(false); //TODO:remove

	//Reset viewport
	Crafty.viewport.x = 0;

	var tileMap = Crafty.e("TiledLevel").tiledLevel("level1.json", "assets/")
		//.attr({x: 0, y: 0, w: 200, h: Crafty.viewport.height})
		.bind("EnterFrame", function(){
			Crafty.viewport.x -= 1; //Scroll pos X at 1px/frame
			//Crafty.viewport.scroll('_x', -1);//Doesn't work
		});

	
	//tileMap.attr({x: 50, y: 0, w: Crafty.viewport.width, h: Crafty.viewport.height});
	
	
	//Set player into the scene
	var player = Crafty.e("Player")
		.attr({ x: 240, y: 180, w: 30, h: 30, z:1000})
		.animate("run",12,-1);

	//Load background
	Crafty.background("black");
	var bckGround = Crafty.e("Background");

	Crafty.e("Midground");


	//Experiments with viewport
	//Crafty.viewport.scroll('_x',-300);
	//Crafty.viewport.pan('x', 100, 40)
	//Crafty.viewport.x -= 20;
	//
	
	Crafty.bind("EnterFrame", function(){
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
		

		//var stage = $('#cr-stage');
		//stage.addClass('#transparent');
		$('#cr-stage').addClass('transparent');

		//Crafty.scene("SplashScreen");
	});

});

Crafty.scene("SplashScreen",function(){

	Crafty.e("SplashBackground");
	//Crafty.scene("Stage1");
});


Crafty.scene("Benchmarking", function(){
	var toLoad = [];

//	toLoad.push("assets/player.png","assets/background.png","assets/floor2-middle.png","assets/sewer_tileset.png","assets/sewer.json");
//	for(var i in Crafty.assets){
//		toLoad.push(i);
//	}
	
	Crafty.pause(false); //TODO:remove

	//Reset viewport
	Crafty.viewport.x = 0;

	var tileMap = Crafty.e("TiledLevel").tiledLevel("level1.json", "assets/")
		//.attr({x: 0, y: 0, w: 200, h: Crafty.viewport.height})
		.bind("EnterFrame", function(){
			Crafty.viewport.x -= 1; //Scroll pos X at 1px/frame
			//Crafty.viewport.scroll('_x', -1);//Doesn't work
		});

	
	//tileMap.attr({x: 50, y: 0, w: Crafty.viewport.width, h: Crafty.viewport.height});
	
	
	//Set player into the scene
	var player = Crafty.e("Player")
//	.attr({
//		x : 90,
//		y : 90,
//		w : 128,
//		h : 148,
//		z : 1000
//	})

		.animate("dummy",120,-1);

// 	var clones = Crafty.e("Player")
//		.attr({ x: 320, y: 90, w: 30, h: 30, z:1000})
//		.animate("jump",1,-1);
//
//	var moreClones = Crafty.e("Player")
//		.attr({ x: 300, y: 120, w: 30, h: 30, z:1000})
//		.animate("jump",50,-1);
//
//	for (i=0;i<120;i=i+5)
//	{
//		Crafty.e("Player")
//			.attr({x: 320 + i, y:90})
//			.animate("jump",50,-1);
//	}

	//Load background
	Crafty.background("black");
	var bckGround = Crafty.e("Background");

	Crafty.e("Midground");


	//Experiments with viewport
	//Crafty.viewport.scroll('_x',-300);
	//Crafty.viewport.pan('x', 100, 40)
	//Crafty.viewport.x -= 20;
	//
	
	Crafty.bind("EnterFrame", function(){
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
		

		//var stage = $('#cr-stage');
		//stage.addClass('#transparent');
		$('#cr-stage').addClass('transparent');

		//Crafty.scene("SplashScreen");
	});

});

Crafty.scene("Stage1", function(){
	var scrollSpeed = 4;//TODO: sync initial speed with Player
	

	
	Crafty.pause(false); //TODO:remove

	//Reset viewport
	Crafty.viewport.x = 0;

	//Current tilemap
	var tileMap = Crafty.e("TiledLevel").tiledLevel("assets/tilemaps/motherTileMap01.json","")
		.bind("EnterFrame", function(){
			//Crafty.viewport.x = Crafty.viewport.x - 4; //Scroll pos X at 1px/frame
			//Crafty.viewport.scroll('_x', -1);//Doesn't work
			Crafty.viewport.x = Crafty.viewport.x - scrollSpeed; 
		});
		
	//Next tilemap to appear
	var tileMap2 = Crafty.e("TiledLevel").tiledLevel("assets/tilemaps/motherTileMap01.json","")
	.attr({y: 300})
	.bind("EnterFrame", function(){
		//this.x = tCrafty.viewport.x - scrollSpeed;
	});
	
	
	//Set player into the scene
	var player = Crafty.e("Player")
		.animate("dummy",120,-1);
		


	//Load Parallax background elements
	//Crafty.background("black");
	Crafty.e("Background");
	Crafty.e("Midground");

	
	Crafty.e("Chainsaw");
	Crafty.e("RabidBunch");	

	//Experiments with viewport
	//Crafty.viewport.scroll('_x',-300);
	//Crafty.viewport.pan('x', 100, 40)
	//Crafty.viewport.x -= 20;
	//
	
	//I am not sure it this is the best place for this logic
	Crafty.bind("UpdateSceneSpeed",function(speed){
		console.log("Udate Scene speed to:"+speed+"\n");
		scrollSpeed = speed;
	});
	
	Crafty.bind("EnterFrame", function(){

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
		

		//var stage = $('#cr-stage');
		//stage.addClass('#transparent');
		$('#cr-stage').addClass('transparent');

		//Crafty.scene("SplashScreen");
	});

});
