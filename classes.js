function Node (id, point, velocity, parent, angle) 
{
	this.number = id;
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
	return list;	
	}


	this.toString = () =>
	{
		console.log(  'id: ' + this.number +
					  ' Loc: ' + this.location.toString() + 
		  			   this.velocity.toString()  + 
					  ' links: ' + this.linksList());
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
	this.toString = () => {
		return (' X: ' +  Number.parseFloat(this.x).toFixed(2) + ', Y: ' +  Number.parseFloat(this.y).toFixed(2)) ;
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
	
	this.toString =   ( ) => {
	  return ( ' Mag: ' + Number.parseFloat(this.magnitude).toFixed(2) + ', Ang: ' + Number.parseFloat(this.direction).toFixed(2) ) ;
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