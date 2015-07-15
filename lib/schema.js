var Primitive = require('./primitive');

var schemas = {
};

function getSchemaFromString (schema) {
	return Primitive.isPrimitive(schema) ? schema : schemas[schema];
}

module.exports = {
	addSchema : function(schema) {
		//TODO: Should check that the schema definiton is valid
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
	},

	resolveSchemaName: function(schema) {
		if (typeof schema === 'string') {
			return schema;
		} else if (Primitive.isPrimitive(schema)) {
			return schema.type;
		} 
		return schema.name;
	}

};