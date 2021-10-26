var repulsion_constant =  500;
var attraction_constant = 0.1;
var springLength = 50;
 
function reposition()
{
	let repellingForce, attractingForce;

	for(let a=0; a < nodeCount; a++)
	{
		for(let b=a+1; b < nodeCount; b++) 
		{
			repellingForce = replusionForce (nodes[a], nodes[b]);	 
			nodes[a].sumVectors(repellingForce, "add");
			nodes[b].sumVectors(repellingForce, "minus");
		}
 
		if(a>0)
		{
			attractingForce = attractionForce (nodes[a], nodes[nodes[a].parentNode]);
		 	nodes[a].sumVectors(attractingForce, "add");
			nodes[nodes[a].parentNode].sumVectors(attractingForce, "minus");
		}
	}

	for(let a=0; a < nodeCount; a++) 
	{
		nodes[a].newPosition(nodes[a].velocity); 
		nodes[a].velocity.reset();
	}
}


function replusionForce(a, b)
{
	let d = Math.max(1, distance (a.location, b.location));
	let norm = new Point (0,0);
	let force = repulsion_constant / Math.pow(d, 2)  ;
	norm.x = (a.location.x - b.location.x) / d;
	norm.y = (a.location.y - b.location.y) / d;
	let fx =  force * norm.x, fy = force * norm.y ;

	return new Vector(fx, fy);
}

function attractionForce(a, b)
{
	let d = Math.max(1, distance (a.location, b.location));
	let norm = new Point (0,0);																
	let force = -attraction_constant * Math.max(0, d - springLength) ; 
	norm.x = (a.location.x - b.location.x) / d;
	norm.y = (a.location.y - b.location.y) / d;
	let fx =  force * norm.x, fy = force * norm.y ;
	return new Vector(fx, fy);
}

function distance(a, b)
{
	let x = a.x - b.x;
	let y = a.y - b.y;
	return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}
 
