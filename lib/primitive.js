var util = require('util');

var primitives = [
	'string',
	'null',
	'long',
	'int',
	'float',
	'double',
	'boolean',
	'bytes'
];

var ParsePrimitive = {
	string: function(value) {
		if (typeof value === 'string')
			return value;
		else if (value == null) 
			throw "Value must be a string";
		else
			return '' + value;
	},

	'null': function(value) {
		if (value == null)
			return null;
		else
			throw "Value must be null";
	},

	'long': function(value) {
		if (isNaN(parseInt(value)))
			throw "Value must be a number";
		return parseInt(value, 10);
	},

	'int': function(value) {
		if (isNaN(parseInt(value)))
			throw "Value must be a number";
		return parseInt(value, 10);
	},

	'float': function(value) {
		if (isNaN(parseFloat(value)))
			throw "Value must be a number";
		return parseFloat(value, 10);	
	},

	'double': function(value) {
		if (isNaN(parseFloat(value)))
			throw "Value must be a number";
		return parseFloat(value, 10);		
	},

	'boolean': function(value) {
		return value ? true : false;
	},

	'bytes': function(value) {
		if (!util.isArray(value))
			throw "Bytes must be an array";
		if (value.some(function(v) { return v < 0 || v > 255; })){
			throw "illegal byte value (must be between 0 and 255)";
		}
		return value;
	}
};

module.exports = {
	parse: function(value, primitive) {
		if (typeof primitive === 'string') {
			return ParsePrimitive[primitive](value);
		} else {
			return ParsePrimitive[primitive.type](value);
		}
	},

	isPrimitive: function(schema) {
		if (typeof schema === 'string') {
			return primitives.indexOf(schema) >= 0;
		} else if (schema && schema.type) {
			return primitives.indexOf(schema.type) >= 0;
		}
		return false;
	}
};