var nodeCount = 0;
var nodes = [];

var MaxIterations = 1000;
var displayRate = 100 ;

var repulsion_constant = 3000;
var attraction_constant =200;

var springLength = 500 ;
var dampening_constant = .1;

var weakAttraction_constant = .01;
var weakSpringLength = 250 ;
 
var iter=0;
var gravity = {}, replusion ={}, dampeningConst = {}, attraction = {}, display = {}, spring ={}; 
var grav = 0.0001;
var stopAnimation;

function main()
{
	init();
	loopAnimate();
}

function loopAnimate()
{
 	if(iter>MaxIterations)
 		return;
  	
  	iter++;
  	
	if(iter % displayRate  == 0)
	{
		draw();
	}
  //turnOnGravity(grav)
	reposition();

	stopAnimation = requestAnimationFrame(loopAnimate);
}



function init()
{
	canvas = document.getElementById("canvas");
	canvas.addEventListener("mousedown", clickChildNode, false);
	canvas.addEventListener("mousemove", moveNode, false);
	canvas.addEventListener("mouseup", stopMovingNode, false);
	window.addEventListener("keydown", keyDown, false);
	window.addEventListener("keyup", keyUp, false);

	createStartNode();
}



display.alter = function(element)
{
	displayRate = element.value;
	console.log("rate: "+displayRate);
};

replusion.alter = function(element)
{
	repulsion_constant = element.value;
	console.log("repel: "+repulsion_constant);
};
	
gravity.alter = function(element)
{
	grav = element.value;
	console.log("grav: " + grav); 
};

spring.alter = function(element)
{
	springLength = element.value;
	console.log("spring: "+springLength);
};

dampeningConst.alter = function(element)
{
	dampening_constant = element.value;
	console.log("damp: " + dampening_constant);
};


attraction.alter = function(element)
{
	attraction_constant = element.value;
	console.log("attrac: "+attraction_constant); 
};
