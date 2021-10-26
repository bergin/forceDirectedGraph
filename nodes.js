var centre = new Point(0, 0); 

function randomisePositions()
{
	for(let a=0; a < nodeCount; a++)
	{
		nodes[a].location.x=randomMinMax(-200,200);
		nodes[a].location.y=randomMinMax(-200,200);
	}

	draw();
	reposition();
	loopAnimate();
}

function createChildNode(parentNode)
{ 
	let point, zeroVelocity = new Vector(0,0);
	//Node (id, point, velocity, parent) 

	if(parentNode == -1)
	{
		nodeCount = 1; 	
		return new Node(0, new Point(0,0), zeroVelocity, 0);
	}						// is the starting node			 
	
	point = new Point (randomMinMax(-50, 50), randomMinMax(-50, 50) );
	point.alterPosition(nodes[parentNode]); 				// alter new point based on where its parent is
	nodes.push(new Node(nodeCount, point, zeroVelocity, parentNode));	// is a child node
	
	nodes[parentNode].childNodes.push(nodeCount);
	nodeCount++; 
	return 
}

function deleteNode(node)
{
	alert();
}

function connectTheNodes(n1, n2)
{
	nodes[n1].childNodes.push(n2);   // aha! can only have one parent node!
	nodes[n2].childNodes.push(n1);
}

function createStartNode()
{
	// the founding node with a value of -1
	nodes[0] = createChildNode(-1);
}

function createNetwork()
{ 
	let min = -200, max = 200;
	nodes[0] = new Node(0, new Point (0,0), new Vector(0,0), 0);	
	nodes[0].childNodes=[1,2];

	nodes[1] = new Node(1, new Point (randomMinMax(min, max), randomMinMax(min, max)), new Vector(0,0), 0);
	nodes[1].childNodes=[3,4];

	nodes[2] = new Node(2, new Point (randomMinMax(min, max), randomMinMax(min, max)), new Vector(0,0), 0);
	nodes[2].childNodes=[5,6];

	nodes[3] = new Node(3, new Point (randomMinMax(min, max), randomMinMax(min, max)), new Vector(0,0), 1);
	nodes[4] = new Node(4, new Point (randomMinMax(min, max), randomMinMax(min, max)), new Vector(0,0), 1);

	nodes[5] = new Node(5, new Point (randomMinMax(min, max), randomMinMax(min, max)), new Vector(0,0), 2);
	nodes[6] = new Node(6, new Point (randomMinMax(min, max), randomMinMax(min, max)), new Vector(0,0), 2);
	nodeCount = 7;

}