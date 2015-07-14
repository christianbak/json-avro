var Parser = require('./lib/parser');
var Schema = require('./lib/schema');

module.exports = {

	loadSchema: Schema.addSchema,

	jsonToAvroJson: function (json, schemaName) {
		return Parser.parse(json, schemaName);
	},

	avroJsonToJson: function(avroJson) {

	}
}