'use strict';

var replaceAll = function replaceAll(search, replacement) {
				var target = this;
				return target.split(search).join(replacement);
};

var types = {
				'get': function get(prop) {
								return Object.prototype.toString.call(prop);
				},
				'object': '[object Object]',
				'array': '[object Array]',
				'string': '[object String]',
				'boolean': '[object Boolean]',
				'number': '[object Number]'
};

module.exports = {
				replaceAll: replaceAll,
				types: types
};