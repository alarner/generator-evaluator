let expect = require('chai').expect;
let expressionGenerator = require('../src/expression-generator');

describe('expression-generator', function() {
	describe('generateInteger', function() {
		it('should exist', function() {
			expect(expressionGenerator.generateInteger).to.exist;
		});
		it('should default the range to 0 - 10', function() {
			for(let i=0; i<100; i++) {
				expect(expressionGenerator.generateInteger()).to.be.within(0,10);
			}
		});
		it('should respect when a specific range is given', function() {
			for(let i=0; i<100; i++) {
				expect(expressionGenerator.generateInteger(2, 8)).to.be.within(2,8);
			}

			for(let i=0; i<100; i++) {
				expect(expressionGenerator.generateInteger(-4, 40)).to.be.within(-4,40);
			}
		});
		it('should not allow a maximum value that is less than the minimum value', function() {
			expect(function() { expressionGenerator.generateInteger(8, 2); }).to.throw('The max cannot be less than min');
		});
	});
	describe('generateOperator', function() {
		it('should exist', function() {
			expect(expressionGenerator.generateOperator).to.exist;
		});
		it('should only return expected characters +-*/', function() {
			for(let i=0; i<100; i++) {
				expect(expressionGenerator.generateOperator()).to.be.oneOf(['+', '-', '*', '/']);
			}
		});
	});
	describe('generateExpression', function() {
		it('should exist', function() {
			expect(expressionGenerator.generateExpression).to.exist;
		});
		it('should not allow for negative numbers', function() {
			expect(function() { expressionGenerator.generateExpression(3, 1, -1, 15); }).to.throw('intMin must be positive');
		});
		it('should return a string', function() {
			expect(expressionGenerator.generateExpression()).to.be.a.string;
		});
	});
});