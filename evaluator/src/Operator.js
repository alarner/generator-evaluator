module.exports = class {
	constructor(token, order, calc) {
		this.token = token;
		this.order = order;
		this.calc = calc.bind(this);
	}

	hasPriority(op) {
		return this.order <= op.order;
	}
};