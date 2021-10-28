var canvas;
var width =  1500, height = 800; 
var screenCentreX = width / 2, screenCentreY = height /2;
var dotSize = 10, scaling = 1; 
var moving = false, myNode, deleting = false, labelling = false; 
var joiningList = [], joining = false;

// look for a node based on where the user clicked, using event & pageX / pageY

function stop()
{
	cancelAnimationFrame(stopAnimation);
}

function keyDown(event)
{
 	//console.log(event.code);
	if(event.code=="MetaLeft")
		joining = true; 

	if(event.code=="KeyD")
		deleting = true;	

	if(event.code=="KeyQ")
		labelling = true;		
}

function keyUp(event)
{
	if(event.code=="MetaLeft")
		joining = false; 
	if(event.code=="KeyD")
		deleting = false;	
	if(event.code=="KeyQ")
		labelling = false;				
}

function enterText(event)
{
	if(event.code === 'Enter') 
	{
		let test = parseInt(document.getElementById('textbox').getAttribute("node"));
		nodes[test].label = document.getElementById('textbox').value;
 
        document.getElementById('textbox').style.visibility = "hidden";  
		document.getElementById('textbox').value ="";
		draw();
    }
}

function labelNode(myNode)
{
	let input = document.getElementById('textbox'); 
 
	input.setAttribute("node", myNode);
	input.value = nodes[myNode].label;
	input.setAttribute("style", "visibility: visible; top: " +  
	(nodes[myNode].location.y + screenCentreY + 30 ).toFixed(0) + "px; left: " +
	(nodes[myNode].location.x + screenCentreX + 30).toFixed(0) + "px;"	);
	console.log("FOCUS");
	document.getElementById('textbox').focus();
}

function clickChildNode(evt)
{
	let csrx = evt.pageX, csry = evt.pageY;
	stop();  // the animation
  	myNode = findNode(csrx, csry); 

	if(myNode == "-1")
	{
		console.log("Node not found!");
		return;
	}	
	
	console.log("Node is: " + myNode);

	if(labelling)
	{
		labelNode(myNode);
		labelling = false;
		return;
	}

	if(deleting)
	{
		deleteNode(myNode);
		deleting = false;
		console.log(deleting);
		return;
	}

	if(joining)
	{
		joiningList.push(myNode); 
		nodes[myNode].color = "green";
		if(joiningList.length==2)    
		{
			if(!searchDeleteEdges(joiningList[0], joiningList[1]))	// if edge already exists - delete it
				connectTheNodes(joiningList[0], joiningList[1]);	// otherwise create it
	
			joiningList =[];
			loopAnimate();
		}		 
		return;
	}		

	if(evt.shiftKey)
	{		 
		createChildNode(myNode);
		iter=0;
		return;
	}	

	else 
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
	 
	for(var n=0; n<nodes.length; n++)
	{
		if(nodes[n].hidden=="false")
			continue;
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

function rectangle(ctx, x, y, x1, y1, color)
{
	ctx.beginPath();
	ctx.rect(x,y,x1,y1);	
	ctx.fillStyle= color; 
	ctx.fill();
	ctx.stroke();

}
function dot(ctx, x, y, color) 
{
	let size = 6;
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
	let sx, sy, s, t, tx, ty, rx, ry,metrics;
	if (canvas.getContext) 
	{
		let ctx = canvas.getContext("2d");
		ctx.font = "14px Arial";
  		ctx.clearRect(0, 0, width, height);

		for(let n=0; n < edges.length; n++)
		{
			s = edges[n].source, t = edges[n].target;
			sx = (nodes[s].location.x) * scaling + screenCentreX;
			sy = (nodes[s].location.y) * scaling + screenCentreY;

			tx = (nodes[t].location.x) * scaling + screenCentreX;
			ty = (nodes[t].location.y) * scaling + screenCentreY;
			 
			drawLine(ctx, sx, sy, tx, ty, "grey", 3);
		}

		for(let n=0; n < nodes.length; n++)
		{
			if(nodes[n].visibility == "false")
				continue;
			sx = (nodes[n].location.x) * scaling + screenCentreX;
			sy = (nodes[n].location.y) * scaling + screenCentreY;
			dot(ctx, sx, sy, nodes[n].color);
			if(nodes[n].label)
			{
				metrics = ctx.measureText(nodes[n].label);
				rectangle(ctx, sx-30, sy +10, metrics.width+14 , 14 , "white" );
				ctx.fillStyle = "black";
				ctx.fillText(nodes[n].label,sx-20, sy +22 );

			}
		}
	}
}

 

 