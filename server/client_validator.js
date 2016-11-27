"use strict";


//Simply pass a schema to compile it
var validator = require('is-my-json-valid');

var validate = validator({
	required: true,
	type: 'object',
	properties: {
		name: {
			required: true,
			type: 'string'
		},
		age: {
			required: false,
			type: 'number'
		},
		address: {
			required: false,
			type: 'string'
		}
	}
}, {
	verbose: true,
	greedy: true
});



module.exports = validate;