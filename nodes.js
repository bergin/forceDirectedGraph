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

function createChildNode(sourceNode)
{ 
	let point, zeroVelocity = new Vector(0,0); 
 				// is the starting node			 
	
	point = new Point (randomMinMax(-50, 50), randomMinMax(-50, 50) );
	point.alterPosition(nodes[sourceNode]); 				// alter new point based on where its source is
	nodes.push(new Node(nodeCount, point, zeroVelocity));	// is a child node
	
	edges.push(new Edge(sourceNode, nodeCount));
	nodeCount++; 
	return ;
}

function connectTheNodes(n1, n2)
{
	edges.push(new Edge(n1, n2));
}

function createStartNode()
{
	createChildNode();
}

function createNetwork()
{ 
	let min = -200, max = 200;

	
	nodes[0] = new Node(0, new Point (0,0), new Vector(0,0));	
	nodes[1] = new Node(1, new Point (randomMinMax(min, max), randomMinMax(min, max)), new Vector(0,0));
	nodes[2] = new Node(2, new Point (randomMinMax(min, max), randomMinMax(min, max)), new Vector(0,0));
	nodes[3] = new Node(3, new Point (randomMinMax(min, max), randomMinMax(min, max)), new Vector(0,0));
	nodes[4] = new Node(4, new Point (randomMinMax(min, max), randomMinMax(min, max)), new Vector(0,0));
	nodes[5] = new Node(5, new Point (randomMinMax(min, max), randomMinMax(min, max)), new Vector(0,0));
	nodes[6] = new Node(6, new Point (randomMinMax(min, max), randomMinMax(min, max)), new Vector(0,0));
	nodeCount = 7;
	edges[0] = new Edge(0,1);
	edges[1] = new Edge(0,2);
	edges[2] = new Edge(1,3);
	edges[3] = new Edge(1,4);
	edges[4] = new Edge(2,5);
	edges[5] = new Edge(2,6);
 
}

/*

 function loop()
 { 
	 
  var json = 
  {
	nodes: [{ id: 0 }, { id: 1 }, {id: 2}, {id: 3},  {id: 4}, {id: 5}, {id: 6}],
	edges: [{ id: 0, source: 0, target: 1 },
		{ id: 1, source: 0, target: 2 },
		{ id: 2, source: 1, target: 3 },
		{ id: 3, source: 1, target: 4 },
		{ id: 4, source: 2, target: 5 },
		{ id: 5, source: 2, target: 6 }
	]
  }
	
  for(var key in json.jsonData) {
	for (var key1 in json.jsonData[key]) {
		console.log(json.jsonData[key][key1]);
	}
 }

 var json = {
	jsonData:  [
		{one: [11, 12, 13, 14, 15]},
		{two: [21, 22, 23]},
		{three: [31, 32]}
	]
 }; 
 for (var i=0; i<json.jsonData.length; i++) {
	for (var key in json.jsonData[i]) {
		for (var j= 0; j<json.jsonData[i][key].length; j++) {
			console.log(json.jsonData[i][key][j])
		}
	}
 }


}

*/