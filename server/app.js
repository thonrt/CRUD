"use strict";
var express = require('express');
var app = express();
var path = require("path");
var port = 8000;
var restRouter = require("./router");
var cors = require('cors');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

app.use("/", express.static(path.join(__dirname, '../../CRUD')));
app.use(cookieParser());

//session-store
var LokiStore = require("connect-loki")(session);

app.use(session({
	store: new LokiStore(),
	secret: 'crud'
}));

// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
	extended: true
}));

//跨域
app.use(cors());

app.use(restRouter);



app.listen(port, function() {
	console.log("crud started on port :" + port);
});