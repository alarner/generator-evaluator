"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
	function _class(token, order, calc) {
		_classCallCheck(this, _class);

		this.token = token;
		this.order = order;
		this.calc = calc.bind(this);
	}

	_createClass(_class, [{
		key: "hasPriority",
		value: function hasPriority(op) {
			return this.order <= op.order;
		}
	}]);

	return _class;
}();