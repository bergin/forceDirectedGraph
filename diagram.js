var width =  1500; //window.width;
var height = 800;//window.height;
var connectThisNode=-1;
var moveGraph = false;
 
var startx =0, starty = 0;
var screenCentreX = width / 2;
var screenCentreY = height /2;
var x2, y2;
var dotSize = 10;
var scaling =1;
var firstNode =-1; 
var moving = false, myNode, jointNode; 

var canvas;

var joiningList = [];
var joining = false;
// look for a node based on where the user clicked, using event & pageX / pageY

function stop()
{
	cancelAnimationFrame(stopAnimation);
}

function keyDown(event)
{
	// console.log(event.code);

	if(event.code=="MetaLeft")
		joining = true; 
}

function keyUp(event)
{
	// console.log(event.code);

	if(event.code=="MetaLeft")
		joining = false; 

}

function clickChildNode(evt)
{
	let csrx = evt.pageX;
	let csry = evt.pageY;
	stop();
  	myNode = findNode(csrx, csry); 
	console.log("Node is: " + myNode);
	if(joining && myNode >-1)
	{
		joiningList.push(myNode); 
		nodes[myNode].color = "green";
		if(joiningList.length==2)
		{
			connectTheNodes(joiningList[0], joiningList[1]);
		
			joiningList =[];
			loopAnimate();
			return;
		}		 
		return;
	}		
	if(evt.shiftKey)
	{		 
		if(myNode > -1)
		{
			createChildNode(myNode);
			draw();
			iter=0;
			//loopAnimate();
		}
	}	

	else 
		if(myNode > -1)
			moving = true;
 
}	


function moveNode(event)
{ 
	if(moving)
	{ 	
		let csrx = event.pageX, csry = event.pageY;
		let sx = (csrx - screenCentreX) / scaling ;
		let sy = (csry - screenCentreY) / scaling;

		nodes[myNode].location.changeLocation(sx, sy);

		reposition();
		draw();
	}
}

function stopMovingNode(event)
{
	moving = false;
	iter=0;
	loopAnimate();
}
 
function findNode(csrx, csry)
{
	var nodeScreenPosition;
	var clickPosition = new Point(csrx, csry);
	 
	for(var n=0; n<nodeCount; n++)
	{
		sx = nodes[n].location.x  * scaling + screenCentreX;			// position of node on the screen
		sy = nodes[n].location.y  * scaling + screenCentreY;
		nodeScreenPosition = new Point(sx, sy);
										 
		if(distance(nodeScreenPosition, clickPosition) <= dotSize)
			return n; 
	} 
	
	return -1;   // cant be found
}

function square(ctx, x, y, color ) 
{
	ctx.fillStyle = color;
	ctx.fillRect(x, y, dotSize, dotSize);
}

function dot(ctx, x, y, color, size) 
{
	ctx.beginPath();
	ctx.arc(x,  y, size, 0, Math.PI*2);
	ctx.fillStyle= color; 
	ctx.strokeStyle = 'white';
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
}

function drawLine(ctx, x, y, x1, y1)
{
	ctx.lineWidth = 2;
	ctx.strokeStyle = 'white';
	ctx.beginPath();
	ctx.moveTo(x,y);
	ctx.lineTo(x1,y1);
	ctx.closePath();
	ctx.stroke();
}


function draw() 
{ 
	canvas = document.getElementById("canvas");
 
	if (canvas.getContext) 
	{
		let ctx = canvas.getContext("2d");
  		ctx.clearRect(0, 0, width, height);

		for(let n=0; n < nodeCount; n++){

			sx = (nodes[n].location.x) * scaling + screenCentreX;
			sy = (nodes[n].location.y) * scaling + screenCentreY;

			for(let i=0; i< nodes[n].mylinks.length;i++) 
			{
				x2 = nodes[nodes[n].mylinks[i]].location.x  * scaling + screenCentreX;
				y2 = nodes[nodes[n].mylinks[i]].location.y  * scaling + screenCentreY;

				drawLine(ctx, sx, sy, x2, y2);
			}
		}

		for(let n=0; n < nodeCount; n++)
		{
			sx = (nodes[n].location.x) * scaling + screenCentreX;
			sy = (nodes[n].location.y) * scaling + screenCentreY;
			dot(ctx, sx, sy, nodes[n].color, 5+ nodes[n].mylinks.length);	 
		}
	}
}

function resetColors()
{
	for(var n=0; n<nodeCount; n++)
		nodes[n].color ="red";
}


 