'use strict';

var OPERATORS = '+-*/';

/*
 * Generate a random expression using addition, subtraction, multiplication,
 * and division. 
 *
 * maxDepth: [integer] The maximum number of nested expressions that can be
 * included in the result. Defaults to 3.
 *
 * currentDepth: [integer] The current depth of recursion. Defaults to 1.
 *
 * intMin: [integer] The minimum integer that can appear in the final
 * expression. Defaults to 1.
 * 
 * intMin: [integer] The maxiumum integer that can appear in the final
 * expression. Defaults to 15.
 */
function generateExpression() {
	var maxDepth = arguments.length <= 0 || arguments[0] === undefined ? 3 : arguments[0];
	var currentDepth = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
	var intMin = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];
	var intMax = arguments.length <= 3 || arguments[3] === undefined ? 15 : arguments[3];

	if (intMin < 1) {
		throw new Error('intMin must be positive');
	}

	var branch1 = Math.random() < 0.3;
	var branch2 = Math.random() < 0.3;

	if (currentDepth < maxDepth) {
		var expression1 = null;
		var expression2 = null;
		if (branch1) {
			expression1 = generateExpression(maxDepth, currentDepth + 1, intMin, intMax);
		} else {
			expression1 = generateInteger(intMin, intMax);
		}

		if (branch2) {
			expression2 = generateExpression(maxDepth, currentDepth + 1, intMin, intMax);
		} else {
			expression2 = generateInteger(intMin, intMax);
		}

		return '(' + expression1 + generateOperator() + expression2 + ')';
	} else {
		return generateInteger(intMin, intMax);
	}
};

/*
 * Generates a random integer within a range (min, max) inclusive. Defaults to a
 * range of 0 - 10.
 */
function generateInteger() {
	var min = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	var max = arguments.length <= 1 || arguments[1] === undefined ? 10 : arguments[1];

	if (max < min) {
		throw new Error('The max cannot be less than min');
	}
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*
 * Generates a random operator from the OPERATORS const.
 */
function generateOperator() {
	return OPERATORS.charAt(generateInteger(0, OPERATORS.length - 1));
}

module.exports = {
	generateExpression: generateExpression,
	generateOperator: generateOperator,
	generateInteger: generateInteger
};