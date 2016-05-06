module.exports = function(app) {

  console.log('in home.js');

  app.controller('HomeController', ['$window', '$scope', '$interval', 'NavService', function($window, $scope, $interval, NavService) {

    var vm = this;
    vm.toProfessional = function() {
      return NavService.toProfessional();
    };

    var intervals = [];

    // $window.alert("10/10 users say best experienced with full screen");

    $scope.$on('$locationChangeStart', function(e) {
      console.log('are you leaving?');
      intervals.forEach(function(interval) {
        if (angular.isDefined(interval)) $interval.cancel(interval);
      });
      intervals = [];
    });

    var weather;
    var daytime;

    var setUp = vm.setUp = function() {
     getWeather();
     //adjustToTime();


     intervals.push($interval(function(){Cloud.drawClouds()},1000));
     intervals.push($interval(function(){loadTree()},5));
     intervals.push($interval(function(){Fish.drawFishes()},200));
     if (weather == "rain" || weather=="snow") {
       intervals.push($interval(function(){Precipitation.drop()},200));
     }
     intervals.push($interval(function(){updateTitle()},1000));
     intervals.push($interval(function(){Bird.handleBirds()},1000));

    //  setInterval(function(){Cloud.drawClouds()},1000);
    //  setInterval(function(){loadTree()},5);
    //  setInterval(function(){Fish.drawFishes()},200);
    //  if (weather == "rain" || weather=="snow") {
    //  setInterval(function(){Precipitation.drop()},200);
    //  }
    //  setInterval(function(){updateTitle()},1000);
    //  setInterval(function(){Bird.handleBirds()},1000);
    }

    function getWeather() {
    $.simpleWeather({
     location: 'Seattle, WA',
     woeid: '',
     unit: 'f',
     success: function(weather) {
     setWeather(weather);
     adjustToTime(weather);
     },
     error: function(error) {
     //$("#weather").html('<p>'+error+'</p>');
     }
     });
    };

    function setWeather(simpWeather) {
     var r = Math.random()*6;
     //https://developer.yahoo.com/weather/documentation.html#codes
     var simpWeatherCode = parseInt(simpWeather.code);
     if (simpWeatherCode <= 12 || simpWeatherCode === 40) {
     weather = "rain";
     } else if (simpWeatherCode <= 18 || (simpWeatherCode >=41 && simpWeatherCode <= 43) || simpWeatherCode === 46) {
     weather = "snow";
     } else {
     weather = "clear";
     }

     if (simpWeatherCode <= 24 || simpWeatherCode===27 || simpWeatherCode===28) {
     Cloud.cloudiness = 5;
     } else if (simpWeatherCode===26 || simpWeatherCode===33 || simpWeatherCode===34) {
     Cloud.cloudiness = 3;
     } else if (simpWeatherCode===29 || simpWeatherCode===30 || simpWeatherCode===44) {
     Cloud.cloudiness = 1;
     } else {
     Cloud.cloudiness = 0;
     }

     Cloud.windspeed = parseInt(simpWeather.wind.speed)/2;


     /*if (weather=="rain") {
     Cloud.cloudiness = Math.floor((Math.random() * 3)+4);
     Cloud.windspeed = Math.floor((Math.random()*6)+3);
     Precipitation.makePuddles();
     } else if (weather == "snow") {
     Cloud.cloudiness = Math.floor((Math.random() * 3)+4);
     Cloud.windspeed = Math.floor((Math.random()*6)+3);
     } else {
     Cloud.cloudiness = Math.floor(Math.random() * 6);
     Cloud.windspeed = Math.floor((Math.random()*6)+3);
     }*/
    };

    function adjustToTime(simpWeather) {
     var sunriseSplit = simpWeather.sunrise.split(':');
     var sunriseHour = parseInt(sunriseSplit[0]);
     var sunriseMin = parseInt(sunriseSplit[1]);

     var sunsetSplit = simpWeather.sunset.split(':');
     var sunsetHour = parseInt(sunsetSplit[0]) + 12; //a little hacky but dont think will be untrue, should check if pm
     var sunsetMin = parseInt(sunsetSplit[1]);

     var time = new Date();
     var timeHour = time.getHours();
     var timeMin = time.getMinutes();
     //if (time.getHours() < 6 || time.getHours() > 16) {
     if (timeHour<sunriseHour || (timeHour===sunriseHour && timeMin<sunriseMin) || timeHour>sunsetHour || (timeHour===sunsetHour && timeMin>sunsetMin) ) {

     daytime = "night";

     var background = document.getElementById('backgroundColorBox');
     background.style.backgroundColor = '#12009b';

     var canvas = document.getElementById('nightCanvas');
     var context = canvas.getContext("2d");
     var rect = canvas.getBoundingClientRect();

     var img = new Image();
     img.onload = function () {
     context.drawImage(img, 0, 0, rect.width, rect.height);
     }
     img.src = "../media/nightveil.png";
     } else {
     daytime = "day";
     }
    };

    function updateTitle() {
     var titleDiv = document.getElementById('title');

     var name = "<h1>ANNIKA HAGELIN</h1>";
     var r = Math.random()*10;
     if (r < 1) {
     name = "<h1>A &nbsp; N &nbsp; K &nbsp; I &nbsp; &nbsp; &nbsp; H &nbsp; G</h1>";
     } else if (r < 2) {
     name = "<h1>ANKIHG.UCOZ.COM</h1>";
     }

     titleDiv.innerHTML = name.concat("<h2>SOFTWARE DEVELOPER</h2>");

     /*var r = Math.random()*60;
     if (r < 1) {
     titleDiv.innerHTML = name.concat("<h2>PROGRAMMERARE</h2>");
     } else if (r < 2) {
     titleDiv.innerHTML = name.concat("<h2>PROGRAMADORA</h2>");
     } else if (r < 3) {
     titleDiv.innerHTML = name.concat("<h2>I <3 TAD</h2>");
     } else {
     titleDiv.innerHTML = name.concat("<h2>SOFTWARE DEVELOPER</h2>");
     }*/

    };

    var  enterMouse = vm.enterMouse = function(id) {
     var r = Math.random()*3;
     if (r < 1) {
     var img = '<img src="../media/flags/flag_red.gif">';
     } else if (r < 2) {
     var img = '<img src="../media/flags/flag_blue.gif">';
     } else {
     var img = '<img src="../media/flags/flag_yellow.gif">';
     }
     document.getElementById(id).innerHTML = img;
    }

    var exitMouse = vm.exitMouse = function(id) {
     document.getElementById(id).innerHTML = '';
    }

    function addTree(context) {
    }

    function printMousePos(e) {
     var cursorX = e.clientX;
     var cursorY = e.clientY;

     //http://www.williammalone.com/briefs/how-to-draw-image-html5-canvas/
     var canvas = document.getElementById('treeCanvas');
     var context = document.getElementById('treeCanvas').getContext("2d");

    // document.getElementById('treeCanvas').top = 0;
    // document.getElementById('treeCanvas').left = "60%";

     var img = new Image();
     img.onload = function () {
     var rect = canvas.getBoundingClientRect();
     var x = e.clientX - rect.left;
     var y = e.clientY - rect.top;
    // var x = e.clientX;
    // var y = e.clientY;


    // context.drawImage(img, x/4.3, y/4.7, 30, 40);
     context.drawImage(img, x/4.3-15, y/4.7-35, 30, 40);
     }
     img.src = "../media/tree.png";


    }

    function loadTrees() {
     Tree.trees = [];
     Tree.clearCanvas();
     for (i=20; i<65; i=i+5) {
     for (j=5; j<30; j=j+i/30) {
     new Tree(j, i);
     }
     }
     Tree.drawTrees();
    }

    function loadTree() {
     //technically loads trees
     if (Tree.treeY < 65) {
     var n = Math.random()*5;
     var i = 0;
     while (i <= n) {
     var x = (Math.random()*25) + 5;
     var y = Tree.getTreeY(); //(Math.random()*45) + 20;
     var tree = new Tree(x, y);
     tree.drawTree();
     i++;
     }
     }
    }

    function growTrees() {
     Tree.clearCanvas();
     Tree.drawTrees();
    }

    vm.reloadTrees = function () {
     Tree.clearCanvas();
     Tree.treeY = 20;
     Tree.emptyTrees();
    }

    //Fish class
    var Fish = vm.Fish = function(x, y) {
     var riverCanvas = document.getElementById('riverCanvas');
     var rect = riverCanvas.getBoundingClientRect();
     this.x = (Math.random()*(rect.width/3))+(rect.width/5);
     this.y = (Math.random()*(rect.height/8))-(rect.height/30);
     //this.x = rect.width/400;
     //this.y = rect.height/40;
     this.width = 20;
     this.height = 20;
     this.frame = 0;

     var c = Math.random()*3;
     if (c < 1) {
     this.frames = Fish.frames;
     } else if (c < 2) {
     this.frames = Fish.framesO;
     }/* else if (c < 3) {
     this.frames = Fish.framesP;
     } else if (c < 4) {
     this.frames = Fish.framesG;
     }*/ else {
     this.frames = Fish.framesR;
     }
     Fish.fishes.push(this);
    }

    Fish.fishes = [];

    Fish.frames = ["../media/fish/fish1.png", "../media/fish/fish2.png", "../media/fish/fish3.png", "../media/fish/fish4.png", "../media/fish/fish5.png", "../media/fish/fish6.png", "../media/fish/fish7.png", "../media/fish/fish8.png", "../media/fish/fish9.png"];

    Fish.framesR = ["../media/fish/fishr1.png", "../media/fish/fishr2.png", "../media/fish/fishr3.png", "../media/fish/fishr4.png", "../media/fish/fishr5.png", "../media/fish/fishr6.png", "../media/fish/fishr7.png", "../media/fish/fishr8.png", "../media/fish/fish9.png"];

    Fish.framesO = ["../media/fish/fisho1.png", "../media/fish/fisho2.png", "../media/fish/fisho3.png", "../media/fish/fisho4.png", "../media/fish/fisho5.png", "../media/fish/fisho6.png", "../media/fish/fisho7.png", "../media/fish/fisho8.png", "../media/fish/fish9.png"];

    Fish.framesP = ["../media/fish/fishp1.png", "../media/fish/fishp2.png", "../media/fish/fishp3.png", "../media/fish/fishp4.png", "../media/fish/fishp5.png", "../media/fish/fishp6.png", "../media/fish/fishp7.png", "../media/fish/fishp8.png", "../media/fish/fish9.png"];

    Fish.framesG = ["../media/fish/fishg1.png", "../media/fish/fishg2.png", "../media/fish/fishg3.png", "../media/fish/fishg4.png", "../media/fish/fishg5.png", "../media/fish/fishg6.png", "../media/fish/fishg7.png", "../media/fish/fishg8.png", "../media/fish/fish9.png"];



    Fish.drawFishes = function() {
     for (var i = 0; i < Fish.fishes.length; i++) {
     var fish = Fish.fishes[i];
     fish.drawFish();
     fish.frame++;
     if (fish.frame >= this.frames.length) {
     var index = Fish.fishes.indexOf(fish);
     fish.removePrevious(document.getElementById('riverCanvas').getContext("2d"));
     if (index > -1) {
     Fish.fishes.splice(index, 1);
     }
     }
     }
    }

    Fish.prototype.drawFish = function() {
     var riverCanvas = document.getElementById('riverCanvas');
     var riverContext = document.getElementById('riverCanvas').getContext("2d");

     this.removePrevious(riverContext);

     var rect = riverCanvas.getBoundingClientRect();
     this.width = rect.width/10;
     this.height = rect.height/10;

     var theFish = this;
     var fish = new Image();
     fish.onload = function () {
     riverContext.drawImage(fish, theFish.x, theFish.y, theFish.width, theFish.height);
     }
     fish.src = this.frames[this.frame];

    };

    Fish.prototype.removePrevious = function(ctx) {
     //covers previous cloud position with transparent pixels
     var img = ctx.createImageData(this.width, this.height);
     for (var i = img.data.length; --i >= 0; )
     img.data[i] = 0;
     ctx.putImageData(img, this.x, this.y);
    };

    var fishJump = vm.fishJump = function() {
    var x = (Math.random()*100)+40;
    var y = (Math.random()*100);
     new Fish(x, y);

     /*var riverCanvas = document.getElementById('riverCanvas');
     var riverContext = document.getElementById('riverCanvas').getContext("2d");

     var rect = riverCanvas.getBoundingClientRect();

     var fish = new Image();
     fish.onload = function () {
     riverContext.drawImage(fish, 20*Math.random(), 20*Math.random(), rect.width/5, rect.height/5);
     }
     fish.src = "/mountains/fish.gif"; */
    }

    /*function puddleFishJump(id) {
     var puddleDiv = document.getElementById(id);
     puddleDiv.innerHTML += '<img src="/mountains/fish.gif" style="position:absolute left:0% top:0% width:30% height:30%">';
    };*/

    //Tree class
    var Tree = vm.Tree = function(x, y) {
     this.x = x;
     this.y = y;
     this.xDiv = (Math.random()*5 + 0);
     this.yDiv = (Math.random()*2 + 0);
     this.width = 30;
     this.height = 40;
     this.widthFactor = 1.1;
     this.heightFactor = 1.2;
     this.widthDiv = 1;//(Math.random()*5 - 5/2);
     this.heightDiv = (Math.random()*5 - 5/2);
     this.yPert = (Math.random()*5 - 5/2);
     Tree.trees.push(this);

     if (weather=="snow") {
     this.imgSrc = "/mountains/snowtree2.png";
     } else {
     this.imgSrc = "../media/tree.png";
     }
    }

    Tree.trees = [];
    Tree.emptyTrees = function() {
     Tree.trees = [];
    }

    Tree.treeY = 20;

    Tree.getTreeY = function() {
     if (Math.random()*(100/Tree.treeY) < 1) {
     Tree.treeY++;
     }
     return Tree.treeY;
    }

    Tree.drawTrees = function() {
     for (i=0; i<Tree.trees.length; i++) {
     var tree = Tree.trees[i];
     //setTimeout(function(){tree.drawTree()},1000);
     tree.drawTree();
     }
    };


    Tree.prototype.drawTree = function() {

     var treeCanvas = document.getElementById('treeCanvas');
     var treeContext = document.getElementById('treeCanvas').getContext("2d");

     var rect = treeCanvas.getBoundingClientRect();
     var xDraw = (this.x+this.xDiv)*rect.width/60;
     var yDraw = (this.yPert*5)+(this.y)*rect.height/60;

     //grow tree
     //this.grow();

     this.width = (this.y/20)*(this.widthFactor*rect.width)/120;//this.widthDiv;
     this.height = (this.y/20)*(this.heightFactor*rect.height)/60;//this.heightDiv;
     var oldWidth = this.width;
     var oldHeight = this.height;
     this.width = this.widthFactor*this.width;
     this.height= this.heightFactor*this.height;

     //move tree left and up to adjust for width and height increase
     xDraw -= (this.width - oldWidth)/2;
     yDraw -= this.height - oldHeight;



     //this.removePrevious(treeContext);

     var tree = this;
     var imgTree = new Image();
     imgTree.onload = function () {

     //treeContext.drawImage(imgTree, tree.x/4, tree.y, tree.width, tree.height);
     treeContext.drawImage(imgTree, xDraw/4.3-15, yDraw/4.7-35, tree.width, tree.height);
     }
     imgTree.src = this.imgSrc;
    }

    Tree.prototype.grow = function() {
     if (Math.random()*10<1) {
     this.heightFactor += .1 * this.heightFactor;
     this.widthFactor += .1 * this.widthFactor;
     }
    }

    Tree.prototype.removePrevious = function(ctx) {
     //covers previous tree position with transparent pixels
     var img = ctx.createImageData(this.width, this.height);
     for (var i = img.data.length; --i >= 0; )
     img.data[i] = 0;
     ctx.putImageData(img, this.x, this.y);
    };

    Tree.clearCanvas = function() {
     //covers treeCanvas with transparent pixels
    var treeCanvas = document.getElementById('treeCanvas');
     var treeContext = document.getElementById('treeCanvas').getContext("2d");

     var rect = treeCanvas.getBoundingClientRect();
     var img = treeContext.createImageData(rect.width, rect.height);
     for (var i = img.data.length; --i >= 0; )
     img.data[i] = 0;
     treeContext.putImageData(img, 0, 0);
    };


    //Cloud class
    var Cloud = vm.Cloud = function () {
     this.canvas = document.getElementById('cloudCanvas');
     this.canvas.style.zIndex = "2";
     this.context;
     var canvasRect = this.canvas.getBoundingClientRect();

     this.y = Math.random() * (5) - 5;
     this.width = (Math.random()*(canvasRect.width/20))+(canvasRect.width/20);
     this.height = (Math.random()*(2*canvasRect.height/4))+(6*canvasRect.height/4);
     this.x = 0 - this.width;
     //this.widthDiv = (Math.random()*20 + 10);
     //this.heightDiv = (Math.random()*2 + 2);
     this.speed = Math.random() * (Cloud.windspeed) + Cloud.windspeed/2;
     this.imgSrc = "../media/weather/cloud.png";
     if (weather == 'rain') {
     this.imgSrc = "../media/weather/raincloud.png";
     }
     Cloud.clouds.push(this);
    };

    Cloud.clouds = [];
    Cloud.windspeed = 5;
    Cloud.cloudiness = 3;

    Cloud.drawClouds = function() {

     var r = Math.random()*25;
     if (r < Cloud.cloudiness) {
     new Cloud();
     }
     /*for (var n=0; n<Cloud.cloudiness; n++) {
     new Cloud();
     }*/
     for (i=0; i<Cloud.clouds.length; i++) {
     var cloud = Cloud.clouds[i];
     cloud.draw();
     }
    };

    Cloud.prototype.draw = function() {
     this.context = this.canvas.getContext("2d");

     this.removePrevious(this.context);

     this.x = this.x + this.speed;

     var cloud = this;
     var imgCloud = new Image();
     imgCloud.onload = function () {
     cloud.context.drawImage(imgCloud,cloud.x, cloud.y, cloud.width, cloud.height);
     }
     imgCloud.src = this.imgSrc;
    };

    Cloud.prototype.removePrevious = function(ctx) {
     //covers previous cloud position with transparent pixels
     var img = ctx.createImageData(this.width, this.height);
     for (var i = img.data.length; --i >= 0; )
     img.data[i] = 0;
     ctx.putImageData(img, this.x, this.y);
    };

    Cloud.prototype.applySunset = function(ctx) {
     //get cloud data, stackoverflow.com/questions/10754661/javascript-getting-imagedata-without-canvas
     var canvasCloudImg = document.createElement('canvas');
     var contextCloudImg = canvasCloudImg.getContext('2d');
     var img = new Image();
     img.src = "../media/clouds/cloud.png";
     contextCloudImg.drawImage(img, 0, 0, this.width, this.height );
     var cloudData = contextCloudImg.getImageData(0, 0, this.width, this.height);

     sunset = ctx.createImageData(this.width, this.height);
     var cloudDataFromCanvas = ctx.getImageData(this.x, this.y, this.width, this.height);
     for (var i = 0; i < sunset.data.length; i += 4) {
     sunset.data[i] = cloudData.data[i];
     if (i+3 < cloudData.data.length) {
     if (cloudData.data[i]==255 && cloudData.data[i+1]==255 && cloudData.data[i+2]==255) {
     sunset.data[i] = cloudData.data[i];
     sunset.data[i+1] = cloudData.data[i+1]-40;
     sunset.data[i+2] = cloudData.data[i+2]-40;
     sunset.data[i+3] = cloudData.data[i+3];
     } else {
     sunset.data[i] = cloudData.data[i];
     sunset.data[i+1] = cloudData.data[i+1];
     sunset.data[i+2] = cloudData.data[i+2];
     sunset.data[i+3] = 0;
     }
    // if (sunset.data[i]>0) {
     //}
     }
     }
     ctx.putImageData(sunset, this.x, this.y);
    }


    var addCloud = vm.addCloud = function() {
     new Cloud();
     //setInterval(function(){Cloud.drawClouds()},1000);
     //cloud.draw();
    }

    //Precipitation class
    var Precipitation = vm.Precipitation = function(type) {
     var rainCanvas = document.getElementById('rainCanvas');
     this.canvas = rainCanvas;
     this.canvasRect = this.canvas.getBoundingClientRect();

     this.type = type;

     this.x = Math.random()*(this.canvasRect.width/5);
     this.y = Math.random()*this.canvasRect.height/100;
     this.width = this.canvasRect.width/60;
     this.height = this.canvasRect.height/20;
     this.speed = 20;
     if (this.type == "rain") {
     this.imgSrc = "../media/weather/raindrops.png";
     } else if (this.type == "snow") {
     this.imgSrc = "../media/weather/snowdrops.png";
     }
     Precipitation.raindrops.push(this);
    }

    Precipitation.raindrops = [];
    Precipitation.maxDrops = 180;

    Precipitation.drop = function() {
     if (Precipitation.raindrops.length < Precipitation.maxDrops) {
     var nDropsMore = 5;
     for (var n=0; n<nDropsMore; n++) {
     new Precipitation(weather);
     }
     }
     for (var i=0; i< Precipitation.raindrops.length; i++) {
     var raindrop = Precipitation.raindrops[i];
     raindrop.draw();
     }
    };

    Precipitation.prototype.draw = function() {
     var rainCanvas = document.getElementById('rainCanvas');
     var rainContext = document.getElementById('rainCanvas').getContext("2d");

     this.removePrevious(rainContext);

     this.y = this.y + this.speed;

     var raindrop = this;
     var img = new Image();
     img.onload = function () {
     rainContext.drawImage(img,raindrop.x, raindrop.y, raindrop.width, raindrop.height);
     }
     img.src = this.imgSrc;

     if (this.y > this.canvasRect.height) {

     this.y = Math.random()*this.canvasRect.height/100;

     /*var index = Precipitation.raindrops.indexOf(this);
     this.removePrevious(rainContext);
     if (index > -1) {
     Precipitation.raindrops.splice(index, 1);
     }*/
     }
    };

    Precipitation.prototype.removePrevious = function(ctx) {
     //covers previous raindrop position with transparent pixels
     var img = ctx.createImageData(this.width, this.height);
     for (var i = img.data.length; --i >= 0; )
     img.data[i] = 0;
     ctx.putImageData(img, this.x, this.y);
    };

    Precipitation.makePuddles = function() {
     var puddleDiv = document.getElementById('puddleDiv');
     var img = '<img src="/mountains/puddleX.gif">';
     puddleDiv.innerHTML = img;

     var puddleDiv2 = document.getElementById('puddleDiv2');
     var img2 = '<img src="/mountains/puddle2.gif">';
     puddleDiv2.innerHTML = img2;

     var puddleDiv3 = document.getElementById('puddleDiv3');
     var img3 = '<img src="/mountains/puddle3x.gif">';
     puddleDiv3.innerHTML = img3;

    }

    //Star class
    var Star = function(x, y) {
     this.canvas = document.getElementById('nightCanvas');
     this.rect = this.canvas.getBoundingClientRect();

     this.x = (x/100)*this.rect.width;
     this.y = (y/100)*this.rect.height;
     this.width = this.rect.width/400;
     this.height = this.rect.height/200;

     this.imgSrc = "/mountains/star.png"

     Star.stars.push(this);

     this.draw();
    };

    Star.stars = [];

    Star.addStar = function() {
     if (daytime == "night") {
     new Star( Math.random()*100 , Math.random()*5 );
     }
    };

    Star.drawStars = function() {
     for (var i=0; i<Star.stars,length; i++) {
     var star = Star.stars[i];
     star.draw();
     }
    };

    Star.prototype.draw = function() {
     var context = this.canvas.getContext("2d");

     this.removePrevious(context);

     var star = this;
     var imgStar = new Image();
     imgStar.onload = function () {
     alert(star.x);
     alert(star.y);
     context.drawImage(imgStar,star.x, star.y, star.width, star.height);
     }
     imgStar.src = this.imgSrc;
    };

    Star.prototype.removePrevious = function(ctx) {
     //covers previous cloud position with transparent pixels
     var img = ctx.createImageData(this.width, this.height);
     for (var i = img.data.length; --i >= 0; )
     img.data[i] = 0;
     ctx.putImageData(img, this.x, this.y);
    };


    //Bird class
    var Bird = vm.Bird = function() {
     this.canvas;
     this.context;
     this.parentDiv;
     this.parentRect;
     this.linkURL;
     this.create();

     this.rect = this.canvas.getBoundingClientRect();

     this.x = 0;//this.rect.width/8;
     this.y = 0;//this.rect.height/8;
     this.width = this.rect.width;
     this.height = this.rect.height;

     this.xVel = -7 + Math.random()*3;
     this.yVel = -7 + Math.random()*3;

     this.imgCounter = 0;
     var r = Math.random()*2;
     if (r < 1) {
     this.imgSrcs = Bird.imgSrcs1;
     } else {
     this.imgSrcs = Bird.imgSrcs2;
     }

     Bird.birds.push(this);
    };

    Bird.birds = [];
    Bird.imgSrcs1 = ["../media/owls/owl2_1.png", "../media/owls/owl2_1.png", "../media/owls/owl1_1.png"];
    Bird.imgSrcs2 = ["../media/owls/owl2_2.png", "../media/owls/owl2_2.png", "../media/owls/owl1_2.png"];
    Bird.masterUrlLinks = ["https://seattle-skyline.herokuapp.com/", "http://zanreads.info/", "http://ankihg.ucoz.com/index/19_edo_iso_keyboard/0-81", "http://willamettecollegian.com/main/", "http://ankihg.ucoz.com/index/great_grammar_transformer/0-7", "http://ankihg.ucoz.com/index/city_shapes/0-89", "http://ankihg.ucoz.com/index/cat_flight/0-21", "http://ankihg.ucoz.com/index/portland_bridges/0-92"];
    Bird.urlLinks = ["https://seattle-skyline.herokuapp.com/", "http://zanreads.info/", "http://ankihg.ucoz.com/index/19_edo_iso_keyboard/0-81", "http://willamettecollegian.com/main/", "http://ankihg.ucoz.com/index/great_grammar_transformer/0-7", "http://ankihg.ucoz.com/index/city_shapes/0-89", "http://ankihg.ucoz.com/index/cat_flight/0-21", "http://ankihg.ucoz.com/index/portland_bridges/0-92"];

    Bird.handleBirds = function() {
     //alert('create bird');
     var r = Math.random()*20; //25
     if (r < 1) {
       console.log('make bird');
       new Bird();
     }

     for (var i=0; i<Bird.birds.length; i++) {
     var bird = Bird.birds[i];
     bird.fly();
     bird.draw();
     }

     //alert('bird created');
    };

    Bird.prototype.create = function() {
      console.log('make bird');
     this.canvas = document.createElement('canvas');

     console.log(document.getElementById('canvasWrap'));
     this.parentDiv = document.getElementById('canvasWrap');
     this.parentRect = this.parentDiv.getBoundingClientRect();

     this.canvas.style.position = "absolute";
     this.canvas.style.zIndex = "1";

     this.canvas.style.left = 5*this.parentRect.width/6+"px";
     this.canvas.style.top = 5*this.parentRect.height/6+"px";

     var dif = Math.random();
     this.canvas.style.width = this.parentRect.width/20 - dif*(this.parentRect.width/15);
     this.canvas.style.height = this.parentRect.height/20 - dif*(this.parentRect.height/15);
     this.canvas.style.width = (parseInt(this.canvas.style.width) + parseInt(this.canvas.style.top)/this.parentRect.height)+"px";
     this.canvas.style.height = (parseInt(this.canvas.style.height) + parseInt(this.canvas.style.top)/this.parentRect.height)+"px";

     //this.canvas.style.border= "1px dashed yellow";

     if (Bird.urlLinks.length < 1) { //if empty, repopulate Bird.urlLinks;
     Bird.urlLinks = Bird.MasterUrlLinks;
     }

     var linkURLi = Math.floor(Math.random()*Bird.urlLinks.length);
     this.linkURL = Bird.urlLinks[linkURLi];
     var linkURL = this.linkURL;
     //window.location.href = linkURL;
     this.canvas.onmousedown = function() {
     window.open(linkURL,'_newtab');
     Bird.urlLinks.splice(linkURLi, 1);
     };

     //here
     this.parentDiv.appendChild(this.canvas);
    };

    Bird.prototype.draw = function() {
      console.log('draw bird');
     this.context = this.canvas.getContext("2d");

     this.rect = this.canvas.getBoundingClientRect();
     this.width = this.rect.width/2;
     this.height = this.rect.height/2;

     var bird = this;
     var img = new Image();
     img.onload = function () {
     bird.context.clearRect(0, 0, bird.canvas.width, bird.canvas.height);
     bird.context.drawImage(img,bird.x, bird.y, bird.width, bird.height);
     }

     img.src = this.imgSrcs[this.imgCounter%this.imgSrcs.length];
     this.imgCounter++;

    };

    Bird.prototype.fly = function() {
     //this.parentDiv.removeChild(this.canvas);

     this.canvas.style.left = (parseInt(this.canvas.style.left) + this.xVel * this.parentRect.width/100)+"px";
     this.canvas.style.top = (parseInt(this.canvas.style.top) + this.yVel * this.parentRect.height/100)+"px";

    // alert(this.canvas.style.width);
     this.canvas.style.width = (parseInt(this.canvas.style.width) + parseInt(this.canvas.style.top)/this.parentRect.height)+"px";
     this.canvas.style.height = (parseInt(this.canvas.style.height) + parseInt(this.canvas.style.top)/this.parentRect.height)+"px";
    // alert(this.canvas.style.width);


     this.parentDiv.removeChild(this.canvas);

     if (parseInt(this.canvas.style.left) > 0 && parseInt(this.canvas.style.top) > 0) {
     this.parentDiv.appendChild(this.canvas);
     } else {
     var index = Bird.birds.indexOf(this);
     if (index > -1) {
     Bird.birds.splice(index, 1);
     }
     }

    };




    vm.plz = "respond";
    console.log('HomeController was creted');
    return vm;

  }]);

}
