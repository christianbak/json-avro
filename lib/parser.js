var util = require('util');
var Schema = require('./schema');
var Primitive = require('./primitive');

function canParse(value, schema) {
	try {
		parse(value, schema);
		return true;
	} catch (e) {
		return false
	}
}

function parse (value, schema) {
	var result = {};

	schema = Schema.resolveSchema(schema);

	if (typeof schema === 'string') { //Schema is a primitive

		return Primitive.parse(value, schema);

	} else if (util.isArray(schema)) { //Schema is a union

		return parseUnion(value, schema);

	} else if (schema.type === 'record') { //Schema is a record

		schema.fields.forEach(function ( field ) {
			result[field.name] = parse(value[field.name], field.type);
		});
		return result;

	} else if (schema.type === 'array') { //Schema is an array

		return parseArray(value, schema);

	}
};

function parseUnion(value, union) {
	var result = {},
		unionType;
	for (var i = 0; i < union.length; i++) {
		unionType = union[i];
		if (canParse(value, unionType)) {
			if (unionType === 'null') 
				return null;
			result[unionType] = parse(value, unionType);
			return result;
		}
	}

	throw "Expected type to be one of union schemas: " + union.join(',');
}

function parseArray (value, schema) {
	return value.map(function(val) { return parse(val, schema.items) });
}

module.exports = {
	parse: parse	
};