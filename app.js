var express = require('express');
var bodyparser = require('body-parser');
var _ = require('underscore');
var moment = require('moment');
var app = express();
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var ObjectID = require('mongodb').ObjectID;

// ***** DB Connection **** //

function wrapdb( db ) {
	return {
		suppliers: function () {
			return db.collection('suppliers');
		},
		close: function() {
			db.close();
		}
	};
}

function dbInstance (callback) {
	if ( process.env.MONGOLAB_URI ) {
		Db.connect( process.env.MONGOLAB_URI, function(err, db) {
			if( err ) throw err;
			callback(wrapdb(db));
		});
	} else {
		var options = {safe: true, strict: true, fsync:false, journal:true};
		var db = new Db('json_supplier', new Server('127.0.0.1', 27017, {}), options);
		db.open(function (err, db) {
			if( err ) throw err;
			callback(wrapdb(db));
		});
	}
}

// ***** REPOSITORIES **** //
var JsonRepository = function (db) {
	return {
		load: function (url, action, success, failure) {
			success({
				"action":"GET",
				"url":"",
				"data":"",
				"code":200,
				"headers":{
					"content-type":"application/json",
					"x-vijay-type":"this-is-my-header"
				}
			});
			// failure(500, 'db.load.failed');
		},
		save: function (supplier, success, failure) {
			success(supplier);
			// failure(500, 'db.save.failed');
		}
	};
};

// ***** MIDDLEWARE **** //

function loadRepositories(req, res, next) {
	// dbInstance(function(db) {
	// 	req.jsonRepository = new JsonRepository(db);
	// 	res.on('finish', function() {
	// 		db.close();
	// 	});
	// 	next();
	// });
	req.jsonRepository = new JsonRepository({});
	next();
}

function validateJsonData(req, res, next) {
	console.log("Validating json: ");
	console.log(req.body);
	req.supplier = req.body;
	next();
}

function validateEndpoint(req, res, next) {
	console.log("Validating url: " + req.params[0]);
	req.json_url = req.params[0];
	next();
}

// ***** ENPOINT **** //

app.use(
	bodyparser.json({})
).use(
	express.static('./public')
).get('/', function (req, res) {
	res.sendfile('./public/views/index.html');
}).post('/', loadRepositories, validateJsonData, function (req, res) {
	req.jsonRepository.save(req.body, function (supplier) {
		res.status(200).json(req.supplier);
	}, function (code, error) {
		res.status(code).json({error: error});
	})
}).put('/', function (req, res) {
	res.status(403).json({ message: 'Nice Try' });
}).delete('/', function (req, res) {
	res.status(403).json({ message: 'Nice Try'});
}).all('/*', validateEndpoint, loadRepositories, function (req, res) {
	req.jsonRepository.load(req.json_url, req.method, function (supplier) {
		res.status(supplier.code).set(supplier.headers).json(supplier.data);
	}, function (code, error) {
		res.status(code).json({error: error});
	});
}).listen(process.env.PORT || 5001);
