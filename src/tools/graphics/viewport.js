
var Viewport = function (left, right, top, bottom) {
	this.left = left
	this.right = right
	this.top = top
	this.bottom = bottom
}


Viewport.prototype = {
	get width(){
		return this.right - this.left
	},
	get height(){
		return this.top - this.bottom
	},
}

Viewport.prototype.scale = function (ratio) {
	var c1 = (ratio+1)/2 , c2 = (1-ratio)/2
	var {left,right,top,bottom} = this
	
	this.left = this.left*c1 + this.right*c2
	this.right = this.right*c1 + this.left*c2
	this.top = this.top*c1 + this.bottom*c2
	this.bottom = this.bottom*c1 + this.top*c2
}

Viewport.prototype.move = function (vector) {
	this.left += vector.x
	this.right += vector.x
	this.top += vector.y
	this.bottom += vector.y
}

module.exports = Viewport