var util = require('util');
var Schema = require('./schema');
var Primitive = require('./primitive');

function canParse(value, schema) {
	try {
		decode(value, schema);
		return true;
	} catch (e) {
		return false;
	}
}

function parseUnion(value, union) {
    var result = [],
		unionType;

    for (var i=0; i < union.length; i++) {
        var name = union[i];
        if (value === null) {
            if (name === 'null') {
                return null;
            }
            continue;
        }

        if (value.hasOwnProperty(name)) {
            return value[name];
        }
    }

    throw new Error('Value: ' + JSON.stringify(value) + ' does not match the schema:' + JSON.stringify(union));
}

function parseRecord(value, schema) {
    var json = {};
	schema.fields.forEach(function (field) {
		json[field.name] = decode(value[field.name], field.type);
	});

	return json;
}

function parseArray(value, schema) {
    return value.map(function(val) { return decode(val, schema.items); });
}

function getType(schema) {
    if (Primitive.isPrimitive(schema)) {
        return 'primitive';
    }

    if (util.isArray(schema)) {
        return 'union';
    }

    return schema.type || null;
}

function decode(avroJson, schema) {
    var json = {};

    schema = Schema.resolveSchema(schema);

    var type = getType(schema);

    switch(type) {
        case 'primitive':
            return avroJson;
        case 'union':
            return parseUnion(avroJson, schema);
        case 'array':
            return parseArray(avroJson, schema);
        case 'record':
            return parseRecord(avroJson, schema);
        default:
            throw new Error('Schema type unknown: ', type, schema);
    }
}

module.exports = {
    decode: decode
};
