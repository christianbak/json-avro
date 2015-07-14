var primitives = [
	'string',
	'null',
	'long'
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
	}
};

module.exports = {
	parse: function(value, primitive) {
		return ParsePrimitive[primitive](value);
	},

	isPrimitive: function(schema) {
		return typeof schema === 'string' && primitives.indexOf(schema) >= 0;
	}
};