var Primitive = require('./primitive');

var schemas = {
};

function getSchemaFromString (schema) {
	return Primitive.isPrimitive(schema) ? schema : schemas[schema];
}

module.exports = {
	addSchema : function(schema) {
		schemas[schema.name] = schema;
	},

	resolveSchema: function (schema) {
		var result = schema;

		if (schema == null) {
			throw "Missing schema";
		}

		if (typeof schema === 'string') {
			result = getSchemaFromString(schema);
		}

		if (result == null) {
			throw "Schema '" + schema + "' was not loaded";
		}		

		return result;
	}

};