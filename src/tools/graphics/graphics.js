

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

graphics.prototype.renderText = function(opt){
	var option = {}
	option.text = opt.text
	option.position = opt.position || {x:0,y:0}
	option.fontColor = opt.fontColor || "#222"
	option.font = option.font || "15px arial"
	option.padding = option.padding || {x:5,y:-5}

	var pixelPosition = toPixelSpace(option.position,this.viewport,this.size)
	pixelPosition.x += option.padding.x
	pixelPosition.y += option.padding.y
	this.ctx.fontStyle = option.fontColor
	this.ctx.font = option.font
	this.ctx.fillText(option.text , pixelPosition.x , pixelPosition.y) 
}

function stepFunction(x){
	return Math.min(
		Math.pow(10, Math.floor( Math.log10(x))),
		2*Math.pow(10, Math.floor( Math.log10(x/2))),
		5*Math.pow(10, Math.floor( Math.log10(x/5)))
	)
}



graphics.prototype.renderGrid = function () {
	var points = []
	var step = stepFunction(this.viewport.width , 1/ 10 , 1 / 20 , 5)

	var start = Math.ceil(this.viewport.left/step)*step
	var end = Math.floor(this.viewport.right/step)*step

	for(var i = start;i<= end ; i+=step){
		points.push({
			x:i,
			y:this.viewport.bottom
		})
		points.push({
			x:i,
			y:this.viewport.top
		})
		if(i<=-step/2 || i>=step/2)
			this.renderText({
				text: i.toPrecision(4)*1,
				position:{ x:i ,  y:0  }
			})
	}

	var start = Math.ceil(this.viewport.bottom/step)*step;
	var end = Math.floor(this.viewport.top/step)*step

	for(var i = start;i<= end ; i+=step){
		points.push({
			x:this.viewport.left,
			y:i
		})
		points.push({
			x:this.viewport.right,
			y:i
		})
		if(i<=-step/2 || i>=step/2)
			this.renderText({
				text: i.toPrecision(4)*1,
				position:{ y:i ,  x:0  }
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