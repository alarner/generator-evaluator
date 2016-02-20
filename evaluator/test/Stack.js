let expect = require('chai').expect;
let Stack = require('../src/Stack');

describe('Stack', function() {
	describe('constructor', function() {
		it('should properly store array values that are passed in', function() {
			let s = new Stack(['a', 'b', 'c']);
			expect(s.length).to.equal(3);
		});
	});
	describe('peek', function() {
		it('should throw an error if there are no elements', function() {
			let s = new Stack();
			expect(function() { s.peek(); }).to.throw('Stack has no elements, cannot peek');
		});
		it('should return the last element', function() {
			let s = new Stack(['a', 'b']);
			s.push('77');
			expect(s.peek()).to.equal('77');
		});
	});
});