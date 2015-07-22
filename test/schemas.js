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
		  "aliases": ["LinkedLongs"],					  // old name for this
		  "fields" : [
			{"name": "value", "type": "long"},			 // each element has a long
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

module.exports = {
	SimpleRecordSchema: SimpleRecordSchema,
	LongListSchema: LongListSchema,
	ArraySchema: ArraySchema,
	InlineArraySchema: InlineArraySchema
};
