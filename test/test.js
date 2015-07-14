var assert = require('assert');

var parser = require('../index.js')

var SimpleRecordSchema = {
	type: 'record',
	name: 'SimpleRecord',
	fields: [
		{ name: 'value', type: ['null', 'string'] }
	]
};

var LongListSchema = {
		  "type": "record",
		  "name": "LongList",
		  "aliases": ["LinkedLongs"],                      // old name for this
		  "fields" : [
		    {"name": "value", "type": "long"},             // each element has a long
		    {"name": "next", "type": ["null", "LongList"]} // optional next element
		  ]
		};

var ArraySchema = {
	"type": "record",
	"name": "ArrayTest",
	"fields": [
		{ name: "recordList", type: { type: 'array', items: 'SimpleRecord'} }
	]
	
};

var InlineArraySchema = {
	"type": "record",
	"name": "ArrayTest",
	"fields": [
		{
			name: "recordList", type: {
				type: 'array', items: SimpleRecordSchema
			}
		}
	]
	
};

describe('Avro-Parser', function() {
  
  describe('toAvroJson', function () {
    it('should parse records', function () {
    	parser.loadSchema(LongListSchema);

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
    	parser.loadSchema(LongListSchema);

		var result = parser.jsonToAvroJson(
			{
				value: 1
			},
			'LongList'
		);

		assert.equal(result.next == null, true);

    });

    it('should parse arrays', function () {
    	parser.loadSchema(SimpleRecordSchema);
    	parser.loadSchema(ArraySchema);

    	var result = parser.jsonToAvroJson(
			{
				recordList: [ { value: 'Hello' }, { value: 'World' }, {} ]
			},
			'ArrayTest'
		);

		assert.equal(result.recordList.length, 3);

	});

	it('should handle inline records', function () {
    	parser.loadSchema(InlineArraySchema);

    	var result = parser.jsonToAvroJson(
			{
				recordList: [ { value: 'Hello' }, { value: 'World' }, {} ]
			},
			'ArrayTest'
		);
		assert.equal(result.recordList.length, 3);

	});

  });

});