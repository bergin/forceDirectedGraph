var centre = new Point(0, 0); 

function randomisePositions()
{

	for(let a=1; a < nodeCount; a++)
	{
		nodes[a].location.x=randomXToY(-500,500);
		nodes[a].location.y=randomXToY(-500,500);
	}

	draw();
	reposition();
	loopAnimate();
}

function createChildNode(parentNode)
{ 
	let point, deg;
	let zeroVelocity = new Vector(0,0);
	
	if(parentNode == -1)
	{
		nodeCount=1; 	
		return new Node(0, new Point(0,0), zeroVelocity, 0, 0);
	}						// is the starting node			 
	
	if(parentNode == 0) // root node doesnt have a parent!
	{
		point = ToPoint(new Vector(50, randomXToY(0, 359)));
		point.alter(nodes[0]); 				// alter new point based on where its parent is
		let angleToParent = angle(nodes[0].location, point); 

		nodes.push(new Node(nodeCount, point, zeroVelocity, 0, angleToParent));	// is a child node
	
		nodes[0].mylinks.push(nodeCount);  // update links
			nodeCount++; 
		return;
	}
	
	if(parentNode>0) // general case  
	{

		deg = nodes[parentNode].angleToParent;
		point = ToPoint(new Vector(50, deg+randomXToY(-45, 45)));
		 
		console.log("parent deg: " + deg);
	
  		point.alter(nodes[parentNode]); 				// alter new point based on where its parent is
	
		let angleToParent = angle(nodes[parentNode].location, point); 

		nodes.push(new Node(nodeCount, point, zeroVelocity, parentNode, angleToParent));	// is a child node
		
		nodes[parentNode].mylinks.push(nodeCount);
		nodeCount++; 

	}
	




	//find_furthest_point from grandparent
 /*
	let prospectDeg, prospectPoint, prospectDistance, bestDistance, bestDeg;
 
	if(typeof nodes[parentNode]  !== 'undefined')
	{ 
		if(typeof nodes[parentNode].parentNode !== 'undefined'){ 
			if( typeof nodes[nodes[parentNode].parentNode].location !== 'undefined' )
			{
				
				bestDistance = 0;
				for(a=0;a<3;a++)
				{ 
					prospectDeg = randomXToY(0, 359); 
					prospectPoint = ToPoint(new Vector(100, prospectDeg));
					prospectDistance = distance(nodes[nodes[parentNode].parentNode].location, prospectPoint);
					if(prospectDistance > bestDistance)
					{ 
						bestDistance = prospectDistance;
						bestDeg = prospectDeg;
					}	
				}
console.log("best distance: " + bestDistance);	
				point = ToPoint(new Vector(100, bestDeg));
		
			}
		}
	}

	else
	{   
		point = ToPoint(new Vector(100, randomXToY(0, 359)));
	}
 
*/
}

function deleteNode(node)
{
	alert();
}

function connectTheNodes(n1, n2)
{
	nodes[n1].mylinks.push(n2);
}

function createStartNode()
{
	// the founding node with a value of -1
	nodes[0] = createChildNode(-1);
}

function createNetwork()
{
 
	nodes[0] = new Node(0, centre, new Vector(0,0), -1, 0);
	nodes[0].mylinks = [1,8];

	nodes[1] = new Node(1, new Point(randomXToY(-500, 500),randomXToY(-500, 500) ), new Vector(0,0), 0, 0);
	nodes[1].mylinks = [2,3];

	nodes[2] = new Node(2, new Point(randomXToY(-500, 500), randomXToY(-500, 500)), new Vector(0,0), 1, 0);
 	nodes[2].mylinks = [4,5];

	nodes[3] = new Node(3, new Point(randomXToY(-500, 500), randomXToY(-500, 500)), new Vector(0,0), 1, 0);


	nodes[4] = new Node(4, new Point(randomXToY(-500, 500), randomXToY(-500, 500)), new Vector(0,0), 2, 0);
	nodes[5] = new Node(5, new Point(randomXToY(-500, 500), randomXToY(-500, 500)), new Vector(0,0), 2, 0);
	nodes[5].mylinks = [6,7];
	nodes[6] = new Node(6, new Point(randomXToY(-500, 500), randomXToY(-500, 500)), new Vector(0,0), 5, 0);

	nodes[7] = new Node(7, new Point(randomXToY(-500, 500), randomXToY(-500, 500)), new Vector(0,0), 5, 0);
	nodes[8] = new Node(8, new Point(randomXToY(-500, 500), randomXToY(-500, 500)), new Vector(0,0), 0, 0);


nodeCount=9;

}