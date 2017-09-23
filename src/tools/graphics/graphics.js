

var toPixelSpace = function ( point, viewport, display ) {
	var pixelPoint = {}
	pixelPoint.x = display.width*(point.x - viewport.left)/(viewport.width)
	pixelPoint.y =- display.height*(point.y - viewport.top)/(viewport.height)
	return pixelPoint
}

var toPixelSpaceMany = function ( points, viewport, display ) {
	return points.map(function (point) {
		return toPixelSpace( point, viewport, display )
	})
}


var config = {
	pointsNumber:200
}


var graphics = function (ctx,viewport) {
	this.size = {
		width:ctx.canvas.width,
		height:ctx.canvas.height
	}
	this.ctx = ctx
	this.viewport = viewport
}





graphics.prototype.renderLines = function(points){
	var ctx = this.ctx;
	var pixelPoints = toPixelSpaceMany(points , this.viewport, this.size)

	ctx.beginPath()
	var startLine = true

	for(var i =0;i<pixelPoints.length;i++){
		var x = pixelPoints[i].x
		var y = pixelPoints[i].y
		if(startLine)
			ctx.moveTo(x,y)
		else
			ctx.lineTo(x,y)

		startLine = !startLine
	}
	ctx.stroke()
}




graphics.prototype.renderLinesString = function (points){
	var ctx = this.ctx;
	var pixelPoints = toPixelSpaceMany(points , this.viewport, this.size)

	ctx.beginPath()

	for(var i =0;i<pixelPoints.length;i++){
		ctx.lineTo(pixelPoints[i].x , pixelPoints[i].y)
	}
	ctx.stroke()
}






graphics.prototype.renderGrid = function () {
	var points = []

	
	//horizontal lines of the grid
	var start = Math.ceil(this.viewport.left);
	var end = Math.floor(this.viewport.right)

	for(var i = start;i<= end ; i++){
		points.push({
			x:i,
			y:this.viewport.bottom
		})
		points.push({
			x:i,
			y:this.viewport.top
		})
	}

	//horizontal lines of the grid
	var start = Math.ceil(this.viewport.bottom);
	var end = Math.floor(this.viewport.top)

	for(var i = start;i<= end ; i++){
		points.push({
			x:this.viewport.left,
			y:i
		})
		points.push({
			x:this.viewport.right,
			y:i
		})
	}
	this.ctx.strokeStyle="#aaa";
	this.renderLines(points)
}




graphics.prototype.renderAxies = function () {
	var points = [];

	//x axe
	points.push({
		x:this.viewport.left,
		y:0
	})
	points.push({
		x:this.viewport.right,
		y:0
	})

	//y axe
	points.push({
		x:0,
		y:this.viewport.bottom
	})
	points.push({
		x:0,
		y:this.viewport.top
	})

	this.ctx.strokeStyle="#000";
	this.renderLines(points)
}




graphics.prototype.renderFunction = function (func) {
	var points = []
	var vLeft = this.viewport.left
	var vWidth = this.viewport.width
	var n = config.pointsNumber
	for(var i=0; i<config.pointsNumber; i++){

		var x = vLeft + (i*vWidth)/n;
		var y = func.calculate(x)
		points.push({x,y})
	}
	this.ctx.lineWidth=2
	this.ctx.strokeStyle = func.color
	this.renderLinesString(points)
	this.ctx.lineWidth=1
}




graphics.prototype.clear = function () {
	this.ctx.clearRect(0,0,this.size.width , this.size.height)
}



graphics.prototype.zoom = function(ratio){
	this.viewport.scale(ratio)
}

graphics.prototype.drag = function(movementX,movementY){
	var vector = {}
	vector.x = -(this.viewport.right - this.viewport.left)*movementX / this.size.width
	vector.y = (this.viewport.top - this.viewport.bottom)*movementY / this.size.height

	this.viewport.move(vector)
}




export default graphics