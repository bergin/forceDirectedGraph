var canvas;
var width =  1500, height = 800;//window.height;
var screenCentreX = width / 2, screenCentreY = height /2;
var dotSize = 10, scaling = 1; 
var moving = false, myNode, jointNode; 
var joiningList = [], joining = false;

// look for a node based on where the user clicked, using event & pageX / pageY

function stop()
{
	cancelAnimationFrame(stopAnimation);
}

function keyDown(event)
{
	if(event.code=="MetaLeft")
		joining = true; 
}

function keyUp(event)
{
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
			iter=0;
			return;
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
	let nodeScreenPosition, clickPosition = new Point(csrx, csry), sx, sy;
	 
	for(var n=0; n<nodeCount; n++)
	{
		sx = nodes[n].location.x * scaling + screenCentreX;			// position of node on the screen
		sy = nodes[n].location.y * scaling + screenCentreY;
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
	ctx.arc(x, y, size, 0, Math.PI*2);
	ctx.fillStyle= color; 
	ctx.lineWidth = 2;
	ctx.strokeStyle = 'white';
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
}

function drawLine(ctx, x, y, x1, y1, color, thickness)
{
	ctx.lineWidth = thickness;
	ctx.strokeStyle = color;
	ctx.beginPath();
	ctx.moveTo(x,y);
	ctx.lineTo(x1,y1);
	ctx.closePath();
	ctx.stroke();
}

function draw() 
{ 
	canvas = document.getElementById("canvas");
	let sx, sy, x2, y2;
	if (canvas.getContext) 
	{
		let ctx = canvas.getContext("2d");
  		ctx.clearRect(0, 0, width, height);

		for(let n=0; n < nodeCount; n++){

			sx = (nodes[n].location.x) * scaling + screenCentreX;
			sy = (nodes[n].location.y) * scaling + screenCentreY;

			for(let i=0; i < nodes[n].childNodes.length; i++) 
			{
				x2 = nodes[nodes[n].childNodes[i]].location.x * scaling + screenCentreX;
				y2 = nodes[nodes[n].childNodes[i]].location.y * scaling + screenCentreY;
				drawLine(ctx, sx, sy, x2, y2, "grey", 3);
			}
		}

		for(let n=0; n < nodeCount; n++)
		{
			sx = (nodes[n].location.x) * scaling + screenCentreX;
			sy = (nodes[n].location.y) * scaling + screenCentreY;
			dot(ctx, sx, sy, nodes[n].color, 5+ nodes[n].childNodes.length);	 
		}
	}
}

function resetColors()
{
	for(var n=0; n<nodeCount; n++)
		nodes[n].color ="red";
}


 