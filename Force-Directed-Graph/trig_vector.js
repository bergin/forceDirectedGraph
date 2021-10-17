var deg = 180 / Math.PI;
var rad = Math.PI / 180.0;
var centre = new Point(0, 0);
var netForce = new Vector(0,0);
var forceVector = new Vector(0,0);

function turnOnGravity(gravityAmount)
{
	var canvas = document.getElementById("canvas"); 
	var ctx = canvas.getContext("2d");
	var centre = createCentreNode(); 
	
	sx = (centre.location.x) * scaling + screenCentreX;
	sy = (centre.location.y) * scaling + screenCentreY;
	
	//dot(ctx, sx, sy, centre.color);
			
	for(var a=0; a < nodeCount; a++)
	{
		// set nodes 
	  	netForce.reset();

		forceVector = gravityForce(nodes[a], centre, gravityAmount);

		netForce = addVectors(netForce, forceVector);
	
		nodes[a].velocity = addVectors(nodes[a].velocity, netForce); 

		nodes[a].movementVector = addVectors(nodes[a].movementVector, nodes[a].velocity);
		nodes[a].location =  ToPoint(nodes[a].movementVector);

	}	
}

function reposition()
{
	let netRepelForce = netAttractForce = new Vector(0, 0); 
	let newPoint;
	
	for(var a=0; a < nodeCount ; a++)
	{
		netRepelForce.reset();
		netAttractForce.reset();
		nodes[a].velocity.reset();
	  
		for(b=0; b < nodeCount; b++)    
		{
			if (a!= b)
			{
				forceVector = replusionForce (nodes[a], nodes[b]);
				netRepelForce = addVectors(netRepelForce, forceVector);
			}
		} 

		//sum attractions from only selected nodes, i.e. the edge-linked nodes. 
		if(a>0)
		{
			forceVector = attractionForce (nodes[a],nodes[nodes[a].parentNode]);
				
			netAttractForce = addVectors(netAttractForce, forceVector);
				
			nodes[a].velocity = addVectors(netRepelForce, netAttractForce);
		} 
		else
			nodes[a].velocity = netRepelForce;
 
		nodes[a].velocity = dampening(nodes[a].velocity, dampening_constant);
		 

		nodes[a].newPosition(ToPoint(nodes[a].velocity));
	 
	}
}

function ToPoint(vector) 
{
	var mag = vector.magnitude;
	var direct = vector.direction;
	var aX = mag * Math.cos(rad * direct);
	var aY = mag * Math.sin(rad * direct);

	return new Point(aX, aY);
}

function addVectors(a, b)
{ 
	// obvious improvement - add only magnitudes and then do the direction at end 
	var direction;

	var aX = a.magnitude * Math.cos(rad * a.direction);
	var aY = a.magnitude * Math.sin(rad * a.direction);

	var bX = b.magnitude * Math.cos(rad * b.direction);
	var bY = b.magnitude * Math.sin(rad * b.direction);


	aX += bX;
	aY += bY;

	var magnitude = Math.sqrt(Math.pow(aX, 2) + Math.pow(aY, 2));

	if (magnitude == 0.0)
	{
		direction = 0.0;
		return new Vector(0,0);
	}

	direction = deg * Math.atan (aY/aX);

	if(aX >= 0 && aY >= 0)
		return new Vector(magnitude, direction);

	if(aX < 0 && aY >= 0)
		return new Vector(magnitude, 180 + direction);

	if(aX < 0 && aY < 0)
		return new Vector(magnitude, 180 + direction);

	if(aX >= 0 && aY < 0)
		return new Vector(magnitude, 360 + direction);
}

function angle(a, b)
{
	dx = b.x - a.x;
	dy = b.y - a.y;

	var angle = Math.atan(dy/dx) * deg;

	if(dx >= 0 && dy >= 0)
		return angle;

	if(dx < 0 &&  dy >= 0)
		return  180 + angle;

	if(dx < 0 && dy < 0)
		return  180 + angle;

	if(dx >= 0 && dy < 0)
		return  360 + angle;
}

function replusionForce(a, b)
{

	let d =  distance (a.location, b.location) ;
	if(d < 1)
		d =1;
 
	var force = -(repulsion_constant / Math.pow(d, 2));
	var myangle = angle (a.location, b.location);

	return new Vector(force, myangle);
}

function attractionForce(a, b)
{
	var d = Math.max(1, distance (a.location, b.location));
	//a.location.consolePosition("A");
	//b.location.consolePosition("B");


	var force = attraction_constant * Math.max(0, d- springLength );
	//console.log("d:" + d + "force: " + force);
	var myangle = angle (a.location, b.location);
	
	return new Vector(force, myangle);
}

function gravityForce(a, b, amount)
{
	var d = Math.max(1, distance (a.location, b.location));
	var force = amount * Math.max(0, d - springLength); // force reducer
	var myangle = angle (a.location, b.location);
	
	return new Vector(force, myangle);
}

function dampening(a, damp)
{
	return new Vector(a.magnitude * damp, a.direction);
}

function distance(a, b)
{
	var x = a.x - b.x;
	var y = a.y - b.y;
	return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

/**
 * 
 * old reposition  =- now defunct! attractions not done properly - should be endpoint to parent not otherway round!
 */
/*
function reposition()
{
	let netRepelForce = new Vector(0, 0); 
	let netAttractForce = new Vector(0, 0); 
	let newPoint;
	// calculate the the force on each node & create its velocity
	for(var a=0; a < nodeCount ; a++)
	{
		netRepelForce.reset();
		netAttractForce.reset();
		nodes[a].velocity.reset();
	 
		//sum the replusion forces on a single node (a) from *all* the other nodes in the system (except itself!)
		// the replusion force is -(replusion_constant/distance_a_to_b squared) 
		for(b=a+1; b < nodeCount; b++)    // b =a+1 - avoid counting a force twice.
		{
			if (a!= b)
			{
				forceVector = replusionForce (nodes[a], nodes[b]);
				netRepelForce = addVectors(netRepelForce, forceVector);
			}
		} 

		//sum attractions from only selected nodes, i.e. the edge-linked nodes. 
		if(nodes[a].mylinks.length)
		{ 
			for(var i=0; i < nodes[a].mylinks.length; i++) 
			{
				var other = nodes[a].mylinks[i];
			
				forceVector = attractionForce (nodes[a], nodes[other]);
					//forceVector.toString("forceVector");
				netAttractForce = addVectors(netAttractForce, forceVector);
					//netAttractForce.toString("netAttract");
			}
			//nodes[a].velocity = addVectors(netRepelForce, netAttractForce);
		}	
		else
			nodes[a].velocity = netRepelForce;

		// nodes[a].velocity.toString("velocity");
		  nodes[a].velocity = dampening(nodes[a].velocity, dampening_constant);
		
		//change location & movement
		//nodes[a].movementVector =  addVectors(nodes[a].movementVector, nodes[a].velocity);
		newPoint = ToPoint(nodes[a].velocity);
		nodes[a].location.x +=  newPoint.x;
		nodes[a].location.y +=  newPoint.y;
	}
}
*/

