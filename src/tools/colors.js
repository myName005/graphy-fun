var colors = [
	'#176eb1',
    '#18b214',
    '#084b0c', 
    '#dc1212',
    '#1dad8f',
    '#a9dc19',
    '#c26c17',
    '#1a36a8',
    '#5a18de',
    '#c818d4',
    '#d41865' 
]

module.exports = function () {
	var index = Math.floor(Math.random()*colors.length) 
	return colors[index]
}