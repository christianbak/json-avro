var assert = require('assert');
var parser = require('../index.js');
var Schemas = require('./schemas.js');

describe('Avro-Parser', function() {

  describe('toAvroJson', function () {
    it('should parse records', function () {
    	parser.loadSchema(Schemas.LongListSchema);

		var result = parser.jsonToAvroJson(
			{
				value: 1,
				next: {
					value: 2,
					next: {
						value: 3,
						next: null
					}
				}
			},
			'LongList'
		);

		assert.equal(result.next.LongList != null, true, "Record types should be specied in values");
    });

    it('should retun null for a pure null value', function () {
    	parser.loadSchema(Schemas.LongListSchema);

		var result = parser.jsonToAvroJson(
			{
				value: 1
			},
			'LongList'
		);

		assert.equal(result.next == null, true);

    });

    it('should parse arrays', function () {
    	parser.loadSchema(Schemas.SimpleRecordSchema);
    	parser.loadSchema(Schemas.ArraySchema);

    	var result = parser.jsonToAvroJson(
			{
				recordList: [ { value: 'Hello' }, { value: 'World' }, {} ]
			},
			'ArrayTest'
		);

		assert.equal(result.recordList.length, 3);

	});

	it('should handle inline records', function () {
    	parser.loadSchema(Schemas.InlineArraySchema);

    	var result = parser.jsonToAvroJson(
			{
				recordList: [ { value: 'Hello' }, { value: 'World' }, {} ]
			},
			'ArrayTest'
		);
		assert.equal(result.recordList.length, 3);

	});

	it('should handle verbose primitives', function () {
    	parser.loadSchema({
			"type": "record",
			"name": "VerboseTest",
			"fields": [
				{ name: "test", type: [ null, { type: 'int' } ] }
			]
		});

		var result = parser.jsonToAvroJson(
			{
				test: 99
			}
			, 'VerboseTest'
		);
		assert.equal(result.test.int, 99);

    });

  });
});
