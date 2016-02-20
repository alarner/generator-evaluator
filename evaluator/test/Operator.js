let expect = require('chai').expect;
let Operator = require('../src/Operator');

describe('Operator', function() {
	describe('constructor', function() {
		it('should store the token, order and calc function', function() {
			let plus = new Operator('+', 200, (b, a) => b+a);
			expect(plus.token).to.equal('+');
			expect(plus.order).to.equal(200);
			expect(plus.calc).to.be.a('function');
		});
	});
	describe('hasPriority', function() {
		it('should return true when priorities are equal', function() {
			let plus = new Operator('+', 200, (b, a) => b+a);
			let minus = new Operator('-', 200, (b, a) => b-a);
			expect(plus.hasPriority(minus)).to.be.true;
			expect(minus.hasPriority(plus)).to.be.true;
		});
		it('should return true when the callers order is lower', function() {
			let plus = new Operator('+', 200, (b, a) => b+a);
			let divide = new Operator('/', 100, (b, a) => b-a);
			expect(divide.hasPriority(plus)).to.be.true;
		});
		it('should return false when the callers order is higher', function() {
			let plus = new Operator('+', 200, (b, a) => b+a);
			let divide = new Operator('/', 100, (b, a) => b-a);
			expect(plus.hasPriority(divide)).to.be.false;
		});
	});
	// describe('peek', function() {
	// 	it('should throw an error if there are no elements', function() {
	// 		let s = new Stack();
	// 		expect(function() { s.peek(); }).to.throw('Stack has no elements, cannot peek');
	// 	});
	// 	it('should return the last element', function() {
	// 		let s = new Stack(['a', 'b']);
	// 		s.push('77');
	// 		expect(s.peek()).to.equal('77');
	// 	});
	// });
});