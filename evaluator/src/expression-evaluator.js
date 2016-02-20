let Operator = require('./Operator');
let Stack = require('./Stack');

const OPERATORS = {
	'*': new Operator('*', 100, (b, a) => a*b),
	'/': new Operator('/', 100, (b, a) => a/b),
	'+': new Operator('+', 200, (b, a) => a+b),
	'-': new Operator('-', 200, (b, a) => a-b)
};

function evaluateExpression(expr) {
	let numbers = new Stack();
	let operators = new Stack();
	
	for(let i=0; i<expr.length; i++) {
		let token = expr.charAt(i);
		let tokenType = getTokenType(token);
		if(tokenType === 'number') {
			// Get the full number if it has more than one digit.
			// If we wanted to support decimals or negative numbers
			// this would require some adjustment.
			//
			// Already Tested this to make sure it will work if 
			// there is a number as the last character of the
			// expression.
			let j = i + 1;
			while(!isNaN(parseInt(expr.charAt(j)))) {
				token += expr.charAt(j);
				j++;
			}
			i = j - 1;
			numbers.push(parseInt(token));
		}
		else if(tokenType === 'left parens') {
			operators.push(token);
		}
		else if(tokenType === 'right parens') {
			while(!operators.empty() && operators.peek() !== '(') {
				if(numbers.length < 2) {
					throw new Error('Invalid expression');
				}
				numbers.push(OPERATORS[operators.pop()].calc(numbers.pop(), numbers.pop()));
			}
			if(operators.empty()) {
				throw new Error('Mismatched parentheses');
			}
			operators.pop(); // Remove left parens
		}
		else if(tokenType === 'operator') {
			while(
				!operators.empty() &&
				OPERATORS.hasOwnProperty(operators.peek()) &&
				OPERATORS[operators.peek()].hasPriority(OPERATORS[token])) {
				
				if(numbers.length < 2) {
					throw new Error('Invalid expression');
				}
				numbers.push(OPERATORS[operators.pop()].calc(numbers.pop(), numbers.pop()));
			}
			operators.push(token);
		}
	}

	while(!operators.empty()) {
		if(!OPERATORS.hasOwnProperty(operators.peek())) {
			throw new Error('Mismatched parentheses');
		}
		if(numbers.length < 2) {
			throw new Error('Invalid expression');
		}
		numbers.push(OPERATORS[operators.pop()].calc(numbers.pop(), numbers.pop()));
	}

	if(numbers.length !== 1) {
		throw new Error('Invalid expression');
	}

	return numbers.pop();
}

function getTokenType(token) {
	if(token === '(') {
		return 'left parens';
	}
	else if(token === ')') {
		return 'right parens';
	}
	else if(!isNaN(parseInt(token))) {
		return 'number';
	}
	else if(OPERATORS.hasOwnProperty(token)) {
		return 'operator';
	}
	throw new Error(`Invalid token "${token}"`);
}

module.exports = {
	evaluateExpression: evaluateExpression,
	getTokenType: getTokenType
};