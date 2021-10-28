async function uploadNodesEdges(json)
{
	var file = new File([json], "foo.txt", {
		type: "text/plain",
	  });

    var data = new FormData(); 
    data.append('file', file, "json.txt");

    fetch('upload.php', {
    method: 'POST',
    body: data
    })  
}

function saveNetwork()
{
	let jsonNodes = JSON.stringify(nodes);
	let jsonEdges = JSON.stringify(edges);
	var myjson = '{"nodes":' + jsonNodes + ', "edges":'+ jsonEdges +'}';
	let myObject = JSON.stringify(myjson);
	uploadNodesEdges(myObject);
	console.log(nodes.length + " nodes & " + edges.length + " edges saved.");
}

async function loadNetwork()
{
  
    const response = await fetch('dump/json.txt');

    var data = await response.json(); 
    if (response) 
    { 
        let str = JSON.parse(data);
        populateNodeEdgeArray(str) 
    } 
}

function populateNodeEdgeArray(json)
{
	nodes = [], edges = [];
 
	let edge, node;
	for (let i = 0; i < json.nodes.length; i++)
	{
		node = json.nodes[i];  
		nodes.push(new Node(node.number, new Point (node.location.x, node.location.y), 
			new Vector(node.velocity.i, node.velocity.j), node.label, node.visibility ));
	}

	for (let i = 0; i < json.edges.length; i++)
	{
		edge = json.edges[i]; 
		edges.push(new Edge(edge.source, edge.target));
	}

	console.log(nodes.length + " nodes & " + edges.length + " edges loaded.");
}