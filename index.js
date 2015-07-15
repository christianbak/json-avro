var Parser = require('./lib/parser');
var Decoder = require('./lib/decoder');
var Schema = require('./lib/schema');

module.exports = {

	loadSchema: Schema.addSchema,

	jsonToAvroJson: function (json, schemaName) {
		return Parser.parse(json, schemaName);
	},

	avroJsonToJson: function(avroJson, schemaName) {
		return Decoder.decode(avroJson, schemaName);
	}
};
