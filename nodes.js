function createChildNode(parentNode)
{ 
	let point, deg;
	let zeroVelocity = new Vector(0,0);
	
	if(parentNode == -1)
	{
		nodeCount=1; 	
		return new Node(new Point(0,0), zeroVelocity, 0, 0);
	}						// is the starting node			 
	
	if(parentNode == 0) // root node doesnt have a parent!
	{
		point = ToPoint(new Vector(50, randomXToY(0, 359)));
		point.alter(nodes[0]); 				// alter new point based on where its parent is
		let angleToParent = angle(nodes[0].location, point); 

		nodes.push(new Node(point, zeroVelocity, 0, angleToParent));	// is a child node
	
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

		nodes.push(new Node(point, zeroVelocity, parentNode, angleToParent));	// is a child node
		
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
