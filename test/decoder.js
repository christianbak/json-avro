var assert = require('assert');
var avro = require('../index.js');
var Schemas = require('./schemas.js');

describe('Avro-Decoder', function() {
	describe('toJson', function () {
		it('should decode records', function () {
			avro.loadSchema(Schemas.LongListSchema);

			var result = avro.avroJsonToJson(
				{
					value: 1,
					next: {
						LongList: {
							value: 2,
							next: {
								LongList: {
									value: 3,
									next: null
								}
							}
						}
					}
				},
				'LongList'
			);

			assert(result.next.value == 2, "Record values should be specified");
		});

		it('should decode null for a pure null value', function () {
			avro.loadSchema(Schemas.LongListSchema);

			var result = avro.avroJsonToJson(
				{
					value: 1,
					next: null
				},
				'LongList'
			);

			assert.equal(result.next === null, true);

		});

		it('should decode arrays', function () {
			avro.loadSchema(Schemas.SimpleRecordSchema);
			avro.loadSchema(Schemas.ArraySchema);

			var result = avro.avroJsonToJson(
				{
					recordList: [ { value: { 'string': 'Hello'}  }, { value: { 'string': 'World'} }, { value: null} ]
				},
				'ArrayTest'
			);

			assert.equal(result.recordList.length, 3);

		});

		it('should handle inline records', function () {
			avro.loadSchema(Schemas.InlineArraySchema);

			var result = avro.jsonToAvroJson(
				{
					recordList: [ { value: { 'string': 'Hello'}  }, { value: { 'string': 'World'} }, { value: null} ]
				},
				'ArrayTest'
			);
			assert.equal(result.recordList.length, 3);

		});

		it('should handle verbose primitives', function () {
			avro.loadSchema({
				"type": "record",
				"name": "VerboseTest",
				"fields": [
					{ name: "test", type: [ null, 'int' ] }
				]
			});

			var result = avro.avroJsonToJson(
				{
					test: {
						'int': 99
					}
				},
				'VerboseTest'
			);
			assert.equal(result.test, 99);

		});
	});

});
