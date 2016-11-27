"use strict";

var express = require('express');
var Clients = require("./client_controller.js");

var restRouter = express.Router();



restRouter.route('/app')
	.get(Clients.list)
	.put(Clients.add);

restRouter.route('/app/:clientId')
	.get(Clients.singleList)
	.post(Clients.update)
	.delete(Clients.del);



module.exports = restRouter;