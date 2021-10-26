function Node (id, point, velocity, parent) 
{
	this.number = id;
	this.location = point; 
	this.velocity = velocity; 
	this.parentNode = parent;	 
	this.childNodes = [];
	this.color = "red";
	
	this.newPosition = (vector) =>
	{
		this.location.x += vector.i;
		this.location.y += vector.j;
	}

	this.sumVectors = (vector, type) =>
	{
		if(type=="add")
		{
			this.velocity.i += vector.i;
			this.velocity.j += vector.j;
		}
		else
		{
			this.velocity.i -= vector.i;
			this.velocity.j -= vector.j;
		}
	}

	this.childNodesList = () => 
	{
		var list='';
		for(var i=0; i< this.childNodes.length;i++)
			list += i+': ' + this.childNodes[i] + ' ';
	return list;	
	}


	this.toString = () =>
	{
		console.log(  'id: ' + this.number +
					  ' Loc: ' + this.location.toString() + 
		  			   this.velocity.toString()  + 
					  ' childs: ' + this.linksList());
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
	
	this.alterPosition = (node) =>
	{ 
		this.x += node.location.x;
		this.y += node.location.y;
	};

	this.toString = () => {
		return (' X: ' +  Number.parseFloat(this.x).toFixed(2) + ', Y: ' +  Number.parseFloat(this.y).toFixed(2)) ;
 	};

}

function Vector (i, j)
{
	this.i = i;
	this.j = j;

	this.reset = function ()
	{
		this.i = 0;
		this.j = 0;   // degrees
	};
	
	this.toString = () => {
	  return ( ' I: ' + Number.parseFloat(this.i).toFixed(2) + ', J: ' + Number.parseFloat(this.j).toFixed(2) ) ;
	};
}

function randomMinMax(minVal,maxVal,floatVal)
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