Simple Avro JSON parser for node

Installation:
```
npm install avro-parser
```

Usage:
```javascript
var avroParser = require('avro-parser');
var schema1 = <LoadSchema here> //Get schema from some source
var schema2 = <LoadSchema here> //Get schema from some source
var plainJson = {propetyX: 'value'};

//Load all relevant schemas into the parser
avroParser.loadSchema(schema1);
avroParser.loadSchema(schema2);

//Parse some json
var avroJSON = avroParser.jsonToAvroJson(plainJson, 'someSchemaName');
```
