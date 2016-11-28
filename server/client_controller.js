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
    var success = function(data) {

        clientList.forEach(function(item) {
            if (item.id === clientId) {
                item.name = data.name || item.name;
                item.age = data.age || item.age;
                item.address = data.address || item.address;
            }
        });
        req.session.clients = clientList;
        res.json({
            "hint": "ok"
        });

    };
    var error = function(validate) {
        res.json({
            "hint": "error",
            "data": validate.errors
        });
    };
    judgeIsvalidate(postData, success, error);
};

var addList = function(req, res, next) {
    var sess = req.session;
    var clientsList = sess.clients;
    var postData = req.body;
    if (!clientsList) {
        clientsList = [];
    }
    var success = function(data) {
        data.id = uuid.v1();
        clientsList.push(data);
        req.session.clients = clientsList;
        res.json({
            "hint": "OK"
        });
    };
    var error = function(validate) {
        res.json({
            "hint": "error",
            "data": validate.errors
        });
    };
    judgeIsvalidate(postData, success, error);

};
var judgeIsvalidate = function(data, success, error) {
    for (var item in data) {
        var value = data[item];
        var parseValue = parseInt(value, 10);
        if (parseValue.toString() === value) {
            data[item] = parseValue;
        }
    }
    var isValidate = validate(data);
    if (isValidate) {
        success(data);
    } else {
        error(validate);
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
    req.session.clients = clientList;

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