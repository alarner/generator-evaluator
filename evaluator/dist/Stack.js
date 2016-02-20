'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
	function Stack(a) {
		_classCallCheck(this, Stack);

		this._array = a || [];
	}

	_createClass(Stack, [{
		key: 'peek',
		value: function peek() {
			if (!this._array.length) {
				throw new Error('Stack has no elements, cannot peek');
			}
			return this._array[this._array.length - 1];
		}
	}, {
		key: 'push',
		value: function push(a) {
			return this._array.push(a);
		}
	}, {
		key: 'pop',
		value: function pop() {
			return this._array.pop();
		}
	}, {
		key: 'empty',
		value: function empty() {
			return this._array.length === 0;
		}
	}, {
		key: 'length',
		get: function get() {
			return this._array.length;
		}
	}]);

	return Stack;
}();