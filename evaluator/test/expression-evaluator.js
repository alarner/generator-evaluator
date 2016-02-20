let expect = require('chai').expect;
let ee = require('../src/expression-evaluator');

describe('expression-evaluator', function() {
	describe('getTokenType', function() {
		it('should exist', function() {
			expect(ee.getTokenType).to.exist;
		});
		it('should throw an error when it is passed an invalid token', function() {
			expect(function() { ee.getTokenType('&'); }).to.throw('Invalid token "&"');
		});
		it('should return "left parens" when appropriate', function() {
			expect(ee.getTokenType('(')).to.equal('left parens');
		});
		it('should return "right parens" when appropriate', function() {
			expect(ee.getTokenType(')')).to.equal('right parens');
		});
		it('should return "operator" when appropriate', function() {
			expect(ee.getTokenType('+')).to.equal('operator');
			expect(ee.getTokenType('-')).to.equal('operator');
			expect(ee.getTokenType('*')).to.equal('operator');
			expect(ee.getTokenType('/')).to.equal('operator');
		});
		it('should return "number" when appropriate', function() {
			expect(ee.getTokenType('7')).to.equal('number');
			expect(ee.getTokenType('12')).to.equal('number');
		});
	});

	describe('evaluateExpression', function() {
		it('should exist', function() {
			expect(ee.evaluateExpression).to.exist;
		});
		it('should work with simple addition', function() {
			expect(ee.evaluateExpression('2+2')).to.equal(4);
		});
		it('should work with simple addition wrapped in parentheses', function() {
			expect(ee.evaluateExpression('(2+2)')).to.equal(4);
			expect(ee.evaluateExpression('((2+2))')).to.equal(4);
		});
		it('should work with simple subtraction', function() {
			expect(ee.evaluateExpression('2-2')).to.equal(0);
		});
		it('should work with simple multiplication', function() {
			expect(ee.evaluateExpression('3*4')).to.equal(12);
		});
		it('should work with simple division', function() {
			expect(ee.evaluateExpression('3/2')).to.equal(1.5);
		});
		it('should respect order of operations', function() {
			expect(ee.evaluateExpression('3/2+1')).to.equal(2.5);
		});
		it('should respect parentheses', function() {
			expect(ee.evaluateExpression('3/(2+1)')).to.equal(1);
		});
		it('should work with more complicated expressions', function() {
			expect(ee.evaluateExpression('(5-1)*(3+2)')).to.equal(20);
			expect(ee.evaluateExpression('((5-1)*(3+2))/8')).to.equal(2.5);
		});
		it('should throw an error if there are mismatched open parentheses', function() {
			expect(function() { ee.evaluateExpression('('); }).to.throw('Mismatched parentheses');
			expect(function() { ee.evaluateExpression('(5-3'); }).to.throw('Mismatched parentheses');
		});
		it('should throw an error if there are mismatched close parentheses', function() {
			expect(function() { ee.evaluateExpression('(5-3))'); }).to.throw('Mismatched parentheses');
			expect(function() { ee.evaluateExpression('5-3))'); }).to.throw('Mismatched parentheses');
			expect(function() { ee.evaluateExpression(')'); }).to.throw('Mismatched parentheses');
		});
		it('should throw an error if there are invalid tokens', function() {
			expect(function() { ee.evaluateExpression('53a'); }).to.throw('Invalid token "a"');
		});
		it('should throw an error if the expression is malformed', function() {
			expect(function() { ee.evaluateExpression('(5+3)4'); }).to.throw('Invalid expression');
		});
	});
});