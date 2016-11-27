"use strict";
var validate = require('./client_validator');
var _ = require("underscore");
var uuid = require("node-uuid");

var getList = function(req, res, next) {
	var clientsList = req.session.clients;
	if (!clientsList) {
		clientsList = [];
	}
	res.json({
		"hint": "ok",
		"data": clientsList
	});
};


var getSingleList = function(req, res, next) {
	var clientList = req.session.clients;
	var clientId = req.params.clientId;
	var resData = [];
	if (clientList && clientId) {
		resData = _.filter(clientList, function(item) {
			return item.id === clientId;
		});
	}
	res.json({
		"hint": "ok",
		"data": resData
	});
};

var updateList = function(req, res, next) {
	var clientList = req.session.clients;
	var clientId = req.params.clientId;
	var postData = req.body;
	if (clientList && clientId) {
		clientList.forEach(function(item) {
			if (item.id === clientId) {
				item.name = postData.name || item.name;
				item.age = postData.age || item.age;
				item.address = postData.address || item.address;
			}
		});
	}


	res.json({
		"hint": "OK"
	});
};

var addList = function(req, res, next) {
	var sess = req.session;
	var clientsList = sess.clients;
	var postData = req.body;
	if (!clientsList) {
		clientsList = [];
	}
	for (var item in postData) {
		var value = postData[item];
		var parseValue = parseInt(value, 10);
		if (parseValue.toString() === value) {
			postData[item] = parseValue;
		}
	}
	var isValidate = validate(postData);
	if (isValidate) {
		postData.id = uuid.v1();
		clientsList.push(postData);
		req.session.clients = clientsList;
		res.json({
			"hint": "OK"
		});
	} else {
		res.json({
			"hint": "error",
			"data": isValidate.errors
		});
	}

};

var deleteList = function(req, res, next) {
	var clientList = req.session.clients;
	var clientId = req.params.clientId;
	var newClientData = [];
	console.log(clientId);
	if (clientList && clientId) {
		clientList.forEach(function(item) {
			if (item.id !== clientId) {
				newClientData.push(item);
			}
		});
		clientList = newClientData;
	}

	res.json({
		"hint": "OK"
	});
};


module.exports = {
	list: getList,
	singleList: getSingleList,
	update: updateList,
	add: addList,
	del: deleteList
};