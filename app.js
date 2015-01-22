var express = require('express');
var bodyparser = require('body-parser');
var _ = require('underscore');
var moment = require('moment');
var app = express();
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var ObjectID = require('mongodb').ObjectID;

// ***** ENPOINT **** //

app.use(
	bodyparser.json({})
).use(
	express.static('./public')
).get('/', function (req, res) {
	res.sendfile('./public/views/index.html');
}).post('/', function (req, res) {
	res.status(200).json({
		response: 'posted to root'
	});
}).put('/', function (req, res) {
	res.status(200).json({
		response: 'put to root'
	});
}).delete('/', function (req, res) {
	res.status(200).json({
		response: 'delete to root'
	});
}).get('/*', function (req, res) {
	res.status(200).json({
		response: 'GET ' + req.params[0]
	});
}).post('/*', function (req, res) {
	res.status(200).json({
		response: 'POST ' + req.params[0]
	});
}).put('/*', function (req, res) {
	res.status(200).json({
		response: 'PUT ' + req.params[0]
	});
}).delete('/*', function (req, res) {
	res.status(200).json({
		response: 'DELETE ' + req.params[0]
	});
}).listen(process.env.PORT || 5001);
