module.exports = class Stack {

	constructor(a) {
		this._array = a || [];
	}

	peek() {
		if(!this._array.length) {
			throw new Error('Stack has no elements, cannot peek');
		}
		return this._array[this._array.length-1];
	}

	push(a) {
		return this._array.push(a);
	}

	pop() {
		return this._array.pop();
	}

	empty() {
		return this._array.length === 0;
	}

	get length() {
		return this._array.length;
	}
};