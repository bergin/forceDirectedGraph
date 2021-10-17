function Node (point, velocity, parent, angle) 
{
	this.location = point; 
	this.velocity = velocity; 
	this.parentNode = parent;	

	this.angleToParent = angle; //	(should be angle to child!)
	this.mylinks = [];
	this.color = "red";
	

	this.newPosition = (point) =>
	{
		this.location.x += point.x;
		this.location.y += point.y;
	}

	this.linksList = () => 
	{
		var list='';
		for(var i=0; i< this.mylinks.length;i++)
			list += i+': ' + this.mylinks[i] + ' ';
		//console.log(list);	
	}


	this.toString = () =>
	{
		return 'location: ' + this.location.x + ', ' +  this.location.y +
		  	', velocity: ' + this.velocity.toString()  + 'links: ' + this.linksList();
	};
}

function Point(x, y)
{
	this.x = x;
	this.y = y;
	
	this.changeLocation = (x,y) =>
	{
		this.x = x;
		this.y = y;

	}
	this.alter = (node) =>
	{ 
		this.x += node.location.x;
		this.y += node.location.y;
	};

	this.move = (node) =>
	{ 
		this.x += (this.x - node.location.x);
		this.y += (this.y - node.location.y);
	};
	this.consolePosition = (name) => {
		console.log( name + ' X: ' + this.x + ', Y: ' + this.y) ;
 	};

}

function Vector (m, d)
{
	this.magnitude = m;
	this.direction = d;   // degrees

	this.reset = function ()
	{
		this.magnitude = 0;
		this.direction = 0;   // degrees
	
	};
	
	this.toString =   (type) => {
	  	console.log( type +  '-  Magnitude: ' + this.magnitude + ', direction: ' + this.direction ) ;
	};
}


function randomXToY(minVal,maxVal,floatVal)
{

 	var randVal = minVal+(Math.random()*(maxVal-minVal));
  	return typeof floatVal=='undefined'?Math.round(randVal):randVal.toFixed(floatVal);
}


function createMultiArray(rows, cols)
{
	var i;
	var j;
	var a = new Array(rows);
	for (i=0; i < rows; i++)
	{
		a[i] = new Array(cols);
		for (j=0; j < cols; j++)
		{
			a[i][j] = "";
		}
	}
	return(a);
}

 // for non referenced copies
 Object.prototype.clone = function() {
   var newObj = (this instanceof Array) ? [] : {};
   for (i in this) {
     if (i == 'clone') continue;
     if (this[i] && typeof this[i] == "object") {
       newObj[i] = this[i].clone();
     } else newObj[i] = this[i]
   } return newObj;
 };