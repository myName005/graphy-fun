import mexp from 'math-expression-evaluator'
mexp.math.isDegree = false;

var tokens = [{type:3,token:"x",show:"x",value:"x"}]

var functionParse = function (expression) {
	var lexed = mexp.lex(expression,tokens)
	var postfix = lexed.toPostfix()
	return function (x) {
		return postfix.postfixEval({"x":x})
	}
}

export default functionParse