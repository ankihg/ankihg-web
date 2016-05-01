(function(module) {

var Tree = {};

Tree.loadTrees = function() {
//canvas setup
//var w = document.body.clientWidth;
//var h = document.body.clientHeight;

console.log('load trees');

var w = getWidth();
var h = getHeight();
var canvas = document.getElementById("myCanvas");
canvas.width = 2*w/5;
canvas.height = h/4;

//get canvas context
var ctx = canvas.getContext("2d");

//load tree.png
var tree = new Image();
tree.src = "media/tree3_c.png";
tree.width = canvas.width/10;
tree.height = canvas.height/10;

tree.onload = function() {
var nTrees = 8;
for (i=0; i<8; i++) {
var xPert = (canvas.width/nTrees)*(Math.random()-.5);
var yPert = Math.random()*2;
ctx.drawImage(tree, i*canvas.width/nTrees+xPert, yPert*canvas.height/10);
}
};

}

Tree.loadTrees();
window.onresize = Tree.loadTrees;

//http://stackoverflow.com/questions/1038727/how-to-get-browser-width-using-javascript-code
function getWidth() {
 if (self.innerHeight) {
 return self.innerWidth;
 }

 if (document.documentElement && document.documentElement.clientHeight) {
 return document.documentElement.clientWidth;
 }

 if (document.body) {
 return document.body.clientWidth;
 }
}

function getHeight() {
 if (self.innerHeight) {
 return self.innerHeight;
 }

 if (document.documentElement && document.documentElement.clientHeight) {
 return document.documentElement.clientHeight;
 }

 if (document.body) {
 return document.body.clientHeight;
 }
}

module.Tree = Tree;
})(window);
